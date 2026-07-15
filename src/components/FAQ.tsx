import { HelpCircle } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    { q: 'How do I rent a gadget?', a: 'Simply create an account, browse through our extensive collection, select your desired dates, and submit a rental request.' },
    { q: 'What about gadget safety and security?', a: 'We verify all users using official NID/Passport checks and use premium secure escrow contracts for every single transaction.' },
    { q: 'When do I get paid for renting out my gear?', a: 'Your earnings are instantly credited to your verified wallet as soon as the renter successfully confirms the item handover.' },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">Frequently Asked Questions</h2>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">Quick answers to the most common questions about our system</p>
      </div>
      <div className="space-y-4 sm:space-y-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white p-5 sm:p-6 rounded-gear border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="font-bold text-primary text-base sm:text-lg flex gap-2 items-start sm:items-center">
              <HelpCircle className="text-accent shrink-0 mt-0.5 sm:mt-0" size={20} />
              {faq.q}
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm mt-2 pl-7 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
