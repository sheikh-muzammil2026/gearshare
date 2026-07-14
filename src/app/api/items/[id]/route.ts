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

// DELETE Request Handler - নির্দিষ্ট আইডি-র আইটেম ডিলিট করার জন্য
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> } // এখানে params কে Promise হিসেবে টাইপ করা হয়েছে
) {
    try {
        // ১. প্রথমে params প্রমিজটিকে await করে আইডি বের করে আনা
        const resolvedParams = await params;
        const itemId = resolvedParams.id;

        const client = await getMongoClient();
        const db = client.db('gearshare');

        // ২. MongoDB-র ObjectId ফরম্যাটে কনভার্ট করে ডিলিট কুয়েরি চালানো
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