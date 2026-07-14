'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, DollarSign, MapPin, Tag, FileText, ArrowRight, Loader2 } from 'lucide-react';

export default function AddItem() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        price: '',
        location: '',
        description: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const categories = [
        'Professional Camera',
        'Drones & Action Cams',
        'Sound & Audio Gear',
        'Gaming Consoles',
        'Laptops & Computers',
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            // রিয়েল-টাইম MongoDB API কল
            const res = await fetch('/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: formData.title,
                    category: formData.category,
                    price: formData.price,
                    location: formData.location,
                    description: formData.description
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to list the gear.');
            }

            setSuccess('Your gear has been listed successfully!');

            // শুধুমাত্র ডেটাবেসে সফলভাবে সেভ হলেই ২ সেকেন্ড পর রিডাইরেক্ট করবে
            setTimeout(() => {
                router.push('/explore');
            }, 2000);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[85vh] bg-neutralBg px-4 py-12 animate-[fadeIn_0.5s_ease-out]">
            <div className="max-w-2xl mx-auto bg-white rounded-gear border border-gray-200 shadow-xl p-8 space-y-8">

                {/* Header */}
                <div className="border-b border-gray-100 pb-5">
                    <h2 className="text-3xl font-bold text-primary tracking-tight">List Your Gadget</h2>
                    <p className="text-gray-500 text-sm mt-1">Fill out the form below to rent out your premium tech gear safely</p>
                </div>

                {/* Status Notifications (For Assignment Validation) */}
                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-gear font-semibold animate-[shake_0.3s_ease-in-out]">
                        ⚠️ {error}
                    </div>
                )}
                {success && (
                    <div className="p-4 bg-green-50 border border-green-200 text-green-600 text-sm rounded-gear font-semibold">
                        🎉 {success}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Image Upload Box Placeholder */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Upload Product Images</label>
                        <div className="border-2 border-dashed border-gray-300 hover:border-accent bg-gray-50/50 rounded-gear p-8 text-center cursor-pointer transition-colors group">
                            <Upload className="mx-auto w-10 h-10 text-gray-400 group-hover:text-accent group-hover:-translate-y-1 transition-all duration-300" />
                            <p className="text-sm font-medium text-gray-600 mt-2">Click to upload or drag and drop</p>
                            <p className="text-xs text-gray-400 mt-1">Supports PNG, JPG or JPEG (Max 5MB per image)</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Item Title */}
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Gadget Title</label>
                            <div className="relative">
                                <FileText className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    placeholder="e.g. Sony Alpha IV Mirrorless Camera"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-gear py-3 pl-11 pr-4 text-sm font-medium text-primary outline-none focus:border-accent focus:bg-white transition-all"
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Category Select Dropdown */}
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</label>
                            <div className="relative">
                                <Tag className="absolute left-3 top-3.5 text-gray-400 w-5 h-5 pointer-events-none" />
                                <select
                                    required
                                    value={formData.category}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-gear py-3 pl-11 pr-4 text-sm font-medium text-primary outline-none focus:border-accent focus:bg-white transition-all appearance-none cursor-pointer"
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="" disabled>Select Category</option>
                                    {categories.map((cat, idx) => (
                                        <option key={idx} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Rental Price per Day */}
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Rental Price ($ / Day)</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                                <input
                                    type="number"
                                    required
                                    min="1"
                                    value={formData.price}
                                    placeholder="e.g. 25"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-gear py-3 pl-11 pr-4 text-sm font-medium text-primary outline-none focus:border-accent focus:bg-white transition-all"
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Pickup / Rental Location */}
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Pickup Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    required
                                    value={formData.location}
                                    placeholder="e.g. Gulshan, Dhaka"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-gear py-3 pl-11 pr-4 text-sm font-medium text-primary outline-none focus:border-accent focus:bg-white transition-all"
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Detailed Item Description */}
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Detailed Description</label>
                        <textarea
                            required
                            rows={5}
                            value={formData.description}
                            placeholder="Describe the specs, condition, and inclusion of your item (e.g. includes 2 batteries, kit lens, charger)..."
                            className="w-full bg-gray-50 border border-gray-200 rounded-gear p-4 text-sm font-medium text-primary outline-none focus:border-accent focus:bg-white transition-all resize-none"
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center justify-end gap-4 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            disabled={loading}
                            onClick={() => router.back()}
                            className="px-6 py-3 border border-gray-200 text-gray-600 font-semibold text-sm rounded-gear hover:bg-gray-50 transition-colors active:scale-95 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group bg-accent hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-gear text-sm transition-all flex items-center gap-2 shadow-lg shadow-blue-500/10 active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin w-4 h-4" /> Posting Gear...
                                </>
                            ) : (
                                <>
                                    Submit & Post <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
}