import dns from "node:dns";
dns.setServers(['1.1.1.1', '1.0.0.1']);

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;

if (!uri) {
    throw new Error('Please add your MONGODB_URI to .env.local');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
    // ডেভেলপমেন্ট মোডে গ্লোবাল ভেরিয়েবল ব্যবহার করা হয় যাতে হট-রিলোডে কানেকশন স্প্যাম না হয়
    let globalWithMongo = global as typeof globalThis & {
        _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
        client = new MongoClient(uri);
        globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
} else {
    // প্রোডাকশন মোডে সরাসরি নতুন কানেকশন
    client = new MongoClient(uri);
    clientPromise = client.connect();
}

export default clientPromise;