import { useEffect } from 'react';
import { Hero } from './components/NavbarHero';
import { Header1 } from '@/components/ui/header';
import { Services, HowItWorks } from './components/Services';
import { OngkirCalculator } from './components/CalculatorOrder';
import { Testimonials, Faq, Footer } from './components/Social';

/** URL bersih tanpa hash: intercept klik anchor internal, scroll halus, lalu hapus hash dari address bar. */
function useCleanAnchors() {
  useEffect(() => {
    const cleanUrl = () => {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    };

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest?.('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      cleanUrl();
    };

    // Jika dibuka dengan hash (mis. link lama), scroll lalu bersihkan.
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      window.setTimeout(() => {
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        cleanUrl();
      }, 100);
    }

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
}

function App() {
  useCleanAnchors();
  return (
    <>
      <Header1 />
      <main className="pt-20">
        <Hero />
        <Services />
        <HowItWorks />
        <OngkirCalculator />
        <Testimonials />
        <Faq />
        <Footer />
      </main>
    </>
  );
}

export default App;
