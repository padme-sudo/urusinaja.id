import { AnimatedRoadmap, type Milestone } from '@/components/ui/animated-roadmap';
import { Button } from '@/components/ui/button';
import { WHATSAPP_NUMBER, BRAND, TAGLINE } from '@/data';

// Journey order UrusinAja: chat -> driver OTW -> diproses -> sampai
const milestonesData: Milestone[] = [
  {
    id: 1,
    name: 'Chat & fix harga',
    status: 'complete',
    position: { top: '70%', left: '5%' },
  },
  {
    id: 2,
    name: 'Driver OTW',
    status: 'complete',
    position: { top: '15%', left: '20%' },
  },
  {
    id: 3,
    name: 'Diproses + foto',
    status: 'in-progress',
    position: { top: '45%', left: '52%' },
  },
  {
    id: 4,
    name: 'Sampai',
    status: 'pending',
    position: { top: '10%', right: '6%' },
  },
];

// Unsplash stock: peta kota dengan pin (stabil, bukan blob temp)
const MAP_IMAGE =
  'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=900&q=80';

function HeroSection5() {
  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Halo ${BRAND}! Saya mau order. ${TAGLINE}`)}`;

  return (
    <div className="w-full bg-background text-foreground">
      <div className="container mx-auto flex flex-col items-center px-4 py-10 text-center md:py-14">
        <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
          Pantau orderanmu,{' '}
          <span className="bg-primary/20 p-2 rounded-md">jelas</span> tiap
          tahap
        </h2>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
          Chat, dapat driver + harga fix, update foto realtime, sampai depan
          pintu. Tanpa aplikasi tambahan.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={wa} target="_blank" rel="noreferrer">
            <Button size="lg">Order sekarang — gratis konsultasi</Button>
          </a>
          <a href="#ongkir">
            <Button size="lg" variant="outline">
              Cek ongkir dulu
            </Button>
          </a>
        </div>
      </div>

      <AnimatedRoadmap
        milestones={milestonesData}
        mapImageSrc={MAP_IMAGE}
        aria-label="Animasi perjalanan order UrusinAja dari chat sampai tiba."
      />
    </div>
  );
}

function HeroSectionDemo() {
  return (
    <div className="block">
      <HeroSection5 />
    </div>
  );
}

export { HeroSection5, HeroSectionDemo };
export default HeroSectionDemo;
