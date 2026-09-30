import { CarFront, ClipboardList, Clock, Heart, MapPin, ShoppingBag, Zap } from 'lucide-react';
import { InstagramIcon, TikTokIcon, WhatsappIcon } from './icons';
import { TESTIMONIALS, WHATSAPP_NUMBER } from '../data';
import logo from '../assets/logo.png';
import { Reveal } from './ui/Reveal';
import FrequentlyAskedQuestions from './ui/frequently-asked-questions-with-accordion';
import { TestimonialsColumn } from './ui/testimonials-columns-1';

export { FrequentlyAskedQuestions as FaqSection };

export function Faq() {
  return <FrequentlyAskedQuestions />;
}

const AVATARS = [
  'https://api.dicebear.com/9.x/adventurer/svg?seed=Nadia&backgroundColor=0ba183',
  'https://api.dicebear.com/9.x/adventurer/svg?seed=Budi&backgroundColor=ff6b2c',
  'https://api.dicebear.com/9.x/adventurer/svg?seed=Sinta&backgroundColor=b77900',
  'https://api.dicebear.com/9.x/adventurer/svg?seed=Rizky&backgroundColor=4f46e5',
  'https://api.dicebear.com/9.x/adventurer/svg?seed=Ayu&backgroundColor=e11d48',
  'https://api.dicebear.com/9.x/adventurer/svg?seed=Dimas&backgroundColor=07745e',
];

const COLUMNS = [
  { items: [0, 1], duration: 15, className: undefined as string | undefined },
  { items: [2, 3], duration: 19, className: 'hidden md:block' },
  { items: [4, 5], duration: 17, className: 'hidden lg:block' },
];

export function Testimonials() {
  return (
    <section id="testimoni" className="bg-background my-10 relative" style={{ paddingTop: 10 }}>
      <div className="container">
        <Reveal className="section-head" style={{ marginBottom: 8 }}>
          <h2>Kata mereka yang sudah #UrusinAjaKeKami</h2>
          <p>Rating 4.9/5 dari 2.100+ ulasan Google & WhatsApp.</p>
        </Reveal>
        <div className="flex justify-center gap-6 mt-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          {COLUMNS.map((col, ci) => (
            <TestimonialsColumn
              key={ci}
              className={col.className}
              duration={col.duration}
              testimonials={col.items.map((ti) => ({
                text: `“${TESTIMONIALS[ti].text}”`,
                image: AVATARS[ti],
                name: TESTIMONIALS[ti].name,
                role: TESTIMONIALS[ti].role,
              }))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <Reveal y={18}>
          <div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
              <img src={logo} alt="Logo UrusinAja.id" style={{ height: 72, width: 'auto' }} draggable={false} />
            </div>
            <p style={{ fontSize: 14, margin: 0, maxWidth: 300 }}>Jasa titip, antar-jemput, antre & kurir instan. #UrusinAjaKeKami, beres tanpa ribet.</p>
            <p style={{ fontSize: 13, marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Clock size={14} /> 07.00–21.00 (lembur 24/7 untuk darurat)</span><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><MapPin size={14} /> Magelang, Jawa Tengah, Indonesia</span></p>
          </div>
          </Reveal>
          <Reveal y={18} delay={0.08}>
          <div>
            <h4>Layanan</h4>
            <a href="#layanan" style={{ display: 'flex', alignItems: 'center', gap: 7 }}><ShoppingBag size={14} /> Jastip & Titip Beli</a>
            <a href="#layanan" style={{ display: 'flex', alignItems: 'center', gap: 7 }}><CarFront size={14} /> Antar-Jemput</a>
            <a href="#layanan" style={{ display: 'flex', alignItems: 'center', gap: 7 }}><ClipboardList size={14} /> Antre Dokumen</a>
            <a href="#layanan" style={{ display: 'flex', alignItems: 'center', gap: 7 }}><Zap size={14} /> Kurir Instant</a>
          </div>
          </Reveal>
          <Reveal y={18} delay={0.16}>
          <div>
            <h4>Navigasi</h4>
            <a href="#cara">Cara Order</a>
            <a href="#ongkir">Cek Ongkir</a>
            <a href="#testimoni">Testimoni</a>
            <a href="#faq">FAQ</a>
          </div>
          </Reveal>
          <Reveal y={18} delay={0.24}>
          <div>
            <h4>Hubungi kami</h4>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 7 }}><WhatsappIcon size={14} /> WhatsApp Admin</a>
            <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 7 }}><InstagramIcon size={14} /> Instagram @urusinaja.id</a>
            <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 7 }}><TikTokIcon size={14} /> TikTok @urusinaja.id</a>
          </div>
          </Reveal>
        </div>
        <div className="footer-bottom">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>© 2026 UrusinAja.id — #UrusinAjaKeKami. Dibuat dengan <Heart size={13} fill="currentColor" /> di Indonesia.</span>
        </div>
      </div>
    </footer>
  );
}
