import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

const uri = process.env.MONGODB_URI as string;
let cachedClient: MongoClient | null = null;

async function getMongoClient() {
    if (cachedClient) return cachedClient;
    const client = new MongoClient(uri);
    cachedClient = await client.connect();
    return cachedClient;
}

// ==================== GET METHOD ====================
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const itemId = resolvedParams.id;

        if (!itemId) {
            return NextResponse.json({ message: 'ID missing!' }, { status: 400 });
        }

        const client = await getMongoClient();
        const db = client.db('gearshare');

        // ObjectId এবং Plain String দুইভাবেই খোঁজার লজিক (যাতে Not Found এরর না আসে)
        let query: any = { _id: itemId };
        if (itemId.length === 24) {
            query = {
                $or: [
                    { _id: new ObjectId(itemId) },
                    { _id: itemId }
                ]
            };
        }

        const item = await db.collection('items').findOne(query);

        if (!item) {
            return NextResponse.json({ message: 'Item not found in DB!' }, { status: 404 });
        }

        return NextResponse.json(item, { status: 200 });

    } catch (error: any) {
        console.error("🚨 GET DETAILS ERROR:", error.message || error);
        return NextResponse.json({ message: error.message || 'Server Error' }, { status: 500 });
    }
}

// ==================== DELETE METHOD ====================
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
