'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, ArrowRight, Loader2, Key } from 'lucide-react';
import { signIn } from 'next-auth/react';
export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState(false);

    // ডেমো ক্রেডেনশিয়াল অটো-ফিল ফাংশন
    const handleDemoLogin = (role: 'admin' | 'user') => {
        if (role === 'admin') {
            setFormData({
                email: 'discordsstudent@gmail.com',
                password: 'password123',
            });
        } else {
            setFormData({
                email: 'user@gearshare.com',
                password: 'password123',
            });
        }
    };

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

            document.cookie = `token=${data.token}; path=/; max-age=86400`;
            window.location.href = '/';

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // গুগল সোশ্যাল লগইন হ্যান্ডলার
    const handleGoogleLogin = async () => {
        setSocialLoading(true);
        try {
            
            await signIn('google', { callbackUrl: '/' }); 
        } catch (err) {
            setError("Google login failed. Please try again.");
            setSocialLoading(false);
        }
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center bg-neutralBg px-4 py-12 animate-[fadeIn_0.5s_ease-out]">
            <div className="max-w-md w-full bg-white rounded-gear border border-gray-200 shadow-xl p-8 space-y-6">

                {/* Header */}
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold text-primary tracking-tight">Welcome Back</h2>
                    <p className="text-gray-500 text-sm">Sign in to access your dashboard and active gears</p>
                </div>

                {error && <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-gear font-medium">⚠️ {error}</div>}

                {/* ─── DEMO LOGIN BUTTONS (রিকোয়ারমেন্ট অনুযায়ী ক্রেডেনশিয়াল অটো-ফিল) ─── */}
                <div className="bg-slate-50 border border-dashed border-slate-200 p-4 rounded-gear space-y-2">
                    <p className="text-xs font-bold text-gray-500 flex items-center gap-1 uppercase tracking-wider">
                        <Key size={14} className="text-accent animate-pulse" /> Try Quick Demo Login:
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            type="button"
                            onClick={() => handleDemoLogin('admin')}
                            className="bg-white hover:bg-slate-100 text-primary border border-gray-200 py-1.5 px-3 rounded text-xs font-semibold shadow-sm transition-all"
                        >
                            Demo Admin
                        </button>
                        <button
                            type="button"
                            onClick={() => handleDemoLogin('user')}
                            className="bg-white hover:bg-slate-100 text-primary border border-gray-200 py-1.5 px-3 rounded text-xs font-semibold shadow-sm transition-all"
                        >
                            Demo User
                        </button>
                    </div>
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
                                value={formData.email}
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
                                value={formData.password}
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
                        disabled={loading}
                        className="w-full group bg-accent hover:bg-blue-700 text-white font-semibold py-3.5 rounded-gear transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10 active:scale-95 disabled:bg-gray-400 mt-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin w-4 h-4" /> Signing In...
                            </>
                        ) : (
                            <>
                                Sign In <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                {/* ─── OR DIVIDER ─── */}
                <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-xs font-bold uppercase">Or</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                </div>

                {/* ─── GOOGLE SOCIAL LOGIN BUTTON ─── */}
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={socialLoading}
                    className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-gear transition-all flex items-center justify-center gap-2.5 active:scale-95 disabled:bg-gray-100"
                >
                    {socialLoading ? (
                        <Loader2 className="animate-spin w-4 h-4" />
                    ) : (
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                    )}
                    Continue with Google
                </button>

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
