import { NextResponse } from 'next/server';
import { getDb } from '@/config/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '@/types';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        // ১. ইনপুট চেক
        if (!email || !password) {
            return NextResponse.json(
                { message: 'ইমেইল এবং পাসওয়ার্ড দুটিই প্রয়োজন।' },
                { status: 400 }
            );
        }

        const db = await getDb();

        // ২. ইমেইল দিয়ে ইউজার খোঁজা
        const user = await db.collection<User>('users').findOne({ email: email.toLowerCase() });
        if (!user) {
            return NextResponse.json(
                { message: 'ভুল ইমেইল অথবা পাসওয়ার্ড!' },
                { status: 401 }
            );
        }

        // ৩. পাসওয়ার্ড ম্যাচ করে কিনা চেক করা
        const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordCorrect) {
            return NextResponse.json(
                { message: 'ভুল ইমেইল অথবা পাসওয়ার্ড!' },
                { status: 401 }
            );
        }

        // ৪. JWT টোকেন তৈরি করা
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET!,
            { expiresIn: '7d' } // ৭ দিন ভ্যালিডিটি
        );

        // ৫. রেসপন্স তৈরি এবং কুকিতে টোকেন সেট করা (নিরাপদ ব্রাউজার স্টোরেজ)
        const response = NextResponse.json(
            {
                message: 'লগইন সফল হয়েছে!',
                user: { name: user.name, email: user.email, role: user.role },
            },
            { status: 200 }
        );

        response.cookies.set('token', token, {
            httpOnly: true, // জাভাস্ক্রিপ্ট দিয়ে টোকেন রিড করা যাবে না (XSS প্রটেকশন)
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // ৭ দিন সেকেন্ডে
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Login Error:', error);
        return NextResponse.json(
            { message: 'সার্ভারে কিছু একটা সমস্যা হয়েছে।' },
            { status: 500 }
        );
    }
}