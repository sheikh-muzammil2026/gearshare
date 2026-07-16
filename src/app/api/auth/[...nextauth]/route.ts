import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise), // 🔐 এটি গুগল দিয়ে লগইন করা মাত্রই ডাটাবেজে ইউজার সেভ করবে
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // সেশন ম্যানেজমেন্টের জন্য টোকেন ট্র্যাকিং সুবিধা রাখবে
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
