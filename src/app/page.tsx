import Link from 'next/link';
import {
  Camera,
  Tv,
  Laptop,
  Gamepad,
  Clock,
  ShieldCheck,
  ThumbsUp,
  ArrowRight,
  HelpCircle
} from 'lucide-react';

export default function Home() {

  // Section 2: Categories Data
  const categories = [
    { name: 'Professional Camera', count: '12 Gadgets Available', icon: <Camera className="w-8 h-8 text-accent group-hover:rotate-12 transition-transform duration-300" /> },
    { name: 'Drones & Action Cams', count: '8 Gadgets Available', icon: <Laptop className="w-8 h-8 text-accent group-hover:scale-110 transition-transform duration-300" /> },
    { name: 'Sound & Audio Gear', count: '15 Gadgets Available', icon: <Tv className="w-8 h-8 text-accent group-hover:-translate-y-1 transition-transform duration-300" /> },
    { name: 'Gaming Consoles', count: '10 Gadgets Available', icon: <Gamepad className="w-8 h-8 text-accent group-hover:skew-x-6 transition-transform duration-300" /> },
  ];

  // Section 4: Featured Products Data (No dummy text, production-ready)
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

  // Section 6: FAQ Data
  const faqs = [
    { q: 'How do I rent a gadget?', a: 'Simply create an account, browse through our extensive collection, select your desired dates, and submit a rental request.' },
    { q: 'What about gadget safety and security?', a: 'We verify all users using official NID/Passport checks and use premium secure escrow contracts for every single transaction.' },
    { q: 'When do I get paid for renting out my gear?', a: 'Your earnings are instantly credited to your verified wallet as soon as the renter successfully confirms the item handover.' },
  ];

  return (
    <div className="space-y-20 pb-20 bg-neutralBg">

      {/* 1. HERO SECTION (Height 60-70% screen + Smooth Fade-in Animations) */}
      <section className="relative h-[65vh] flex items-center bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.15),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="max-w-3xl space-y-6 animate-[fadeIn_1s_ease-out]">
            <span className="inline-block bg-accent/20 text-accent font-semibold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider animate-[pulse_3s_infinite]">
              Premium Tech Gadget Rental Platform
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Access Premium Tech, <br />
              <span className="text-accent">Rent & Earn Smartly!</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl opacity-90 transition-opacity">
              From professional cameras to gaming consoles—get what you need, exactly when you need it. Monetize your idle gear today.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/explore" className="group bg-accent hover:bg-blue-700 text-white font-medium px-8 py-3.5 rounded-gear transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:-translate-y-0.5">
                Explore Gears <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/items/add" className="border border-gray-600 hover:bg-gray-800 text-white font-medium px-8 py-3.5 rounded-gear transition-all duration-300 hover:-translate-y-0.5">
                Rent Your Gear
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION (Hover Scale & Shadow Effects) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-primary tracking-tight">Browse Popular Categories</h2>
          <p className="text-gray-500 mt-2">Choose from a wide variety of high-end professional equipment</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-gear border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer text-center group">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/10 transition-colors">
                {cat.icon}
              </div>
              <h3 className="font-semibold text-primary text-lg">{cat.name}</h3>
              <p className="text-gray-400 text-sm mt-1">{cat.count}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. WHY CHOOSE US (FEATURES) SECTION */}
      <section className="bg-white py-16 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-primary tracking-tight">Our Core Ecosystem</h2>
            <p className="text-gray-500 mt-2">Ensuring premium security, fast speed, and absolute trust</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-4 group">
              <div className="bg-blue-100 p-4 rounded-full text-accent mb-4 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300"><ShieldCheck size={32} /></div>
              <h3 className="text-xl font-bold mb-2">100% Secured Contracts</h3>
              <p className="text-gray-500 text-sm">Every single client profile is rigorously NID/Passport verified. Real-time protection rules applied.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 group">
              <div className="bg-blue-100 p-4 rounded-full text-accent mb-4 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300"><Clock size={32} /></div>
              <h3 className="text-xl font-bold mb-2">Instant Payouts</h3>
              <p className="text-gray-500 text-sm">Book with ease within seconds. Payment releases right into your digital wallet upon successful gadget handovers.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 group">
              <div className="bg-blue-100 p-4 rounded-full text-accent mb-4 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300"><ThumbsUp size={32} /></div>
              <h3 className="text-xl font-bold mb-2">Affordable Logistics</h3>
              <p className="text-gray-500 text-sm">Get access to extremely expensive setups on a highly optimized daily custom flat pricing plan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS (4 Cards Per Row Rule + Image Zoom Effect) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-primary tracking-tight">Featured Gear Up For Rent</h2>
            <p className="text-gray-500 mt-2">Explore outstanding high-demand products handpicked for you</p>
          </div>
          <Link href="/explore" className="text-accent hover:underline font-medium flex items-center gap-1 hidden sm:flex group">
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
                <h3 className="font-bold text-primary text-base line-clamp-1 group-hover:text-accent transition-colors">{prod.title}</h3>
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

      {/* 5. PLATFORM STATISTICS */}
      <section className="bg-primary text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2 hover:scale-105 transition-transform duration-300">
              <h3 className="text-4xl md:text-5xl font-black text-accent">10,000+</h3>
              <p className="text-gray-300 text-sm font-medium">Active Users</p>
            </div>
            <div className="space-y-2 hover:scale-105 transition-transform duration-300">
              <h3 className="text-4xl md:text-5xl font-black text-accent">500+</h3>
              <p className="text-gray-300 text-sm font-medium">Verified Gadgets</p>
            </div>
            <div className="space-y-2 hover:scale-105 transition-transform duration-300">
              <h3 className="text-4xl md:text-5xl font-black text-accent">12,000+</h3>
              <p className="text-gray-300 text-sm font-medium">Successful Rentals</p>
            </div>
            <div className="space-y-2 hover:scale-105 transition-transform duration-300">
              <h3 className="text-4xl md:text-5xl font-black text-accent">99%</h3>
              <p className="text-gray-300 text-sm font-medium">Positive Reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION (Interactive-ready layout) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary tracking-tight">Frequently Asked Questions</h2>
          <p className="text-gray-500 mt-2">Quick answers to the most common questions about our system</p>
        </div>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white p-6 rounded-gear border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="font-bold text-primary text-lg flex gap-2 items-center">
                <HelpCircle className="text-accent shrink-0" size={20} />
                {faq.q}
              </h3>
              <p className="text-gray-500 text-sm mt-2 pl-7 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. NEWSLETTER / CALL TO ACTION (CTA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-accent to-blue-800 text-white rounded-gear p-8 md:p-12 text-center space-y-6 shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Why Let Your Idle Gadgets Gather Dust?</h2>
          <p className="text-blue-100 max-w-xl mx-auto opacity-90">
            List your camera, drone, or spare console on GearShare today and easily make passive recurring income every month.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto pt-2">
            <input
              type="email"
              placeholder="Enter your professional email..."
              className="bg-white text-primary px-4 py-3 rounded-gear outline-none w-full text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <button className="bg-primary hover:bg-gray-900 text-white font-semibold px-6 py-3 rounded-gear text-sm transition-all shadow-md active:scale-95">
              Subscribe Now
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}