import type { LucideIcon } from 'lucide-react';
import { CarFront, ClipboardList, ShoppingBag, Zap } from 'lucide-react';
import { normalizeVoucherCode } from './lib/validation';

export const WHATSAPP_NUMBER = '6287777746006'; // Admin UrusinAja.id Magelang
export const BRAND = 'UrusinAja.id';
export const TAGLINE = '#UrusinAjaKeKami';

export interface WaForm {
  nama?: string;
  lokasi?: string;
  layanan?: string;
  detail?: string;
}

/** Template pesan WA UrusinAja.id Magelang. Field kosong = pelanggan isi sendiri. */
export function buildWaMessage(form: WaForm = {}): string {
  const { nama = '', lokasi = '', layanan = '', detail = '' } = form;
  return [
    'Halo! Terima kasih telah menghubungi Urusinaja.id Magelang. 🙏✨',
    '',
    'Gak ada waktu atau repot urus ini-itu? Tenang, #UrusinAjaKeKami. Kami siap menjadi asisten pribadi andalan Anda untuk wilayah Magelang.',
    '',
    'Agar kami dapat memberikan estimasi biaya dan jadwal secepatnya, silakan isi formulir singkat ini ya:',
    '',
    `🪪 Nama: ${nama}`,
    `📍 Lokasi: ${lokasi}`,
    `📝 Layanan: ${layanan}`,
    `📆 Detail & Tanggal: ${detail}`,
    '',
    'Pesan Anda telah kami terima. Admin kami akan segera membalas dalam beberapa saat. Terima kasih! 😊🚀',
  ].join('\n');
}

/** Link wa.me dengan pesan template (default: formulir kosong). */
export function waLink(message: string = buildWaMessage()): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export type ServiceId = 'jastip' | 'antarjemput' | 'antre' | 'kurir';

export interface Service {
  id: ServiceId;
  icon: LucideIcon;
  /** Warna ikon (tetap terbaca di light & dark mode). */
  iconColor: string;
  title: string;
  desc: string;
  points: string[];
  priceNote: string;
  bubble: string;
}

export const SERVICES: Service[] = [
  {
    id: 'jastip',
    icon: ShoppingBag,
    iconColor: '#07745e',
    title: 'Jastip & Titip Beli',
    desc: 'Titip makanan viral, obat, belanja pasar, oleh-oleh. Foto struk asli.',
    points: ['Makanan & minuman', 'Obat & kebutuhan mendesak', 'Belanja pasar / minimarket'],
    priceNote: 'Mulai Rp15rb + Rp5rb/km',
    bubble: '#DCF5EC',
  },
  {
    id: 'antarjemput',
    icon: CarFront,
    iconColor: '#c2410c',
    title: 'Antar-Jemput',
    desc: 'Antar anak sekolah, karyawan, bandara, atau kondangan. Driver ramah.',
    points: ['Anak sekolah & les', 'Karyawan & bandara', 'Motor / mobil tersedia'],
    priceNote: 'Mulai Rp20rb + Rp6rb/km',
    bubble: '#FFE8D9',
  },
  {
    id: 'antre',
    icon: ClipboardList,
    iconColor: '#92400e',
    title: 'Antre & Urus Dokumen',
    desc: 'Antre Samsat, klinik, bank, Disdukcapil. Update foto tiap tahap.',
    points: ['Samsat, bank, klinik', 'Fotokopi & legalisir', 'Laporan progres realtime'],
    priceNote: 'Mulai Rp50rb / tugas + Rp7,5rb/km',
    bubble: '#FFF3CD',
  },
  {
    id: 'kurir',
    icon: Zap,
    iconColor: '#4f46e5',
    title: 'Kurir Instant / SameDay',
    desc: 'Kirim dokumen, paket, kue, catering dalam kota. Cepat & aman.',
    points: ['Instant < 3 jam', 'SameDay hemat', 'Asuransi barang pecah belah'],
    priceNote: 'Mulai Rp12rb + Rp4rb/km',
    bubble: '#E3E9FF',
  },
];

export interface FareConfig {
  base: number;
  perKm: number;
  label: string;
}

export const FARE: Record<ServiceId, FareConfig> = {
  jastip: { base: 15000, perKm: 5000, label: 'Jastip & Titip Beli' },
  antarjemput: { base: 20000, perKm: 6000, label: 'Antar-Jemput' },
  antre: { base: 50000, perKm: 7500, label: 'Antre & Urus Dokumen' },
  kurir: { base: 12000, perKm: 4000, label: 'Kurir Instant / SameDay' },
};

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  color: string;
  initial: string;
}

export const TESTIMONIALS: Testimonial[] = [
  { name: 'Nadia Putri', role: 'Jastip seblak viral', text: 'Antre 1,5 jam dibela-belain, masih anget sampai kos! Update foto terus, jujur banget struknya.', color: '#0BA183', initial: 'N' },
  { name: 'Budi Santoso', role: 'Antar anak sekolah', text: 'Driver-nya sabar & tepat waktu tiap pagi. Anak saya sampai berani bilang “Om UrusinAja baik”.', color: '#FF6B2C', initial: 'B' },
  { name: 'Sinta Maharani', role: 'Urus Samsat', text: 'Bayar pajak tanpa cuti! Pagi titip STNK, sore udah beres + difotoin. Worth it banget.', color: '#B77900', initial: 'S' },
  { name: 'Rizky Pratama', role: 'Kurir dokumen tender', text: 'Dokumen tender jam 2 siang harus sampai jam 4. Jam 3 udah sampai. Nyawa perusahaan ketolong.', color: '#4F46E5', initial: 'R' },
  { name: 'Mama Ayu', role: 'Titip obat tengah malam', text: 'Jam 11 malam anak demam, obat kosong. 35 menit sampai. Terharu, makasih banyak!', color: '#E11D48', initial: 'A' },
  { name: 'Dimas & Tiara', role: 'Antar-jemput bandara', text: 'Flight delay jam 1 pagi tetap dijemput tanpa drama. Mobil bersih, driver sopan.', color: '#07745E', initial: 'D' },
];

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  { q: 'Area mana saja yang dilayani?', a: 'Saat ini fokus dalam kota + radius 25km (cek kalkulator ongkir). Untuk luar kota / antar kota bisa konsultasi dulu via WhatsApp, biasanya kami bantu carikan opsi SameDay / travel.' },
  { q: 'Bagaimana sistem pembayarannya?', a: 'Bisa tunai, transfer, atau QRIS. Untuk titip beli, dana talangan maksimal Rp500rb (lebih dari itu wajib DP dulu). Struk belanja selalu difoto.' },
  { q: 'Apakah barang aman? Bagaimana kalau hilang/rusak?', a: 'Semua order tercatat dengan foto serah-terima. Untuk kurir barang pecah belah / elektronik, tersedia opsi asuransi + packing tambahan. Jika kelalaian driver, kami ganti sesuai kesepakatan.' },
  { q: 'Berapa lama respon admin?', a: 'Jam operasional 07.00–21.00, rata-rata dibalas < 5 menit. Di atas jam 21.00 tetap bisa order untuk kebutuhan mendesak (ada biaya malam Rp10rb).' },
  { q: 'Bisa langganan antar-jemput anak / karyawan?', a: 'Bisa banget! Ada paket mingguan & bulanan lebih hemat 15–25%. Driver tetap yang sama biar anak kenal & nyaman. Chat admin untuk pricelist langganan.' },
  { q: 'Bagaimana cara order?', a: 'Isi form order di bawah, klik “Kirim via WhatsApp”, admin konfirmasi driver + total fix dalam 5 menit. Atau langsung chat dengan format: Nama - Layanan - Lokasi jemput - Tujuan.' },
];

export function formatIDR(n: number): string {
  return 'Rp' + Math.round(n).toLocaleString('id-ID');
}

export interface Voucher {
  code: string;
  type: 'percent' | 'flat';
  /** Persen (10 = 10%) atau nominal rupiah. */
  value: number;
  /** Minimal subtotal agar voucher berlaku. */
  minOrder: number;
  /** Batas maksimal potongan (khusus persen). */
  maxDiscount?: number;
  /** Deskripsi singkat untuk ditampilkan. */
  desc: string;
  /** Batas berlaku ISO (YYYY-MM-DD). */
  expiry: string;
}

export const VOUCHERS: Voucher[] = [
  {
    code: 'URUSIN10',
    type: 'percent',
    value: 10,
    minOrder: 20000,
    maxDiscount: 10000,
    desc: 'Diskon 10% s/d Rp10rb (min. Rp20rb)',
    expiry: '2026-12-31',
  },
  {
    code: 'HEMAT15',
    type: 'flat',
    value: 15000,
    minOrder: 50000,
    desc: 'Potongan Rp15rb (min. Rp50rb)',
    expiry: '2026-12-31',
  },
  {
    code: 'BUNGKUS5',
    type: 'flat',
    value: 5000,
    minOrder: 0,
    desc: 'Potongan Rp5rb tanpa min. belanja',
    expiry: '2026-12-31',
  },
];

export interface VoucherResult {
  ok: boolean;
  discount: number;
  voucher: Voucher | null;
  message: string;
}

/** Validasi kode voucher terhadap subtotal. Selalu aman dipanggil ulang. */
export function validateVoucher(code: string, subtotal: number): VoucherResult {
  const normalized = normalizeVoucherCode(code);
  if (!normalized) {
    return { ok: false, discount: 0, voucher: null, message: '' };
  }
  const voucher = VOUCHERS.find((v) => v.code === normalized) ?? null;
  if (!voucher) {
    return { ok: false, discount: 0, voucher: null, message: 'Kode voucher tidak ditemukan.' };
  }
  if (new Date(voucher.expiry + 'T23:59:59') < new Date()) {
    return { ok: false, discount: 0, voucher, message: `Voucher ${voucher.code} sudah kedaluwarsa.` };
  }
  if (subtotal < voucher.minOrder) {
    return {
      ok: false,
      discount: 0,
      voucher,
      message: `Min. order ${formatIDR(voucher.minOrder)} untuk voucher ini.`,
    };
  }
  const discount =
    voucher.type === 'percent'
      ? Math.min(Math.round((subtotal * voucher.value) / 100), voucher.maxDiscount ?? Infinity)
      : Math.min(voucher.value, subtotal);
  return {
    ok: true,
    discount,
    voucher,
    message: `Voucher ${voucher.code} dipakai: hemat ${formatIDR(discount)}!`,
  };
}
