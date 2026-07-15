'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, LogOut, LogIn, UserPlus } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Authentication state

    // 🔐 ডাইনামিকালি আমাদের JWT কুকি 'user_session' চেক করা
    useEffect(() => {
        const checkAuth = () => {
            const hasSession = document.cookie.includes('user_session=');
            setIsLoggedIn(hasSession);
        };

        checkAuth();
        
        // পেজ ফোকাস বা কুকি স্টেট পরিবর্তনের ক্ষেত্রে রিয়েলটাইম আপডেট রাখার জন্য
        window.addEventListener('focus', checkAuth);
        return () => window.removeEventListener('focus', checkAuth);
    }, []);

    // 🌍 সবার জন্য ওপেন সাধারণ রুটস
    const publicRoutes = [
        { name: 'Home', path: '/' },
        { name: 'Explore Gears', path: '/explore' },
        { name: 'About Us', path: '/about' },
    ];

    // 🛡️ শুধুমাত্র লগইন থাকলে এই রুটগুলো দেখাবে (ড্যাশবোর্ড সম্পূর্ণ রিমুভড)
    const protectedRoutes = [
        { name: 'Home', path: '/' },
        { name: 'Explore Gears', path: '/explore' },
        { name: 'Add Item', path: '/items/add' },
        { name: 'Manage Items', path: '/dashboard/manage' },
        { name: 'About Us', path: '/about' },
    ];

    const currentRoutes = isLoggedIn ? protectedRoutes : publicRoutes;

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/auth/logout', { method: 'POST' });
            if (res.ok) {
                alert('সফলভাবে লগআউট হয়েছে!');
                setIsLoggedIn(false);
                window.location.href = '/login'; // লগআউট শেষে লগইন পেজে রিডাইরেক্ট
            }
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    return (
        <nav className="sticky top-0 z-50 bg-primary text-white border-b border-gray-800 shadow-md backdrop-blur-md bg-opacity-95 transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-xl font-bold tracking-wider flex items-center gap-2">
                            <span className="text-accent">Gear</span>Share
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        {currentRoutes.map((route) => (
                            <Link
                                key={route.path}
                                href={route.path}
                                className="hover:text-accent transition-colors duration-200 text-sm font-medium"
                            >
                                {route.name}
                            </Link>
                        ))}

                        {/* 🔄 Dynamic Auth Buttons for Desktop */}
                        {isLoggedIn ? (
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-gear text-sm font-medium transition-all"
                                >
                                    <LogOut size={15} /> Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/login"
                                    className="flex items-center gap-1.5 hover:text-accent border border-gray-700 hover:border-accent px-4 py-2 rounded-gear text-sm font-medium transition-all"
                                >
                                    <LogIn size={15} /> Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="flex items-center gap-1.5 bg-accent hover:bg-blue-700 px-5 py-2 rounded-gear text-sm font-medium transition-all shadow-lg shadow-blue-500/20"
                                >
                                    <UserPlus size={15} /> Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-400 hover:text-white focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="md:hidden bg-primary border-t border-gray-800 transition-all duration-300">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {currentRoutes.map((route) => (
                            <Link
                                key={route.path}
                                href={route.path}
                                onClick={() => setIsOpen(false)}
                                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-accent"
                            >
                                {route.name}
                            </Link>
                        ))}

                        {/* 🔄 Dynamic Auth Buttons for Mobile */}
                        {isLoggedIn ? (
                            <div className="pt-4 pb-2 border-t border-gray-800 space-y-2 px-3">
                                <button
                                    onClick={() => { setIsOpen(false); handleLogout(); }}
                                    className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-2 rounded-gear text-base font-medium"
                                >
                                    <LogOut size={18} /> Logout
                                </button>
                            </div>
                        ) : (
                            <div className="pt-4 pb-2 border-t border-gray-800 space-y-2 px-3">
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full flex items-center justify-center gap-2 border border-gray-700 hover:border-accent px-3 py-2 rounded-gear text-base font-medium"
                                >
                                    <LogIn size={18} /> Login
                                </Link>
                                <Link
                                    href="/register"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-blue-700 px-3 py-2 rounded-gear text-base font-medium"
                                >
                                    <UserPlus size={18} /> Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
