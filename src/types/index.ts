import { ObjectId } from 'mongodb';

// ১. ইউজার ডাটা টাইপ
export interface User {
    _id?: ObjectId;
    name: string;
    email: string;
    passwordHash: string;
    role: 'user' | 'admin';
    createdAt: Date;
}

// ২. প্রোডাক্ট বা আইটেম ডাটা টাইপ
export interface ProductItem {
    _id?: ObjectId;
    title: string;
    shortDescription: string;
    fullDescription: string;
    pricePerDay: number;
    category: string;
    images: string[];
    location: string;
    rating: number;
    ownerId: ObjectId; // কোন ইউজার এটি লিস্টিং করেছে
    createdAt: Date;
}