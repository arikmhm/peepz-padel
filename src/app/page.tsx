import { Estimator } from "@/components/estimator";
import {
  ballTube,
  business,
  coachIncludes,
  coachRates,
  mapsEmbedUrl,
  mapsUrl,
  racketTiers,
  rateBands,
} from "@/data/pricing";
import { fmtHour, rupiah, whatsappUrl } from "@/lib/booking";

const NAV = [
  ["Harga", "#harga"],
  ["Hitung biaya", "#estimasi"],
  ["Coach", "#coach"],
  ["Lokasi", "#lokasi"],
  ["FAQ", "#faq"],
] as const;

const waGeneral = whatsappUrl(
  `Halo ${business.name}! Saya mau tanya soal sewa lapangan.`,
);

const FAQ = [
  {
    q: "Berapa harga sewa lapangan?",
    a: "Rp200.000/jam untuk jam 08.00–16.00, Rp250.000/jam untuk 16.00–22.00, dan Rp225.000/jam untuk 22.00–00.00. Kalau sesimu melewati pergantian jam, tiap jam dihitung sesuai tarifnya masing-masing.",
  },
  {
    q: "Apakah harga coach sudah termasuk lapangan?",
    a: "Belum. Harga coach mencakup coach, bola, dan ballboy — sewa lapangan dihitung terpisah. Pakai kalkulator di atas untuk melihat totalnya sekaligus.",
  },
  {
    q: "Saya belum punya raket, bagaimana?",
    a: `Ada sewa raket mulai dari ${rupiah(racketTiers[0].price)}. Tinggal sebutkan jumlah raket yang dibutuhkan saat booking.`,
  },
  {
    q: "Apakah bola disediakan?",
    a: `Bola dijual per tube (isi 3) seharga ${rupiah(ballTube.price)}. Khusus sesi coach, bola sudah termasuk jadi tidak perlu beli terpisah.`,
  },
  {
    q: "Jam berapa buka?",
    a: `${business.hoursLabel}.`,
  },
  {
    q: "Bagaimana cara booking?",
    a: "Pilih tanggal dan jam di kalkulator, lalu tekan tombol WhatsApp. Pesanmu sudah terisi otomatis, admin tinggal mengecek ketersediaan slot dan mengonfirmasi.",
  },
  {
    q: "Berapa orang yang bisa main dalam satu lapangan?",
    a: "Padel umumnya dimainkan 2 lawan 2. Untuk sesi coach, harga tersedia sampai 6 orang.",
  },
];

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />

      <main className="flex-1">
        <Hero />
        <Pricing />
        <EstimatorSection />
        <Coach />
        <Location />
        <Faq />
      </main>

      <Footer />
    </>
  );
}

/* ---------------------------------------------------------------- header */

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-dark/20 bg-brand/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3">
        <a href="#top" className="text-lg font-extrabold tracking-tight text-cream">
          peepz<span className="text-cream/50">!</span>
        </a>

        <nav className="hidden gap-6 text-sm text-cream/70 md:flex">
          {NAV.map(([label, href]) => (
            <a key={href} href={href} className="transition hover:text-cream">
              {label}
            </a>
          ))}
        </nav>

        <a
          href="#estimasi"
          className="rounded-full bg-cream px-4 py-2 text-sm font-bold text-brand transition hover:bg-white"
        >
          Booking
        </a>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ hero */

function Hero() {
  return (
    <section id="top" className="bg-brand text-cream">
      <div className="mx-auto max-w-5xl px-5 pt-14 pb-16 sm:pt-20 sm:pb-24">
        <p className="text-sm font-semibold tracking-widest text-cream/50 uppercase">
          Kudus, Jawa Tengah
        </p>

        <h1 className="mt-4 text-5xl leading-[0.95] font-extrabold tracking-tight sm:text-7xl">
          Peepz
          <br />
          Padel
        </h1>

        <p className="mt-6 max-w-lg text-lg text-cream/75">
          Sewa lapangan mulai {rupiah(rateBands[0].price)}/jam. Raket, bola, dan coach
          tersedia di tempat. Buka sampai tengah malam.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#estimasi"
            className="rounded-xl bg-cream px-5 py-3 font-bold text-brand transition hover:bg-white"
          >
            Hitung biaya & booking
          </a>
          <a
            href="#harga"
            className="rounded-xl border border-cream/25 px-5 py-3 font-bold transition hover:bg-cream/10"
          >
            Lihat harga
          </a>
        </div>

        <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-cream/15 bg-cream/15 sm:grid-cols-3">
          {[
            ["Jam buka", "08.00 – 00.00", "Setiap hari"],
            ["Lokasi", "Jl. Lkr. Utara", "Peganjaran, Bae"],
            ["Booking", "Lewat WhatsApp", "Dikonfirmasi admin"],
          ].map(([k, v, sub]) => (
            <div key={k} className="bg-brand px-5 py-4">
              <dt className="text-xs tracking-wider text-cream/45 uppercase">{k}</dt>
              <dd className="mt-1 font-bold">{v}</dd>
              <dd className="text-sm text-cream/50">{sub}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- pricing */

function Pricing() {
  return (
    <Section id="harga" title="Harga" lead="Semua harga per jam, kecuali disebutkan lain.">
      <div className="grid gap-5 md:grid-cols-3">
        <Card title="Sewa lapangan" wide>
          <ul className="divide-y divide-sand">
            {rateBands.map((band) => (
              <li key={band.label} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="font-semibold">
                    {fmtHour(band.startHour)} – {fmtHour(band.endHour)}
                  </p>
                  <p className="text-sm text-ink/50">{band.label}</p>
                </div>
                <p className="shrink-0 font-bold tabular-nums">
                  {rupiah(band.price)}
                  <span className="font-medium text-ink/40">/jam</span>
                </p>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Sewa raket">
          <ul className="divide-y divide-sand">
            {racketTiers.map((tier) => (
              <li key={tier.id} className="flex items-center justify-between gap-4 py-3">
                <span className="text-sm">
                  {tier.name}
                  {tier.pending && <Pending />}
                </span>
                <span className="shrink-0 text-sm font-bold tabular-nums">
                  <span className="font-medium text-ink/40">dari </span>
                  {rupiah(tier.price)}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title={ballTube.label}>
          <p className="py-3 text-2xl font-extrabold">{rupiah(ballTube.price)}</p>
          <p className="text-sm text-ink/50">{ballTube.detail}</p>
        </Card>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------- estimator */

function EstimatorSection() {
  return (
    <Section
      id="estimasi"
      title="Hitung biaya kamu"
      lead="Pilih kebutuhanmu, lihat totalnya, lalu kirim ke admin lewat WhatsApp dengan pesan yang sudah terisi."
      tinted
    >
      <Estimator />
    </Section>
  );
}

/* ----------------------------------------------------------------- coach */

function Coach() {
  return (
    <Section
      id="coach"
      title="Coach"
      lead="Belajar dari awal atau memperbaiki pukulan. Harga per jam, mengikuti jumlah peserta."
    >
      <div className="grid gap-5 md:grid-cols-[1fr_18rem]">
        <Card title="Harga per jam" wide>
          <ul className="divide-y divide-sand">
            {coachRates.map((rate) => (
              <li key={rate.people} className="flex items-center justify-between gap-4 py-3">
                <span className="font-medium">{rate.label}</span>
                <span className="text-right tabular-nums">
                  <span className="font-bold">{rupiah(rate.price)}</span>
                  <span className="block text-xs text-ink/45">
                    {rupiah(Math.round(rate.price / rate.people))} / orang
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <div className="space-y-4">
          <Card title="Sudah termasuk">
            <ul className="space-y-2 py-1">
              {coachIncludes.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <span aria-hidden className="text-brand">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          <div className="rounded-2xl border-2 border-brand bg-brand/5 p-5">
            <p className="text-sm font-bold text-brand">Belum termasuk lapangan</p>
            <p className="mt-1.5 text-sm text-ink/70">
              Sewa lapangan dihitung terpisah dari harga coach. Pakai kalkulator di atas
              untuk melihat total keduanya sekaligus.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------- location */

function Location() {
  return (
    <Section id="lokasi" title="Lokasi" lead={business.hoursLabel} tinted>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-sand">
          <iframe
            title={`Peta lokasi ${business.name}`}
            src={mapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-72 w-full md:h-full"
          />
        </div>

        <Card title="Alamat">
          <p className="py-2 text-ink/75">{business.address}</p>
          <p className="text-sm text-ink/45">Plus Code {business.plusCode}</p>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-cream transition hover:bg-brand-dark"
            >
              Buka di Google Maps
            </a>
            <a
              href={waGeneral}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-sand px-4 py-2.5 text-sm font-bold transition hover:bg-sand/50"
            >
              Tanya admin
            </a>
          </div>
        </Card>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------- faq */

function Faq() {
  return (
    <Section id="faq" title="Pertanyaan yang sering masuk">
      <div className="divide-y divide-sand overflow-hidden rounded-2xl border border-sand bg-white/70">
        {FAQ.map((item) => (
          <details key={item.q} className="group px-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold">
              {item.q}
              <span
                aria-hidden
                className="shrink-0 text-xl text-brand/50 transition group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="pb-4 text-ink/70">{item.a}</p>
          </details>
        ))}
      </div>

      <p className="mt-4 rounded-xl border border-dashed border-brand/30 bg-brand/5 px-4 py-3 text-sm text-ink/60">
        <strong className="text-brand">Menunggu info owner:</strong> jumlah lapangan,
        indoor/outdoor, durasi minimum sewa, DP dan kebijakan pembatalan, fasilitas
        (parkir, shower, loker), serta aturan sepatu. Bagian ini ditandai sengaja.
      </p>
    </Section>
  );
}

/* ---------------------------------------------------------------- footer */

function Footer() {
  return (
    <footer className="bg-brand text-cream">
      <div className="mx-auto grid max-w-5xl gap-8 px-5 py-12 sm:grid-cols-3">
        <div>
          <p className="text-xl font-extrabold">
            peepz<span className="text-cream/50">!</span> padel
          </p>
          <p className="mt-2 text-sm text-cream/55">{business.address}</p>
        </div>

        <div className="text-sm">
          <p className="font-semibold">Jam buka</p>
          <p className="mt-1 text-cream/55">{business.hoursLabel}</p>
        </div>

        <div className="text-sm">
          <p className="font-semibold">Kontak</p>
          <a
            href={waGeneral}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block text-cream/55 transition hover:text-cream"
          >
            WhatsApp {business.phoneDisplay}
          </a>
          <a
            href={business.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-cream/55 transition hover:text-cream"
          >
            Instagram {business.instagramHandle}
          </a>
        </div>
      </div>

      <div className="border-t border-cream/10 px-5 py-5 text-center text-xs text-cream/35">
        © {new Date().getFullYear()} {business.name}
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------- primitives */

function Section({
  id,
  title,
  lead,
  tinted,
  children,
}: {
  id: string;
  title: string;
  lead?: string;
  tinted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={tinted ? "bg-sand/35" : undefined}>
      <div className="mx-auto max-w-5xl scroll-mt-20 px-5 py-14 sm:py-20">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
        {lead && <p className="mt-3 max-w-xl text-ink/60">{lead}</p>}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

function Card({
  title,
  wide,
  children,
}: {
  title: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl border border-sand bg-white/70 p-5 ${wide ? "md:col-span-2" : ""}`}
    >
      <h3 className="mb-1 font-bold">{title}</h3>
      {children}
    </div>
  );
}

/** Menandai data yang masih menunggu konfirmasi owner. */
function Pending() {
  return (
    <span
      title="Nama tier belum ada di pricelist — menunggu konfirmasi owner"
      className="ml-1.5 cursor-help rounded bg-brand/10 px-1.5 py-0.5 align-middle text-[10px] font-bold text-brand"
    >
      ?
    </span>
  );
}

/* ---------------------------------------------------------------- json-ld */

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: business.name,
    description: `Lapangan padel di ${business.city}, Jawa Tengah. Sewa lapangan, sewa raket, dan sesi coach.`,
    url: "https://peepzpadel.com",
    telephone: `+${business.whatsapp}`,
    priceRange: "Rp200.000 – Rp250.000",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Lkr. Utara Kudus, Peganjaran",
      addressLocality: "Kecamatan Bae, Kabupaten Kudus",
      addressRegion: "Jawa Tengah",
      postalCode: "59327",
      addressCountry: "ID",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday", "Sunday",
      ],
      opens: "08:00",
      closes: "24:00",
    },
    sameAs: [business.instagram],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
