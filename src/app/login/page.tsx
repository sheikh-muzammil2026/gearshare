'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, ArrowRight, LogIn } from 'lucide-react';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Invalid email or password');
            }

            // টোকেনটি ব্রাউজার কুকিতে সেভ করা (যা আমরা ব্যাকএন্ড লজিকের জন্য ব্যবহার করব)
            document.cookie = `token=${data.token}; path=/; max-age=86400`; // ১ দিন স্থায়ী

            // লগইন সফল হলে হোমপেজে পাঠানো
            window.location.href = '/';

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[75vh] flex items-center justify-center bg-neutralBg px-4 py-12 animate-[fadeIn_0.5s_ease-out]">
            <div className="max-w-md w-full bg-white rounded-gear border border-gray-200 shadow-xl p-8 space-y-6">

                {/* Header */}
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold text-primary tracking-tight">Welcome Back</h2>
                    <p className="text-gray-500 text-sm">Sign in to access your dashboard and active gears</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Email Address */}
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-600 uppercase">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                            <input
                                type="email"
                                required
                                placeholder="john@example.com"
                                className="w-full bg-gray-50 border border-gray-200 rounded-gear py-3 pl-11 pr-4 text-sm font-medium text-primary outline-none focus:border-accent focus:bg-white transition-all"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-1">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-semibold text-gray-600 uppercase">Password</label>
                            <Link href="/forgot-password" className="text-xs font-semibold text-accent hover:underline">
                                Forgot Password?
                            </Link>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                className="w-full bg-gray-50 border border-gray-200 rounded-gear py-3 pl-11 pr-4 text-sm font-medium text-primary outline-none focus:border-accent focus:bg-white transition-all"
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Remember Me Option */}
                    <div className="flex items-center gap-2 pt-1">
                        <input type="checkbox" id="remember" className="accent-accent" />
                        <label htmlFor="remember" className="text-xs text-gray-500 cursor-pointer select-none">
                            Keep me signed in on this device
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full group bg-accent hover:bg-blue-700 text-white font-semibold py-3.5 rounded-gear transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10 active:scale-95 mt-2"
                    >
                        Sign In <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                {/* Footer Link */}
                <div className="text-center pt-2 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className="text-accent font-semibold hover:underline">
                            Sign Up Now
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}