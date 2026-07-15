import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
let cachedClient: MongoClient | null = null;

async function getMongoClient() {
    if (cachedClient) return cachedClient;
    const client = new MongoClient(uri);
    cachedClient = await client.connect();
    return cachedClient;
}

// ==================== GET METHOD ====================
// নির্দিষ্ট আইডি-র আইটেমের বিস্তারিত তথ্য দেখানোর জন্য
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> } // params কে Promise হিসেবে টাইপ করা হয়েছে
) {
    try {
        // ১. প্রথমে params প্রমিজটিকে await করে আইডি বের করা
        const resolvedParams = await params;
        const itemId = resolvedParams.id;

        // আইডি ফরম্যাট ঠিক আছে কিনা ভ্যালিডেশন
        if (!itemId || itemId.length !== 24) {
            return NextResponse.json({ message: 'Invalid ID format!' }, { status: 400 });
        }

        const client = await getMongoClient();
        const db = client.db('gearshare');

        // ২. MongoDB থেকে নির্দিষ্ট ObjectId দিয়ে ডেটা খোঁজা
        const item = await db.collection('items').findOne({
            _id: new ObjectId(itemId)
        });

        if (!item) {
            return NextResponse.json({ message: 'Item not found!' }, { status: 404 });
        }

        return NextResponse.json(item, { status: 200 });

    } catch (error: any) {
        console.error("🚨 GET DETAILS ERROR:", error.message || error);
        return NextResponse.json({ message: error.message || 'Server Error' }, { status: 500 });
    }
}

// ==================== DELETE METHOD ====================
// নির্দিষ্ট আইডি-র আইটেম ডিলিট করার জন্য (আপনার আগের কোডটি অপরিবর্তিত রাখা হয়েছে)
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const itemId = resolvedParams.id;

        if (!itemId || itemId.length !== 24) {
            return NextResponse.json({ message: 'Invalid ID format!' }, { status: 400 });
        }

        const client = await getMongoClient();
        const db = client.db('gearshare');

        const result = await db.collection('items').deleteOne({
            _id: new ObjectId(itemId)
        });

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: 'Item not found!' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Item deleted successfully!' }, { status: 200 });

    } catch (error: any) {
        console.error("🚨 DELETE ERROR:", error.message || error);
        return NextResponse.json({ message: error.message || 'Server Error' }, { status: 500 });
    }
}
