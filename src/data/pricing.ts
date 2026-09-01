/**
 * Sumber kebenaran tunggal untuk harga dan info bisnis.
 * Sumber: "Peepz Padel Menu.pdf" (export CorelDRAW, 11 Jun 2026) + info owner.
 * Ubah di sini, tabel harga dan kalkulator ikut berubah.
 */

export const business = {
  name: "Peepz Padel",
  city: "Kudus",
  address:
    "Jl. Lkr. Utara Kudus, Peganjaran, Kec. Bae, Kabupaten Kudus, Jawa Tengah 59327",
  plusCode: "6R9P+WFV Kudus",
  phoneDisplay: "0882 0088 78838",
  whatsapp: "62882008878838",
  instagram: "https://www.instagram.com/peepz.padel/",
  instagramHandle: "@peepz.padel",
  opensAt: 8, // 08.00
  closesAt: 24, // 00.00
  hoursLabel: "Setiap hari · 08.00 – 00.00",
} as const;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  business.plusCode,
)}`;

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  business.plusCode,
)}&output=embed`;

/** Rate Band: rentang jam dengan harga lapangan berbeda. endHour eksklusif. */
export const rateBands = [
  { label: "Pagi – Siang", startHour: 8, endHour: 16, price: 200_000 },
  { label: "Prime Time", startHour: 16, endHour: 22, price: 250_000 },
  { label: "Malam", startHour: 22, endHour: 24, price: 225_000 },
] as const;

/**
 * Racket Tier. Nama tier belum ada di pricelist owner — `pending` menandai
 * data yang masih menunggu konfirmasi. Satuan "start from" juga belum jelas
 * (per jam atau per sesi); saat ini diperlakukan per sesi.
 */
export const racketTiers = [
  { id: "t1", name: "Raket Tier 1", price: 50_000, pending: true },
  { id: "t2", name: "Raket Tier 2", price: 65_000, pending: true },
  { id: "t3", name: "Raket Tier 3", price: 80_000, pending: true },
] as const;

export const ballTube = { label: "Bola padel", detail: "Tube isi 3 bola", price: 86_000 } as const;

/** Coach Session — sudah termasuk coach, bola, ballboy. TIDAK termasuk lapangan. */
export const coachRates = [
  { people: 1, label: "Private", price: 200_000 },
  { people: 2, label: "2 orang", price: 250_000 },
  { people: 3, label: "3 orang", price: 300_000 },
  { people: 4, label: "4 orang", price: 350_000 },
  { people: 5, label: "5 orang", price: 400_000 },
  { people: 6, label: "6 orang", price: 450_000 },
] as const;

export const coachIncludes = ["Coach", "Bola", "Ballboy"] as const;

export const maxCoachPeople = 6;
