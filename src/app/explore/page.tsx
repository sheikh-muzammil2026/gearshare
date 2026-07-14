'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin, SlidersHorizontal, Tag, ArrowRight, Loader2 } from 'lucide-react';

const CATEGORIES = [
    'All Gears',
    'Professional Camera',
    'Drones & Action Cams',
    'Sound & Audio Gear',
    'Gaming Consoles',
    'Laptops & Computers',
];

export default function ExploreGears() {
    const [gears, setGears] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Gears');

    // পেজ লোড হওয়ার সাথে সাথে API থেকে ডেটা নিয়ে আসা
    useEffect(() => {
        const fetchGears = async () => {
            try {
                const res = await fetch('/api/items');
                if (!res.ok) throw new Error('Failed to fetch data from database');
                const data = await res.json();
                setGears(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGears();
    }, []);

    // সার্চ এবং ক্যাটেগরি ফিল্টারিং লজিক (রিয়েল-টাইম)
    const filteredGears = gears.filter((gear) => {
        const matchesSearch = gear.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            gear.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All Gears' || gear.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-gray-500 gap-2">
                <Loader2 className="animate-spin text-accent w-8 h-8" />
                <p className="text-sm font-medium">Loading premium gears from database...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center text-red-500 font-medium">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutralBg px-4 py-8 md:py-12 animate-[fadeIn_0.5s_ease-out]">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Title */}
                <div className="text-center md:text-left space-y-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">Explore Available Gears</h1>
                    <p className="text-gray-500 text-sm md:text-base">Browse and rent top-tier professional gadgets near you.</p>
                </div>

                {/* Search & Filter Bar */}
                <div className="bg-white p-4 rounded-gear border border-gray-200 shadow-md flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative w-full md:flex-1">
                        <Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by gear name or location..."
                            className="w-full bg-gray-50 border border-gray-200 rounded-gear py-3 pl-11 pr-4 text-sm font-medium text-primary outline-none focus:border-accent focus:bg-white transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-gray-100">
                        <SlidersHorizontal className="text-gray-400 w-5 h-5 hidden md:block" />
                        <select
                            className="w-full md:w-56 bg-gray-50 border border-gray-200 rounded-gear py-3 px-4 text-sm font-medium text-primary outline-none focus:border-accent focus:bg-white transition-all cursor-pointer"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {CATEGORIES.map((cat, idx) => (
                                <option key={idx} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Product Grid */}
                {filteredGears.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {filteredGears.map((gear) => (
                            <div
                                key={gear._id} // MongoDB-র ডিফল্ট ইউনিক আইডি
                                className="bg-white rounded-gear border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden"
                            >
                                {/* Product Image (Unsplash placeholder based on query or generic fallback) */}
                                <div className="relative aspect-[4/3] w-full bg-gray-100 overflow-hidden">
                                    <img
                                        src={`https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80`}
                                        alt={gear.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <span className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm ${gear.available ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'
                                        }`}>
                                        {gear.available ? 'Available' : 'Rented Out'}
                                    </span>
                                </div>

                                {/* Product Content Details */}
                                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                    <div className="space-y-2">
                                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent uppercase tracking-wider">
                                            <Tag size={12} /> {gear.category}
                                        </span>
                                        <h3 className="font-bold text-lg text-primary leading-snug group-hover:text-accent transition-colors line-clamp-2">
                                            {gear.title}
                                        </h3>
                                    </div>

                                    <div className="space-y-3 pt-2 border-t border-gray-50">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1 text-gray-500 text-sm">
                                                <MapPin size={16} className="text-gray-400" />
                                                <span>{gear.location}</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xl font-extrabold text-primary">${gear.price}</span>
                                                <span className="text-gray-500 text-xs font-medium"> / day</span>
                                            </div>
                                        </div>

                                        <Link
                                            href={`/explore/${gear._id}`}
                                            className={`w-full py-3 rounded-gear text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${gear.available
                                                    ? 'bg-accent text-white hover:bg-blue-700 shadow-md shadow-blue-500/10'
                                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                }`}
                                            onClick={(e) => !gear.available && e.preventDefault()}
                                        >
                                            {gear.available ? 'Rent Now' : 'Not Available'}
                                            {gear.available && <ArrowRight size={14} />}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State View */
                    <div className="text-center py-16 bg-white rounded-gear border border-gray-200 p-8">
                        <p className="text-lg font-semibold text-gray-600">No tech gears found matching your criteria.</p>
                        <p className="text-sm text-gray-400 mt-1">Try clearing your filters or search for something else.</p>
                    </div>
                )}

            </div>
        </div>
    );
}