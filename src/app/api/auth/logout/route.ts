import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json(
        { message: 'সফলভাবে লগআউট হয়েছে।' },
        { status: 200 }
    );

    // 🚪 কুকির নাম পরিবর্তন করে 'user_session' করা হলো এবং maxAge সেট করা হলো
    response.cookies.set('user_session', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(0), // অতিবাহিত সময় দিয়ে কুকি ইনভ্যালিড করা
        maxAge: 0,            // ব্রাউজারকে সাথে সাথে কুকিটি ডিলিট করতে বাধ্য করা
        path: '/',
    });

    return response;
}