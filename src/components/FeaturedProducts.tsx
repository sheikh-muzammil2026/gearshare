'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ডাটাবেস থেকে লেটেস্ট প্রোডাক্ট নিয়ে আসা
  useEffect(() => {
    const fetchFeaturedGears = async () => {
      try {
        const res = await fetch('/api/items', {
          cache: 'no-store',
          headers: {
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache'
          }
        });
        const data = await res.json();
        if (res.ok) {
          // ডাটাবেস থেকে শুধুমাত্র প্রথম ৪টি (Featured) আইটেম ফিল্টার করে নেওয়া হলো
          setProducts(data.slice(0, 4));
        }
      } catch (err) {
        console.error('Error fetching featured products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedGears();
  }, []);

  if (loading) {
    return (
      <div className="py-12 flex flex-col items-center justify-center text-gray-500 gap-2">
        <Loader2 className="animate-spin text-accent w-6 h-6" />
        <p className="text-xs font-medium">Loading featured gears...</p>
      </div>
    );
  }

  // যদি ডাটাবেসে কোনো প্রোডাক্ট না থাকে তবে পুরো সেকশনটি হাইড বা খালি মেসেজ দেখাবে
  if (products.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">Featured Gear Up For Rent</h2>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">Explore outstanding high-demand products handpicked for you</p>
        </div>
        <Link href="/explore" className="text-accent hover:underline font-medium flex items-center gap-1 group text-sm sm:text-base">
          View All Items <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((prod) => (
          <div key={prod._id} className="bg-white rounded-gear overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-[420px] group">
            
            {/* Product Image - আপনার আগের Explore পেজের মতো প্লেসহোল্ডার ইমেজ জেনারেট করা */}
            <div className="overflow-hidden relative h-48 w-full bg-gray-100">
              <img 
                src={`https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80`} 
                alt={prod.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <span className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm ${
                prod.available ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'
              }`}>
                {prod.available ? 'Available' : 'Rented Out'}
              </span>
            </div>

            {/* Content Details */}
            <div className="p-4 space-y-2 flex-grow flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-accent uppercase tracking-wider block mb-1">
                  {prod.category}
                </span>
                <h3 className="font-bold text-primary text-base line-clamp-2 group-hover:text-accent transition-colors">
                  {prod.title}
                </h3>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 pt-2">
                <span>{prod.location}</span>
                {/* ডাটাবেজে রেটিং না থাকলে ডিফল্ট ৫.০ স্টার দেখাবে */}
                <span className="text-yellow-500 font-bold">★ {prod.rating || '5.0'}</span>
              </div>
            </div>

            {/* Footer Pricing & Button */}
            <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
              <span className="font-bold text-accent text-lg">${prod.price} <span className="text-xs text-gray-500 font-normal">/ Day</span></span>
              <Link href={`/explore/${prod._id}`} className="bg-primary hover:bg-accent text-white text-xs font-semibold px-4 py-2 rounded-gear transition-all duration-300 hover:shadow-md">
                Details
              </Link>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
