import { NextResponse } from 'next/server';
import { getDb } from '@/config/db';
import bcrypt from 'bcryptjs';
import { User } from '@/types';

export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json();

        // ১. ইনপুট ভ্যালিডেশন
        if (!name || !email || !password || password.length < 6) {
            return NextResponse.json(
                { message: 'সবগুলো ফিল্ড ঠিকঠাক পূরণ করুন এবং পাসওয়ার্ড ন্যূনতম ৬ অক্ষরের দিন।' },
                { status: 400 }
            );
        }

        const db = await getDb();

        // ২. ইউজার আগে থেকেই আছে কিনা চেক করা
        const existingUser = await db.collection<User>('users').findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return NextResponse.json(
                { message: 'এই ইমেইল দিয়ে অলরেডি অ্যাকাউন্ট তৈরি করা আছে।' },
                { status: 400 }
            );
        }

        // ৩. পাসওয়ার্ড হ্যাশ করা (সিকিউরিটির জন্য)
        const passwordHash = await bcrypt.hash(password, 12);

        // ৪. নতুন ইউজার অবজেক্ট তৈরি
        const newUser: User = {
            name,
            email: email.toLowerCase(),
            passwordHash,
            role: 'user', // ডিফল্ট রোল 'user'
            createdAt: new Date(),
        };

        // ৫. ডাটাবেজে সেভ করা
        await db.collection('users').insertOne(newUser);

        return NextResponse.json(
            { message: 'অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Registration Error:', error);
        return NextResponse.json(
            { message: 'সার্ভারে কিছু একটা সমস্যা হয়েছে।' },
            { status: 500 }
        );
    }
}