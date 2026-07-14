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
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const client = await getMongoClient();
    const db = client.db('gearshare');

    // ইউজার খোঁজা
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // পাসওয়ার্ড ভেরিফাই করা
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // রেসপন্স তৈরি এবং লগইন সেশন কুকি (Cookie) সেট করা
    const response = NextResponse.json({
      message: 'Login successful!',
      user: { name: user.name, email: user.email }
    }, { status: 200 });

    // ১ দিন মেয়াদের জন্য কুকি সেট করা হলো
    response.cookies.set('user_session', user.email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/'
    });

    return response;

  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
