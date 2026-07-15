import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

const jwtSecret = process.env.JWT_SECRET as string;

export async function proxy(request: NextRequest) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // 🚪 ১. Auth API (Register/Login) হলে সরাসরি পাস (Allow) করে দাও
    if (pathname.startsWith('/api/auth')) {
        return NextResponse.next();
    }

    // ২. কুকি থেকে JWT টোকেনটি সংগ্রহ করা
    const sessionCookie = request.cookies.get('user_session');
    const token = sessionCookie?.value;

    // 🛡️ ৩. গ্যাজেট সম্পর্কিত সুরক্ষিত API রাউটস প্রটেকশন
    if (pathname.startsWith('/api/items')) {

        // 🔄 পরিবর্তন: যদি রিকোয়েস্টটি '/api/items/user' হয়, অথবা GET বাদে অন্য মেথড (POST, DELETE) হয়
        const isUserItemsRoute = pathname === '/api/items/user';
        const isWriteMethod = request.method !== 'GET';

        if (isUserItemsRoute || isWriteMethod) {

            if (!token) {
                return NextResponse.json({ message: 'Authentication required! Please login.' }, { status: 401 });
            }

            try {
                // 🔐 JWT টোকেন ভেরিফাই করা
                const secret = new TextEncoder().encode(jwtSecret);
                const { payload } = await jose.jwtVerify(token, secret);

                // টোকেন সফল হলে হেডারে ইউজারের তথ্য পাস করা
                const requestHeaders = new Headers(request.headers);
                requestHeaders.set('x-user-email', payload.email as string);
                requestHeaders.set('x-user-id', payload.id as string);

                return NextResponse.next({
                    request: {
                        headers: requestHeaders,
                    },
                });
            } catch (err) {
                return NextResponse.json({ message: 'Invalid or expired token!' }, { status: 401 });
            }
        }
    }

    return NextResponse.next();
}

// 🎯 কোন কোন রাউটের উপর এই প্রক্সিটি নজর রাখবে
export const config = {
    matcher: ['/api/:path*'],
};
