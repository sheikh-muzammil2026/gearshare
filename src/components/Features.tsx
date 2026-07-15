import { ShieldCheck, Clock, ThumbsUp } from 'lucide-react';

export default function Features() {
  return (
    <section className="bg-white py-12 md:py-16 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">Our Core Ecosystem</h2>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">Ensuring premium security, fast speed, and absolute trust</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-4 group">
            <div className="bg-blue-100 p-4 rounded-full text-accent mb-4 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300"><ShieldCheck size={32} /></div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">100% Secured Contracts</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Every single client profile is rigorously NID/Passport verified. Real-time protection rules applied.</p>
          </div>
          <div className="flex flex-col items-center text-center p-4 group">
            <div className="bg-blue-100 p-4 rounded-full text-accent mb-4 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300"><Clock size={32} /></div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">Instant Payouts</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Book with ease within seconds. Payment releases right into your digital wallet upon successful gadget handovers.</p>
          </div>
          <div className="flex flex-col items-center text-center p-4 group">
            <div className="bg-blue-100 p-4 rounded-full text-accent mb-4 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300"><ThumbsUp size={32} /></div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">Affordable Logistics</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Get access to extremely expensive setups on a highly optimized daily custom flat pricing plan.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
