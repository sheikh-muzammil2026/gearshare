import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise), // 🔐 এটি গুগল দিয়ে লগইন করা মাত্রই ডাটাবেজে ইউজার সেভ করবে
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
  callbacks: {
    // 🧠 ১. গুগল লগইনের পর ডাটাবেজ থেকে তৈরি হওয়া ইউজার আইডি টোকেনে সেট করবে
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // 👥 ২. ব্রাউজারে useSession() হুক যখন কল হবে, তখন এই সেশন অবজেক্টটি রিটার্ন করবে
    async session({ session, token }) {
      if (session.user && token) {
        // @ts-ignore
        session.user.id = token.id;
      }
      return session;
    },
    // 🚀 ৩. লগইন সফল হলে রিডাইরেক্ট হ্যান্ডল করবে
    async redirect({ baseUrl }) {
      return baseUrl; // সফল হলে সরাসরি হোম পেজে নিয়ে যাবে
    }
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
