import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import Features from '@/components/Features';
import FeaturedProducts from '@/components/FeaturedProducts';
import Stats from '@/components/Stats';
import FAQ from '@/components/FAQ';
import Newsletter from '@/components/Newsletter';

export default function Home() {
  return (
    <div className="space-y-12 md:space-y-20 pb-20 bg-neutralBg">
      <Hero />
      <Categories />
      <Features />
      <FeaturedProducts />
      <Stats />
      <FAQ />
      <Newsletter />
    </div>
  );
}
