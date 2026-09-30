import { ArrowUpRight, BadgeCheck, Camera, Check, FileText, MessageCircle, Package, Wallet } from 'lucide-react';
import { motion } from 'motion/react';
import { SERVICES } from '../data';
import AccordionGallery from './ui/AccordionGallery';
import { Reveal } from './ui/Reveal';

const GALLERY_ITEMS = [
  {
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
    label: 'Jastip & Titip Beli',
    alt: 'Jastip makanan viral UrusinAja',
  },
  {
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80',
    label: 'Antar-Jemput',
    alt: 'Antar-jemput motor UrusinAja',
  },
  {
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80',
    label: 'Antre & Urus Dokumen',
    alt: 'Antre dan urus dokumen UrusinAja',
  },
  {
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=900&q=80',
    label: 'Kurir Instant',
    alt: 'Kurir instan dalam kota UrusinAja',
  },
  {
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=900&q=80',
    label: 'Paket Langganan',
    alt: 'Paket langganan titip belanja UrusinAja',
  },
];

const LANGGANAN = {
  icon: Package,
  desc: 'Antar-jemput rutin anak & karyawan. Driver tetap yang sama, lebih hemat 15–25% tiap bulan.',
  points: ['Driver tetap yang sama', 'Paket mingguan & bulanan', 'Laporan harian ke orang tua'],
  priceNote: 'Hemat 15–25% / bulan',
};

const DETAILS = [
  ...SERVICES.map((s) => ({ icon: s.icon, desc: s.desc, points: s.points, priceNote: s.priceNote })),
  LANGGANAN,
];

export function Services() {
  return (
    <section className="section" id="layanan" style={{ paddingBottom: 10 }}>
      <div className="container">
        <Reveal className="section-head">
          <h2>Satu chat untuk semua urusan repotmu</h2>
          <p>Harga transparan di awal, update foto tiap tahap, bisa bayar tunai / transfer / QRIS.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <AccordionGallery
          items={GALLERY_ITEMS}
          defaultIndex={0}
          expandRatio={0.52}
          trigger="hover"
          height={460}
          accentColor="#0ba183"
          renderExpanded={(_item, i) => {
            const d = DETAILS[i];
            if (!d) return null;
            const Icon = d.icon;
            return (
              <span className="ag-svc">
                <span className="ag-svc__icon"><Icon size={18} /></span>
                <span className="ag-svc__desc">{d.desc}</span>
                <span className="ag-svc__points">
                  {d.points.map((p) => (
                    <span key={p} className="ag-svc__point"><Check size={13} strokeWidth={3} /> {p}</span>
                  ))}
                </span>
                <span className="ag-svc__foot">
                  <span className="ag-svc__price"><Wallet size={14} /> {d.priceNote}</span>
                  <a className="ag-svc__cta" href="#order" onClick={(e) => e.stopPropagation()}>Order <ArrowUpRight size={13} /></a>
                </span>
              </span>
            );
          }}
          />
        </Reveal>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    { icon: MessageCircle, color: '#0ba183', bg: '#DCF5EC', t: 'Chat / isi form', d: 'Pilih layanan, tulis lokasi jemput & tujuan. Admin membalas kurang dari 5 menit.' },
    { icon: BadgeCheck, color: '#b45309', bg: '#FFF3CD', t: 'Dapat driver + harga fix', d: 'Harga dikunci di awal. Tanpa biaya tersembunyi, struk belanja asli difoto.' },
    { icon: Camera, color: '#c2410c', bg: '#FFE8D9', t: 'Diproses + update foto', d: 'Pantau lewat WA: driver OTW, sampai lokasi, plus foto bukti tiap tahap.' },
    { icon: Wallet, color: '#4f46e5', bg: '#E3E9FF', t: 'Selesai & bayar', d: 'Bayar tunai, transfer, atau QRIS. Kasih rating dan dapatkan voucher order berikutnya.' },
  ];
  return (
    <section className="section" id="cara" style={{ paddingTop: 30 }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
          <Reveal className="section-head" style={{ margin: 0 }}>
            <h2>Semudah pesan ojek online</h2>
            <p>Nggak perlu install aplikasi. Cukup WhatsApp.</p>
          </Reveal>
          <Reveal delay={0.1} y={14}>
            <a
              className="btn btn-ghost"
              href="https://drive.google.com/drive/folders/12TdizRftHGC3chblg9ikCoufhwUkeSuw"
              target="_blank"
              rel="noreferrer"
            >
              <FileText size={17} /> Detail Jasa <ArrowUpRight size={15} />
            </a>
          </Reveal>
        </div>
        <div className="timeline">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.t}
                className="tl-item"
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <div className="tl-rail">
                  <span className="tl-node" style={{ background: s.bg, color: s.color, borderColor: s.bg }}>
                    <Icon size={21} />
                  </span>
                  {i < steps.length - 1 && <span className="tl-line" aria-hidden />}
                </div>
                <div className="tl-card">
                  <span className="tl-num">Langkah {i + 1}</span>
                  <h4>{s.t}</h4>
                  <p>{s.d}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
