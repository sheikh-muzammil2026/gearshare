import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function FeaturedProducts() {
  const featuredProducts = [
    {
      id: '1',
      title: 'Sony Alpha IV Mirrorless Camera',
      img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80',
      price: '$35 / Day',
      location: 'Gulshan, Dhaka',
      rating: '4.9',
    },
    {
      id: '2',
      title: 'DJI Mavic 3 Pro Drone',
      img: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=500&q=80',
      price: '$50 / Day',
      location: 'Dhanmondi, Dhaka',
      rating: '5.0',
    },
    {
      id: '3',
      title: 'PlayStation 5 Slim (1TB)',
      img: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=500&q=80',
      price: '$12 / Day',
      location: 'Uttara, Dhaka',
      rating: '4.8',
    },
    {
      id: '4',
      title: 'Apple MacBook Pro M3 Max',
      img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80',
      price: '$80 / Day',
      location: 'Banani, Dhaka',
      rating: '4.9',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        {featuredProducts.map((prod) => (
          <div key={prod.id} className="bg-white rounded-gear overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-[420px] group">
            <div className="overflow-hidden relative">
              <img src={prod.img} alt={prod.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-4 space-y-2 flex-grow">
              <h3 className="font-bold text-primary text-base line-clamp-2 group-hover:text-accent transition-colors">{prod.title}</h3>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{prod.location}</span>
                <span className="text-yellow-500 font-bold">★ {prod.rating}</span>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
              <span className="font-bold text-accent text-lg">{prod.price}</span>
              <Link href={`/explore/${prod.id}`} className="bg-primary hover:bg-accent text-white text-xs font-semibold px-4 py-2 rounded-gear transition-all duration-300 hover:shadow-md">
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
