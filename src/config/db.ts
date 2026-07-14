import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
    throw new Error('দয়া করে আপনার .env ফাইলে MONGODB_URI যোগ করুন');
}

if (process.env.NODE_ENV === 'development') {
    // ডেভেলপমেন্ট মোডে গ্লোবাল ভ্যারিয়েবল ব্যবহার করব যাতে কোড চেঞ্জ হলেও কানেকশন বারবার তৈরি না হয়
    let globalWithMongo = global as typeof globalThis & {
        _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
        client = new MongoClient(uri!, options);
        globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
} else {
    // প্রোডাকশন মোডে গ্লোবাল ভ্যারিয়েবল ছাড়া সরাসরি কানেক্ট হবে
    client = new MongoClient(uri!, options);
    clientPromise = client.connect();
}

// এই ফাংশনটি কল করলেই আমরা ডাটাবেজের অবজেক্টটি পেয়ে যাব
export async function getDb(dbName = 'gearshare') {
    const mongoClient = await clientPromise;
    return mongoClient.db(dbName);
}

export default clientPromise;