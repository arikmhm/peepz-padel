# Peepz Padel — PRD

**Status:** Draft, pra-validasi owner
**Terakhir diperbarui:** 2026-09-01
**Sumber data:** `Peepz Padel Menu.pdf` (export CorelDRAW, 11 Jun 2026) + info owner via user

---

## 1. Ringkasan

Peepz Padel (Kudus, Jawa Tengah) memakai rantai **Instagram → Linktree → Google Drive → PDF 3 halaman rasio 9:16**. PDF itu didesain untuk Instagram Story, bukan untuk dibaca sebagai dokumen, dan tidak memuat lokasi, jam, fasilitas, cara booking, maupun label tier raket.

Produk yang dibangun: **satu halaman statis mobile-first** yang menggantikan PDF tersebut, dengan kalkulator estimasi biaya dan tombol WhatsApp yang mengirim pesan booking sudah terstruktur.

**Tidak membangun sistem booking.** Alasan di §4.

---

## 2. Fakta bisnis (terverifikasi)

| | |
|---|---|
| Nama | Peepz Padel |
| Lokasi | Jl. Lkr. Utara Kudus, Peganjaran, Kec. Bae, Kab. Kudus, Jawa Tengah 59327 |
| Plus Code | `6R9P+WFV` Kudus |
| Jam operasional | Setiap hari, 08:00–00:00 |
| WhatsApp | 0882008878838 → `wa.me/62882008878838` |
| Instagram | https://www.instagram.com/peepz.padel/ |
| Kanal booking saat ini | **WhatsApp admin saja.** Tidak ada form booking di kanal mana pun |
| Warna brand | `#5D351F` (coklat) + putih |

### Harga lapangan (per jam)

| Rate Band | Waktu | Harga |
|---|---|---|
| Pagi–Siang | 08:00–16:00 | Rp200.000 |
| Prime | 16:00–22:00 | Rp250.000 |
| Malam | 22:00–00:00 | Rp225.000 |

### Sewa raket

Tiga tier, **label belum diketahui**: mulai Rp50.000 / Rp65.000 / Rp80.000. Satuan ("start from" per jam atau per sesi) belum diketahui.

### Bola

Rp86.000 per tube (isi 3). **Dijual, bukan disewa.**

### Coach (per jam)

| Peserta | Harga | Per orang |
|---|---|---|
| Private | Rp200.000 | 200.000 |
| 2 orang | Rp250.000 | 125.000 |
| 3 orang | Rp300.000 | 100.000 |
| 4 orang | Rp350.000 | 87.500 |
| 5 orang | Rp400.000 | 80.000 |
| 6 orang | Rp450.000 | 75.000 |

Termasuk: coach, bola, ballboy. **Tidak termasuk lapangan.**

---

## 3. Glosarium

Istilah kanonik untuk kode, copy, dan percakapan dengan owner.

- **Court Booking** — sewa lapangan per jam. Berdiri sendiri.
- **Coach Session** — jasa pelatih per jam. Sudah termasuk coach, bola, dan ballboy. **Tidak** termasuk lapangan.
- **Full Session** — Court Booking + Coach Session. Inilah yang sebenarnya dibeli customer ketika mereka bertanya "les padel berapa?". Pricelist saat ini hanya menampilkan Coach Session, dan celah itulah sumber salah paham. Website wajib menampilkan Full Session sebagai total.
- **Rate Band** — satu dari tiga rentang waktu dengan harga lapangan berbeda. Bukan "shift".
- **Racket Tier** — satu dari tiga tingkat sewa raket. Label menunggu owner.
- **Estimate** — hasil kalkulator. Bukan quote dan bukan konfirmasi. Copy harus menyebutnya "estimasi" agar tidak dibaca sebagai booking yang sudah jadi.
- **Booking Message** — pesan WhatsApp terstruktur yang dirakit website. Ini output utama produk; semua yang lain adalah pendukungnya.

---

## 4. Keputusan: WhatsApp deeplink, bukan sistem booking

Sumber kebenaran jadwal Peepz Padel saat ini ada di admin, bukan di sistem mana pun. Sistem booking apa pun harus memindahkan sumber kebenaran itu ke aplikasi kita.

**Alternatif yang ditolak:**

- **Booking request form** — menambah kotak masuk kedua yang harus dipantau admin di samping WhatsApp. Satu hari terlewat, kepercayaan hilang. Customer juga merasa sudah booking padahal belum.
- **Full booking + payment** — satu booking walk-in atau via telepon yang tidak dicatat membuat website menampilkan slot kosong yang sebenarnya terisi. Double booking lebih buruk daripada keadaan sekarang.

**Yang dipilih:** website merakit Booking Message lengkap, customer menekan kirim di WhatsApp, admin memproses persis seperti sekarang.

**Konsekuensi:** perubahan operasional owner **nol** — tidak ada input harian, tidak ada training. Ini alasan utama solusi ini punya peluang benar-benar dipakai. Arsitekturnya jadi statis: tanpa backend, tanpa database, tanpa auth.

**Kapan ditinjau ulang:** ketika owner sendiri mengeluh volume WhatsApp terasa berat, atau mengeluh soal double booking.

---

## 5. Scope

### Must Have

| Fitur | Alasan |
|---|---|
| Mobile-first, muat < 2 detik | Hampir seluruh trafik dari bio Instagram di HP |
| Hero: apa, di mana, jam berapa | Tiga pertanyaan pertama setiap pengunjung |
| Pricelist HTML lengkap | Menghapus PDF + Google Drive dari rantai |
| Racket Tier berlabel | Menutup ambiguitas yang terbukti ada di dokumen mereka |
| Peringatan tebal: harga coach belum termasuk lapangan | Sumber salah paham paling jelas |
| Kalkulator Estimate → total Full Session | Menghilangkan pertanyaan "totalnya berapa?" |
| Tombol WhatsApp merakit Booking Message | Manfaat operasional terbesar, biaya terkecil |
| Lokasi, Maps embed, tombol arah | Tidak ada di kanal mana pun saat ini |
| Jam operasional eksplisit | Sekarang hanya bisa ditebak dari band harga |
| FAQ 8–12 pertanyaan | Memindahkan beban percakapan dari admin ke halaman |
| Galeri 4–8 foto fasilitas | Pemain baru tidak datang ke tempat yang belum pernah dilihat |
| SEO lokal + JSON-LD `LocalBusiness` | Satu-satunya kanal akuisisi baru yang Linktree tidak bisa berikan |
| Analytics | Bukti kinerja untuk percakapan lanjutan dengan owner |

### Should Have

Halaman coach & program les · banner pengumuman · halaman promo statis.

### Ditunda sampai ada pemicu

| Fitur | Pemicu |
|---|---|
| Jadwal ketersediaan read-only | Owner bersedia memperbaruinya. Jadwal yang salah lebih merusak daripada tidak ada jadwal |
| Form booking → diteruskan ke WhatsApp admin | Volume WhatsApp terasa berat |
| Payment gateway, DP online | Owner mengeluh no-show |
| Admin dashboard, auth, database customer, membership | Ada produk langganan atau cabang kedua |

---

## 6. Halaman & alur

Satu halaman dengan navigasi anchor. Lebih sedikit yang dipelihara, dan seluruh sinyal SEO terkonsentrasi di satu URL.

```
/  Hero → Tentang → Harga → Kalkulator → Coach → Galeri → Lokasi → FAQ → Footer
```

**Alur utama:**

```
Instagram / Google
  → landing (apa, di mana, jam, berapa — satu layar)
  → kalkulator: tanggal, jam, durasi, orang, raket, bola, coach
  → Estimate muncul
  → klik "Booking via WhatsApp"
  → WhatsApp terbuka, Booking Message sudah terisi
  → customer tekan kirim
  → admin cek jadwal & balas (cara lama)
  → bayar di tempat (cara lama)
```

Tiga langkah terakhir tidak berubah dari kondisi sekarang.

**Contoh Booking Message:**

```
Halo Peepz Padel! Saya mau booking:

Tanggal    : Sabtu, 6 September 2026
Jam        : 19:00 - 21:00 (2 jam)
Pemain     : 4 orang
Sewa raket : 2 unit
Bola       : 1 tube
Coach      : tidak

Estimasi   : Rp586.000
Nama       : -

Apakah slot ini tersedia?
```

---

## 7. Data

Tanpa database. Satu file `src/data/pricing.ts` menjadi sumber kebenaran untuk tabel harga **dan** kalkulator sekaligus — ubah satu angka, dua tempat ikut berubah.

```ts
export const rateBands = [
  { label: "Pagi–Siang", from: "08:00", to: "16:00", price: 200_000 },
  { label: "Prime",      from: "16:00", to: "22:00", price: 250_000 },
  { label: "Malam",      from: "22:00", to: "24:00", price: 225_000 },
];

export const racketTiers = [
  { name: "TBD", from: 50_000 },  // label menunggu owner
  { name: "TBD", from: 65_000 },
  { name: "TBD", from: 80_000 },
];

export const ballTube = { label: "Tube isi 3", price: 86_000 };

export const coachRates = [
  { people: 1, label: "Private", price: 200_000 },
  { people: 2, price: 250_000 },
  { people: 3, price: 300_000 },
  { people: 4, price: 350_000 },
  { people: 5, price: 400_000 },
  { people: 6, price: 450_000 },
];
// coachRates TIDAK termasuk lapangan — kalkulator wajib menambahkan Court Booking
```

**Aturan kalkulator:** durasi yang melewati batas Rate Band dihitung per jam menurut band masing-masing. Contoh 21:00–23:00 = Rp250.000 + Rp225.000.

---

## 8. Stack

Next.js App Router + TypeScript, Tailwind, static export, deploy ke Vercel.

Yang perlu diketahui di luar default:

- **Tanpa backend, database, auth, ORM, atau payment.** Situs statis. Lihat §4.
- **WhatsApp** — `wa.me` deeplink + `encodeURIComponent`. Bukan WhatsApp Business API.
- **Maps** — iframe embed. Tanpa API key.
- **Biaya berjalan** — domain saja, ~Rp200rb/tahun. Hosting Vercel free tier. Angka ini adalah argumen jualan ke owner.

---

## 9. Menunggu owner

Blocking untuk versi final. Sampai terjawab, pakai placeholder yang jelas ditandai agar terbaca sebagai pertanyaan saat demo, bukan sebagai kekurangan.

- Label tiga Racket Tier, dan satuannya (per jam / per sesi)
- Jumlah lapangan, indoor atau outdoor
- Foto lapangan & fasilitas
- Durasi minimum sewa
- Kebijakan DP dan pembatalan
- Fasilitas yang tersedia (parkir, shower, kantin, loker)
- Aturan main (sepatu non-marking, maksimal pemain per lapangan)

**Pertanyaan yang bisa mengubah arah produk:**

1. Sudah terdaftar di platform booking (Ayo Indonesia, Sportspot) atau Google Business Profile? Jika ya, positioning berubah: website jadi halaman resmi + SEO yang mengarah ke platform tersebut.
2. Okupansi 08:00–16:00 dibanding 16:00–22:00? Menentukan apakah masalah mereka akuisisi (butuh SEO & konten) atau booking (butuh sistem).
3. Apa satu hal yang paling bikin frustrasi dalam mengelola tempat ini sekarang?

---

## 10. Definition of Done (v1 demo)

- [ ] Semua harga di §2 tampil benar dan cocok dengan PDF
- [ ] Kalkulator menghasilkan total Full Session yang benar, termasuk kasus lintas Rate Band
- [ ] Tombol WhatsApp membuka chat dengan Booking Message terisi di HP Android dan iOS
- [ ] Lighthouse mobile ≥ 90 pada Performance dan SEO
- [ ] JSON-LD `LocalBusiness` valid di Rich Results Test
- [ ] Deploy di URL publik yang bisa owner buka sendiri setelah demo
- [ ] Setiap placeholder yang menunggu owner ditandai jelas di UI

---

## 11. Prinsip

Setiap fitur yang menambah pekerjaan harian owner adalah fitur yang membunuh proyek ini. "Nol pekerjaan tambahan" dijual sebagai fitur utama, bukan sebagai keterbatasan.
