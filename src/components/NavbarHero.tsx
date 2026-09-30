import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Star } from 'lucide-react';
import { buildWaMessage, waLink } from '../data';
import { LIMITS, sanitizeText } from '../lib/validation';
import BlurText from './ui/BlurText';
import DriftWall, { type DriftWallItem } from './ui/DriftWall';

const WALL_ITEMS: DriftWallItem[] = [
  {
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    title: 'Jastip kuliner',
  },
  {
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=600&q=80',
    title: 'Antar-jemput dalam kota',
  },
  {
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
    title: 'Titip makanan viral',
  },
  {
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=600&q=80',
    title: 'Kurir same day',
  },
  {
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=600&q=80',
    title: 'Titip belanja pasar',
  },
  {
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80',
    title: 'Area layanan',
  },
  {
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    title: 'Jastip burger viral',
  },
  {
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
    title: 'Titip kopi',
  },
];

function useIsMobile(query = '(max-width: 640px)') {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);
  return isMobile;
}

export function Hero() {
  const [need, setNeed] = useState('');
  const isMobile = useIsMobile();
  const wa = waLink(buildWaMessage({ detail: sanitizeText(need, LIMITS.heroNeed) }));

  return (
    <header id="top" className="relative overflow-hidden">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 pt-32 pb-14 lg:grid-cols-[1.05fr_0.95fr] max-md:pt-28">
        {/* Kolom kiri: konten rata kiri */}
        <div className="text-left">
          <BlurText
            text="Titip, antar & antre. Beres tanpa ribet."
            delay={120}
            animateBy="words"
            direction="top"
            className="justify-start text-left font-display text-[clamp(38px,5vw,64px)] leading-[1.08] font-bold tracking-[-0.02em] text-balance"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 max-w-xl text-lg leading-normal tracking-[-0.025em] text-pretty text-muted-foreground max-md:text-base"
          >
            Jastip makanan viral, antar-jemput anak, antre Samsat, sampai kurir
            instan. Cukup chat, kami yang jalan.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 w-full max-w-xl"
          >
            <form
              className="flex w-full items-center gap-3 max-sm:flex-col max-sm:items-stretch max-sm:gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                window.open(wa, '_blank', 'noopener,noreferrer');
              }}
            >
              <label htmlFor="hero-need" className="sr-only">
                Tulis kebutuhanmu
              </label>
              <input
                id="hero-need"
                value={need}
                maxLength={LIMITS.heroNeed}
                onChange={(e) => setNeed(e.target.value)}
                placeholder="Tulis kebutuhanmu… mis. titip seblak 2 porsi"
                className="h-12 min-w-0 flex-1 rounded-full border border-border bg-white px-5 text-base text-foreground transition-colors outline-none placeholder:text-muted-foreground hover:border-foreground/20 focus:border-foreground/30 max-sm:h-20 max-sm:rounded-[20px] max-sm:px-7 max-sm:text-xl max-sm:font-medium max-sm:shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
              />
              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-transparent bg-foreground px-6 py-3 text-base leading-5 font-medium whitespace-nowrap text-background transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_5px_12px_#00000014] active:translate-y-0 max-sm:min-h-20 max-sm:w-full max-sm:rounded-[20px] max-sm:text-xl max-sm:font-semibold"
              >
                Mulai order
                <ArrowUpRight size={20} aria-hidden />
              </button>
            </form>
            <p className="mt-3 text-[11px] leading-normal text-muted-foreground max-sm:mt-4 max-sm:text-[13px]">
              Tanpa aplikasi • Tanpa daftar •{' '}
              <a href="#ongkir" className="underline underline-offset-4 hover:text-foreground">
                Cek ongkir dulu
              </a>
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground"
          >
            <span className="inline-flex items-center gap-1">
              <Star size={12} fill="currentColor" /> 4.9/5 dari 2.100+ ulasan
            </span>
            <span aria-hidden>•</span>
            <span>12.400+ order selesai</span>
            <span aria-hidden>•</span>
            <span>±30 menit rata-rata sampai</span>
          </motion.p>
        </div>

        {/* Kolom kanan: DriftWall */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative h-[560px] w-full max-lg:h-[460px] max-sm:h-[400px]"
        >
          <DriftWall
            items={WALL_ITEMS}
            columns={isMobile ? 3 : 4}
            tileWidth={isMobile ? 150 : 190}
            tileHeight={isMobile ? 100 : 124}
            gap={16}
            tilt={14}
            turn={-12}
            speed={36}
            variance={0.45}
            parallax={0.6}
            pauseOnHover
            lift={56}
            fade={0.55}
            dim={0.85}
            overlayColor="#fffaf3"
            aria-label="Galeri layanan UrusinAja: jastip, antar-jemput, dan kurir"
          />
        </motion.div>
      </div>
    </header>
  );
}
