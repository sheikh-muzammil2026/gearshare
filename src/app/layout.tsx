import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/components/providers"; 

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
        {/* 🛡️ এখানে AuthProvider ব্যবহার করার কারণে সার্ভার সাইড এরর আর আসবে না */}
        <AuthProvider>
          <div>
            <Navbar />
            <main>
              {children}
            </main>
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
