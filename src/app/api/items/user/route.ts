import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const BACKUP_URI = "mongodb://gearshare:eU4IsxJhtgL6cmBS@ac-famfzlt-shard-00-00.w9cbrwo.mongodb.net:27017,ac-famfzlt-shard-00-01.w9cbrwo.mongodb.net:27017,ac-famfzlt-shard-00-02.w9cbrwo.mongodb.net:27017/gearshare?ssl=true&replicaSet=atlas-131uq2-shard-0&authSource=admin&appName=Cluster0";
const uri = process.env.MONGODB_URI || BACKUP_URI;

export async function GET(request: Request) {
  try {
    // proxy.ts থেকে আসা ইউজারের ইমেইল রিড করা
    const userEmail = request.headers.get('x-user-email');

    if (!userEmail) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('gearshare');

    // 🔍 শুধুমাত্র এই ইমেইলের সাথে ম্যাচ করা আইটেমগুলো খুঁজে বের করা
    const userItems = await db.collection('items')
      .find({ ownerEmail: userEmail })
      .sort({ createdAt: -1 })
      .toArray();

    await client.close();
    return NextResponse.json(userItems, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ message: 'Error fetching user items' }, { status: 500 });
  }
}
