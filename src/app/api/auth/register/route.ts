import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const uri = process.env.MONGODB_URI as string;
let cachedClient: MongoClient | null = null;

async function getMongoClient() {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(uri);
  cachedClient = await client.connect();
  return cachedClient;
}

export async function POST(request: Request) {
  try {
    const { name, email, phone, password } = await request.json();

    // ভ্যালিডেশন
    if (!name || !email || !phone || !password) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const client = await getMongoClient();
    const db = client.db('gearshare');

    // ইউজার ইতিমধ্যে আছে কিনা চেক করা
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists with this email' }, { status: 400 });
    }

    // পাসওয়ার্ড হ্যাশ করা (সিকিউরিটির জন্য)
    const hashedPassword = await bcrypt.hash(password, 12);

    // নতুন ইউজার ডাটাবেসে ইনসার্ট
    await db.collection('users').insertOne({
      name,
      email,
      phone,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: 'User registered successfully!' }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
