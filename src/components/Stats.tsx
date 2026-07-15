export default function Stats() {
  return (
    <section className="bg-primary text-white py-12 md:py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2 hover:scale-105 transition-transform duration-300">
            <h3 className="text-3xl md:text-5xl font-black text-accent">10,000+</h3>
            <p className="text-gray-300 text-xs sm:text-sm font-medium">Active Users</p>
          </div>
          <div className="space-y-2 hover:scale-105 transition-transform duration-300">
            <h3 className="text-3xl md:text-5xl font-black text-accent">500+</h3>
            <p className="text-gray-300 text-xs sm:text-sm font-medium">Verified Gadgets</p>
          </div>
          <div className="space-y-2 hover:scale-105 transition-transform duration-300">
            <h3 className="text-3xl md:text-5xl font-black text-accent">12,000+</h3>
            <p className="text-gray-300 text-xs sm:text-sm font-medium">Successful Rentals</p>
          </div>
          <div className="space-y-2 hover:scale-105 transition-transform duration-300">
            <h3 className="text-3xl md:text-5xl font-black text-accent">99%</h3>
            <p className="text-gray-300 text-xs sm:text-sm font-medium">Positive Reviews</p>
          </div>
        </div>
      </div>
    </section>
  );
}
