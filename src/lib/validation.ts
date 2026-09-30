/**
 * Validasi & sanitasi input terpusat.
 * Prinsip: tolak sejak awal (batas panjang, karakter, rentang angka),
 * bersihkan sebelum dipakai (trim, collapse whitespace, buang karakter kontrol),
 * dan encode saat dirangkai ke URL. React sudah meng-escape teks saat render,
 * jadi yang dijaga di sini adalah panjang, format, dan rentang nilai.
 */

export const LIMITS = {
  nama: 50,
  lokasi: 200,
  tujuan: 150,
  catatan: 300,
  heroNeed: 150,
  voucher: 20,
  kmMin: 1,
  kmMax: 25,
} as const;

/** Buang karakter kontrol ASCII, rapikan spasi, potong sesuai batas. */
export function sanitizeText(value: string, maxLength: number): string {
  return value
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

/** Nama: huruf, angka, spasi, titik, koma, strip, apostrof. 2–50 karakter. */
export function isValidName(value: string): boolean {
  const v = value.trim();
  return (
    v.length >= 2 &&
    v.length <= LIMITS.nama &&
    /^[\p{L}\p{N} .,'_-]+$/u.test(v)
  );
}

/** Alamat/lokasi/tujuan: min 3 char, maks sesuai param, tolak pola skema URL & tag HTML. */
export function isValidAddress(value: string, max: number = LIMITS.lokasi): boolean {
  const v = value.trim();
  if (v.length < 3 || v.length > max) return false;
  return !/(javascript:|data:|vbscript:|<[^>]*>)/i.test(v);
}

/** Catatan opsional: maks 300 char, tolak pola berbahaya. Kosong = valid. */
export function isValidNote(value: string): boolean {
  const v = value.trim();
  if (v.length === 0) return true;
  if (v.length > LIMITS.catatan) return false;
  return !/(javascript:|data:|vbscript:|<[^>]*>)/i.test(v);
}

/** Kode voucher: alfanumerik 1–20 char, dinormalisasi ke UPPERCASE. */
export function normalizeVoucherCode(value: string): string {
  return value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, LIMITS.voucher);
}

/** Jarak: integer 1–25, fallback aman. */
export function clampKm(value: unknown): number {
  const n = typeof value === 'string' ? Number.parseInt(value, 10) : Number(value);
  if (!Number.isFinite(n)) return 5;
  return Math.min(LIMITS.kmMax, Math.max(LIMITS.kmMin, Math.trunc(n)));
}

/** Koordinat valid untuk peta (cegah nilai aneh ke API geocode). */
export function isValidLatLng(lat: unknown, lng: unknown): boolean {
  return (
    typeof lat === 'number' &&
    typeof lng === 'number' &&
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
}
