import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

// 🔗 ব্যাকআপ কানেকশন স্ট্রিং (যদি .env.local রিড করতে না পারে)
const BACKUP_URI = "mongodb://gearshare:eU4IsxJhtgL6cmBS@ac-famfzlt-shard-00-00.w9cbrwo.mongodb.net:27017,ac-famfzlt-shard-00-01.w9cbrwo.mongodb.net:27017,ac-famfzlt-shard-00-02.w9cbrwo.mongodb.net:27017/gearshare?ssl=true&replicaSet=atlas-131uq2-shard-0&authSource=admin&appName=Cluster0";

// প্রথম প্রসেস এনভায়রনমেন্ট চেক করবে, না পেলে ব্যাকআপ স্ট্রিং নিবে
const uri = process.env.MONGODB_URI || BACKUP_URI;
let cachedClient: MongoClient | null = null;

async function getMongoClient() {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(uri);
  cachedClient = await client.connect();
  return cachedClient;
}

export async function POST(request: Request) {
  try {
    // ১. ফ্রন্টএন্ড থেকে আসা বডি রিড করা
    const body = await request.json();
    const { name, email, phone, password } = body;

    // ২. ফিল্ড ভ্যালিডেশন
    if (!name || !email || !phone || !password) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const client = await getMongoClient();
    const db = client.db('gearshare');

    // ৩. ইউজার ইতিমধ্যে আছে কিনা চেক করা
    const existingUser = await db.collection('users').findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists with this email' }, { status: 400 });
    }

    // ৪. পাসওয়ার্ড সিকিউরলি হ্যাশ করা
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ৫. নতুন ইউজার ডাটাবেসে ইনসার্ট
    const newUser = {
      name,
      email: email.toLowerCase(),
      phone,
      password: hashedPassword,
      createdAt: new Date(),
    };

    await db.collection('users').insertOne(newUser);

    return NextResponse.json({ message: 'User registered successfully!' }, { status: 201 });

  } catch (error: any) {
    // 🚨 টার্মিনালে আসল এররটা প্রিন্ট করা যাতে ট্র্যাকিং করা যায়
    console.error("🚨 DATABASE REGISTER ERROR:", error);

    return NextResponse.json({
      message: 'Internal Server Error',
      error: error.message || error
    }, { status: 500 });
  }
}