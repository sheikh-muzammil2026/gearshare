export default function Newsletter() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-r from-accent to-blue-800 text-white rounded-gear p-6 md:p-12 text-center space-y-6 shadow-xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">Why Let Your Idle Gadgets Gather Dust?</h2>
        <p className="text-blue-100 text-sm md:text-base max-w-xl mx-auto opacity-90">
          List your camera, drone, or spare console on GearShare today and easily make passive recurring income every month.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto pt-2">
          <input
            type="email"
            placeholder="Enter your professional email..."
            className="bg-white text-primary px-4 py-3 rounded-gear outline-none w-full text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all"
          />
          <button className="bg-primary hover:bg-gray-900 text-white font-semibold px-6 py-3 rounded-gear text-sm transition-all shadow-md active:scale-95 w-full sm:w-auto shrink-0">
            Subscribe Now
          </button>
        </div>
      </div>
    </section>
  );
}
