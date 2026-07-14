'use client';
import { useState } from 'react';
import Link from 'next/link';
import { User, Mail, Lock, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // পাসওয়ার্ড ম্যাচিং চেক (ভ্যালিডেশন)
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            setSuccess('Registration successful! Redirecting to login...');

            // ৩ সেকেন্ড পর লগইন পেজে নিয়ে যাবে
            setTimeout(() => {
                window.location.href = '/login';
            }, 3000);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-neutralBg px-4 py-12 animate-[fadeIn_0.5s_ease-out]">
            <div className="max-w-md w-full bg-white rounded-gear border border-gray-200 shadow-xl p-8 space-y-6">

                {/* Header */}
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold text-primary tracking-tight">Create Account</h2>
                    <p className="text-gray-500 text-sm">Join GearShare and start renting premium tech gears</p>
                </div>

                {error && <div className="p-3 bg-red-100 border border-red-300 text-red-700 text-xs rounded-gear font-medium">{error}</div>}
                {success && <div className="p-3 bg-green-100 border border-green-300 text-green-700 text-xs rounded-gear font-medium">{success}</div>}
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Full Name */}
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-600 uppercase">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                required
                                placeholder="John Doe"
                                className="w-full bg-gray-50 border border-gray-200 rounded-gear py-3 pl-11 pr-4 text-sm font-medium text-primary outline-none focus:border-accent focus:bg-white transition-all"
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    </div>

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

                    {/* Phone Number */}
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-600 uppercase">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                            <input
                                type="tel"
                                required
                                placeholder="+880 17XXXXXXXX"
                                className="w-full bg-gray-50 border border-gray-200 rounded-gear py-3 pl-11 pr-4 text-sm font-medium text-primary outline-none focus:border-accent focus:bg-white transition-all"
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-600 uppercase">Password</label>
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

                    {/* Terms Agreement */}
                    <div className="flex items-start gap-2 pt-1">
                        <input type="checkbox" required id="terms" className="mt-1 accent-accent" />
                        <label htmlFor="terms" className="text-xs text-gray-500 leading-normal cursor-pointer">
                            I agree to the <Link href="/terms" className="text-accent hover:underline">Terms & Conditions</Link> and verify that all my security details are authentic.
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full group bg-accent hover:bg-blue-700 text-white font-semibold py-3.5 rounded-gear transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10 active:scale-95 mt-2"
                    >
                        Create Account <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                {/* Footer Link */}
                <div className="text-center pt-2 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link href="/login" className="text-accent font-semibold hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}