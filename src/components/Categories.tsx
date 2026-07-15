import { Camera, Tv, Laptop, Gamepad } from 'lucide-react';

export default function Categories() {
  const categories = [
    { name: 'Professional Camera', count: '12 Gadgets Available', icon: <Camera className="w-8 h-8 text-accent group-hover:rotate-12 transition-transform duration-300" /> },
    { name: 'Drones & Action Cams', count: '8 Gadgets Available', icon: <Laptop className="w-8 h-8 text-accent group-hover:scale-110 transition-transform duration-300" /> },
    { name: 'Sound & Audio Gear', count: '15 Gadgets Available', icon: <Tv className="w-8 h-8 text-accent group-hover:-translate-y-1 transition-transform duration-300" /> },
    { name: 'Gaming Consoles', count: '10 Gadgets Available', icon: <Gamepad className="w-8 h-8 text-accent group-hover:skew-x-6 transition-transform duration-300" /> },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">Browse Popular Categories</h2>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">Choose from a wide variety of high-end professional equipment</p>
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
  );
}
