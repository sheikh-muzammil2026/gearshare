import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

const jwtSecret = process.env.JWT_SECRET as string;

export async function proxy(request: NextRequest) {
    // ⭐ সুরক্ষিতভাবে স্ট্যান্ডার্ড request.url থেকে pathname বের করা (Next.js 16 এ এরর প্রুফ)
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

        // GET রিকোয়েস্ট (এক্সপ্লোর পেজ) ছাড়া বাকি সব (POST, DELETE) প্রটেক্ট করব
        if (request.method !== 'GET') {

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