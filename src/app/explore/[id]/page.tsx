'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Loader2, MapPin, Tag, Calendar, CheckCircle2, XCircle, Star } from 'lucide-react';
import Link from 'next/link';

export default function GearDetailsPage() {
    const params = useParams();
    const id = params?.id;

    const [item, setItem] = useState<any>(null);
    const [relatedItems, setRelatedItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchDetailsAndRelated = async () => {
            try {
                // ১. মূল প্রোডাক্টের ডিটেইলস ডেটা ফেচ করা
                const res = await fetch(`/api/items/${id}`, { cache: 'no-store' });
                const data = await res.json();
                
                if (res.ok) {
                    setItem(data);
                    
                    // ২. রিলেটেড আইটেম ফেচ করা (একই ক্যাটাগরির অন্য প্রোডাক্টস)
                    const relatedRes = await fetch(`/api/items?category=${data.category}`, { cache: 'no-store' });
                    const relatedData = await relatedRes.json();
                    if (relatedRes.ok) {
                        // বর্তমান প্রোডাক্ট বাদ দিয়ে সর্বোচ্চ ৩টি রিলেটেড প্রোডাক্ট নেওয়া
                        const filtered = relatedData.filter((i: any) => i._id !== id).slice(0, 3);
                        setRelatedItems(filtered);
                    }
                }
            } catch (err) {
                console.error('Error fetching gear details:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDetailsAndRelated();
    }, [id]);

    // লোডিং স্টেট (Skeleton/Spinner)
    if (loading) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-gray-500 gap-2">
                <Loader2 className="animate-spin text-accent w-10 h-10" />
                <p className="font-medium text-sm">Loading gadget details...</p>
            </div>
        );
    }

    // প্রোডাক্ট পাওয়া না গেলে
    if (!item) {
        return (
            <div className="max-w-4xl mx-auto p-6 text-center py-20 space-y-4">
                <h2 className="text-2xl font-bold text-primary">Gear Not Found!</h2>
                <p className="text-gray-500">The gadget you are looking for might have been removed.</p>
                <Link href="/explore" className="inline-block bg-accent text-white px-5 py-2.5 rounded-gear font-semibold text-sm">
                    Back to Explore
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
            
            {/* ─── মূল কন্টেন্ট সেকশন (Top Content) ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                
                {/* বাম পাশ: ইমেজ বা মিডিয়া গ্যালারি */}
                <div className="bg-white border border-gray-200 rounded-gear overflow-hidden shadow-sm sticky top-6">
                    <div className="relative h-[300px] sm:h-[400px] bg-gray-50">
                        <img 
                            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80" 
                            alt={item.title} 
                            className="w-full h-full object-cover"
                        />
                        <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full shadow-md border ${
                            item.available ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'
                        }`}>
                            {item.available ? 'Available Now' : 'Rented Out'}
                        </span>
                    </div>
                </div>

                {/* ডান পাশ: প্রোডাক্টের প্রধান তথ্যাদি */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <span className="text-xs font-bold text-accent uppercase tracking-widest bg-blue-50 text-blue-600 px-2.5 py-1 rounded">
                            {item.category}
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-primary pt-2">{item.title}</h1>
                    </div>

                    {/* রেটিং ও রিভিউ সামারি */}
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
                        <div className="flex text-yellow-500 font-bold items-center gap-0.5">
                            <Star size={16} fill="currentColor" />
                            <span className="text-sm text-primary ml-1">{item.rating || '5.0'}</span>
                        </div>
                        <span className="text-gray-300">|</span>
                        <span className="text-xs text-gray-500">(12 Verified Reviews)</span>
                    </div>

                    {/* প্রাইস এবং রেন্ট বাটন কার্ড */}
                    <div className="bg-gray-50 border border-gray-200 p-5 rounded-gear flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Rental Price</p>
                            <h2 className="text-2xl sm:text-3xl font-black text-accent">${item.price} <span className="text-sm font-normal text-gray-500">/ day</span></h2>
                        </div>
                        <button 
                            disabled={!item.available}
                            className={`w-full sm:w-auto px-6 py-3 rounded-gear font-bold text-sm shadow-md transition-all active:scale-95 ${
                                item.available 
                                ? 'bg-primary text-white hover:bg-accent' 
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            {item.available ? 'Book This Gear' : 'Not Available'}
                        </button>
                    </div>

                    {/* ─── KEY INFORMATION / SPECIFICATIONS ─── */}
                    <div className="bg-white border border-gray-200 rounded-gear p-5 shadow-sm space-y-4">
                        <h3 className="text-lg font-bold text-primary border-b border-gray-100 pb-2">Key Specifications</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-3 text-gray-600">
                                <MapPin size={18} className="text-gray-400 shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-400">Location</p>
                                    <p className="font-medium text-primary">{item.location}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <Tag size={18} className="text-gray-400 shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-400">Category</p>
                                    <p className="font-medium text-primary">{item.category}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <Calendar size={18} className="text-gray-400 shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-400">Listed Date</p>
                                    <p className="font-medium text-primary">
                                        {item.createdAt?.$date ? new Date(item.createdAt.$date).toLocaleDateString() : new Date().toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                {item.available ? <CheckCircle2 size={18} className="text-green-500 shrink-0" /> : <XCircle size={18} className="text-red-500 shrink-0" />}
                                <div>
                                    <p className="text-xs text-gray-400">Status</p>
                                    <p className="font-medium text-primary">{item.available ? 'Ready to share' : 'Currently rented'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── DESCRIPTION / OVERVIEW ─── */}
            <div className="bg-white border border-gray-200 rounded-gear p-6 shadow-sm space-y-3">
                <h3 className="text-xl font-bold text-primary border-b border-gray-100 pb-3">Description & Overview</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {item.description}
                </p>
            </div>

            {/* ─── REVIEWS / RATINGS ─── */}
            <div className="bg-white border border-gray-200 rounded-gear p-6 shadow-sm space-y-4">
                <h3 className="text-xl font-bold text-primary border-b border-gray-100 pb-3">User Reviews & Ratings</h3>
                <div className="space-y-4 divide-y divide-gray-100">
                    {/* Dummy Review 1 */}
                    <div className="pt-2 first:pt-0 space-y-1">
                        <div className="flex justify-between items-center">
                            <h4 className="font-semibold text-sm text-primary">Zahid Hasan</h4>
                            <span className="text-xs text-gray-400">2 days ago</span>
                        </div>
                        <div className="flex text-yellow-500 text-xs">★★★★★</div>
                        <p className="text-gray-600 text-xs sm:text-sm">Great condition! The owner was very helpful and responsive. Recommended.</p>
                    </div>
                    {/* Dummy Review 2 */}
                    <div className="pt-4 space-y-1">
                        <div className="flex justify-between items-center">
                            <h4 className="font-semibold text-sm text-primary">Anika Tahsin</h4>
                            <span className="text-xs text-gray-400">1 week ago</span>
                        </div>
                        <div className="flex text-yellow-500 text-xs">★★★★☆</div>
                        <p className="text-gray-600 text-xs sm:text-sm">Works perfectly fine. Minor scratches but excellent value for money.</p>
                    </div>
                </div>
            </div>

            {/* ─── RELATED ITEMS ─── */}
            {relatedItems.length > 0 && (
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-primary">Related Items you might like</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {relatedItems.map((related) => (
                            <Link 
                                href={`/explore/${related._id}`} 
                                key={related._id} 
                                className="bg-white rounded-gear overflow-hidden border border-gray-200 hover:shadow-lg transition-all flex flex-col justify-between h-[360px] group"
                            >
                                <div className="h-40 bg-gray-50 overflow-hidden">
                                    <img 
                                        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80" 
                                        alt={related.title} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-4 space-y-1 flex-grow">
                                    <span className="text-[10px] font-bold text-accent uppercase block">{related.category}</span>
                                    <h4 className="font-bold text-primary text-sm line-clamp-2 group-hover:text-accent">{related.title}</h4>
                                    <p className="text-xs text-gray-400 pt-1">{related.location}</p>
                                </div>
                                <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                                    <span className="font-bold text-accent text-sm">${related.price}/day</span>
                                    <span className="text-primary text-xs font-semibold group-hover:underline">View →</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
