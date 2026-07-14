import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-primary text-gray-400 border-t border-gray-800 pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Col 1: Brand Info */}
                <div className="space-y-4">
                    <Link href="/" className="text-xl font-bold text-white tracking-wider">
                        <span className="text-accent">Gear</span>Share
                    </Link>
                    <p className="text-sm leading-relaxed">
                        Monetize your unused tech gadgets by renting them out, or rent the premium gear you need at an affordable price.
                    </p>
                </div>

                {/* Col 2: Quick Links */}
                <div>
                    <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/explore" className="hover:text-accent transition-colors">Explore All Gears</Link></li>
                        <li><Link href="/about" className="hover:text-accent transition-colors">About Our Platform</Link></li>
                        <li><Link href="/blog" className="hover:text-accent transition-colors">Latest Blogs</Link></li>
                        <li><Link href="/support" className="hover:text-accent transition-colors">Help & Support</Link></li>
                    </ul>
                </div>

                {/* Col 3: Legal & Terms */}
                <div>
                    <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Legal Policies</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:text-accent transition-colors">Terms & Conditions</Link></li>
                        <li><Link href="/refund" className="hover:text-accent transition-colors">Refund Policy</Link></li>
                    </ul>
                </div>

                {/* Col 4: Contact & Socials */}
                <div className="space-y-4">
                    <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Contact Us</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2"><MapPin size={16} className="text-accent" /> Banani, Dhaka, Bangladesh</li>
                        <li className="flex items-center gap-2"><Phone size={16} className="text-accent" /> +880 1234-567890</li>
                        <li className="flex items-center gap-2"><Mail size={16} className="text-accent" /> support@gearshare.com</li>
                    </ul>

                    {/* Social Icons using Inline SVGs */}
                    <div className="flex space-x-4 pt-2">
                        {/* Facebook */}
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.9.2-1.2 1-1.2h2V2h-3c-2.5 0-4 1.2-4 3.8V8z" />
                            </svg>
                        </a>
                        {/* Twitter/X */}
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        {/* Instagram */}
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                            <svg className="w-5 h-5 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>
                        {/* Linkedin */}
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.751 1.75-1.751 1.75.78 1.75 1.751-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>
                    </div>
                </div>

            </div>

            {/* Bottom Copyright Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-gray-800 text-center text-xs">
                <p>&copy; {currentYear} GearShare Platform. All rights reserved.</p>
            </div>
        </footer>
    );
}