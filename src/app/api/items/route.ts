import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import dns from "node:dns";

// নোড জেএস-এর DNS প্রোটোকল ফিক্স করা
try {
    dns.setServers(['1.1.1.1', '1.0.0.1']);
} catch (e) {
    console.error("DNS setServers failed:", e);
}

const uri = process.env.MONGODB_URI as string;

// গ্লোবাল কানেকশন ক্যাশ যাতে বারবার কানেকশন তৈরি না হয়
let cachedClient: MongoClient | null = null;

async function getMongoClient() {
    if (cachedClient) {
        return cachedClient;
    }
    if (!uri) {
        throw new Error('MONGODB_URI is missing in your .env.local file');
    }

    // সরাসরি কানেকশন অপশনস ড্রাইভার পাস করা
    const client = new MongoClient(uri, {
        connectTimeoutMS: 10000, // ১০ সেকেন্ডের মধ্যে রেসপন্স না পেলে ফেইল করবে
        socketTimeoutMS: 45000,
    });

    cachedClient = await client.connect();
    return cachedClient;
}

// ==================== GET METHOD ====================
export async function GET() {
    try {
        const client = await getMongoClient();
        const db = client.db(); // ডিফল্ট ডেটাবেস অটোমেটিক সিলেক্ট হবে

        // 'items' কালেকশন থেকে সব ডেটা তুলে আনা
        const items = await db.collection('items')
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json(items, { status: 200 });
    } catch (error: any) {
        // এই কনসোল লগটি আপনার VS Code টার্মিনালে আসল এররটি প্রিন্ট করবে
        console.error("🚨 CRITICAL MONGODB FETCH ERROR:", error.message || error);
        return NextResponse.json({ message: error.message || 'Server Error' }, { status: 500 });
    }
}

// ==================== POST METHOD ====================
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, category, price, location, description } = body;

        if (!title || !category || !price || !location || !description) {
            return NextResponse.json({ message: 'All fields are required!' }, { status: 400 });
        }

        const client = await getMongoClient();
        const db = client.db();

        const newItem = {
            title,
            category,
            price: Number(price),
            location,
            description,
            available: true,
            createdAt: new Date()
        };

        const result = await db.collection('items').insertOne(newItem);

        return NextResponse.json({
            message: 'Gear listed successfully!',
            itemId: result.insertedId
        }, { status: 201 });

    } catch (error: any) {
        console.error("🚨 CRITICAL MONGODB POST ERROR:", error.message || error);
        return NextResponse.json({ message: error.message || 'Server Error' }, { status: 500 });
    }
}