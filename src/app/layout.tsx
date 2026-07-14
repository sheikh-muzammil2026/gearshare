import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GearShare - Tech Gadget Rental Platform",
  description: "Production-ready gadget rental full-stack web application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-neutralBg text-primary min-h-screen flex flex-col justify-between`}>
        <div>
          <Navbar />
          <main>
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}

// MONGODB_URI=mongodb+srv://gearshare:eU4IsxJhtgL6cmBS@cluster0.xxxx.mongodb.net/?retryWrites=true&w=majority
// MONGODB_URI=mongodb://gearshare:eU4IsxJhtgL6cmBS@ac-famfzlt-shard-00-00.w9cbrwo.mongodb.net:27017,ac-famfzlt-shard-00-01.w9cbrwo.mongodb.net:27017,ac-famfzlt-shard-00-02.w9cbrwo.mongodb.net:27017/gearshare?ssl=true&replicaSet=atlas-131uq2-shard-0&authSource=admin&appName=Cluster0

// JWT_SECRET=your_super_secret_jwt_key_here
// NEXTAUTH_URL=http://localhost:3000