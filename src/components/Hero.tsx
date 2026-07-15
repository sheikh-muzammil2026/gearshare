import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[60vh] md:h-[65vh] flex items-center bg-primary text-white overflow-hidden pt-20 pb-12 md:py-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.15),transparent)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="max-w-3xl space-y-4 md:space-y-6 animate-[fadeIn_1s_ease-out]">
          <div className="flex justify-start">
            <span className="inline-flex items-center bg-accent/20 text-accent font-semibold px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs uppercase tracking-wider animate-[pulse_3s_infinite] whitespace-normal sm:whitespace-nowrap">
              Premium Tech Gadget Rental Platform
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            Access Premium Tech, <br />
            <span className="text-accent">Rent & Earn Smartly!</span>
          </h1>
          <p className="text-gray-300 text-sm sm:text-base md:text-xl max-w-2xl opacity-90 transition-opacity">
            From professional cameras to gaming consoles—get what you need, exactly when you need it. Monetize your idle gear today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/explore" className="group bg-accent hover:bg-blue-700 text-white font-medium px-8 py-3.5 rounded-gear transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:-translate-y-0.5 w-full sm:w-auto text-sm sm:text-base">
              Explore Gears <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/items/add" className="border border-gray-600 hover:bg-gray-800 text-white font-medium px-8 py-3.5 rounded-gear transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center w-full sm:w-auto text-sm sm:text-base">
              Rent Your Gear
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
