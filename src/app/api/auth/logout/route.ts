import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json(
        { message: 'সফলভাবে লগআউট হয়েছে।' },
        { status: 200 }
    );

    // কুকি এক্সপায়ার করে দেওয়া
    response.cookies.set('token', '', {
        httpOnly: true,
        expires: new Date(0),
        path: '/',
    });

    return response;
}