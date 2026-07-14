import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import * as jose from 'jose'; // নেটিভ JWT এর জন্য

// 🔗 ব্যাকআপ কানেকশন স্ট্রিং ও সিক্রেট কি (যদি .env.local রিড করতে না পারে)
const BACKUP_URI = "mongodb://gearshare:eU4IsxJhtgL6cmBS@ac-famfzlt-shard-00-00.w9cbrwo.mongodb.net:27017,ac-famfzlt-shard-00-01.w9cbrwo.mongodb.net:27017,ac-famfzlt-shard-00-02.w9cbrwo.mongodb.net:27017/gearshare?ssl=true&replicaSet=atlas-131uq2-shard-0&authSource=admin&appName=Cluster0";
const BACKUP_JWT_SECRET = "gearshare:eU4IsxJhtgL6cmBS";

const uri = process.env.MONGODB_URI || BACKUP_URI;
const jwtSecret = process.env.JWT_SECRET || BACKUP_JWT_SECRET;
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

    // ১. ইউজার খোঁজা (tolowercase দিয়ে ম্যাচ করানো সেফ)
    const user = await db.collection('users').findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // ২. পাসওয়ার্ড ভেরিফাই করা
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // ⭐ ৩. JWT টোকেন তৈরি করা (এসাইনমেন্ট রিকোয়ারমেন্ট অনুযায়ী)
    const secret = new TextEncoder().encode(jwtSecret);
    const token = await new jose.SignJWT({
      id: user._id.toString(),
      email: user.email,
      name: user.name
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1d') // টোকেনের মেয়াদ ১ দিন
      .sign(secret);

    // ৪. রেসপন্স তৈরি এবং সুরক্ষিত HTTP-Only কুকিতে JWT টোকেনটি সেট করা
    const response = NextResponse.json({
      message: 'Login successful with JWT!',
      user: { name: user.name, email: user.email }
    }, { status: 200 });

    response.cookies.set('user_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // ২৪ ঘণ্টা
      path: '/'
    });

    return response;

  } catch (error: any) {
    console.error("🚨 JWT LOGIN ERROR:", error.message || error);
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
  }
}