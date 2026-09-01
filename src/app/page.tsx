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
  { q: "Jam berapa buka?", a: `${business.hoursLabel}.` },
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
    <header className="sticky top-0 z-50 bg-brand/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3.5">
        <a
          href="#top"
          className="text-lg font-extrabold tracking-tight text-cream"
          aria-label={business.name}
        >
          peepz<span className="text-cream/40">!</span>
        </a>

        <nav className="hidden gap-7 text-sm text-cream/60 md:flex">
          {NAV.map(([labelText, href]) => (
            <a
              key={href}
              href={href}
              className="transition-colors hover:text-cream"
            >
              {labelText}
            </a>
          ))}
        </nav>

        <a
          href="#estimasi"
          className="rounded-full bg-cream px-4 py-2 text-sm font-bold text-brand transition-colors hover:bg-white"
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
    <section id="top" className="relative overflow-hidden bg-brand text-cream">
      {/* Wrapper ini membatasi ilustrasi supaya berhenti tepat di atas baris fakta. */}
      <div className="relative">
        <div
          aria-hidden
          className="art art-serve pointer-events-none absolute -right-16 bottom-0 h-[26rem] w-[20rem] text-cream/20 sm:-right-4 sm:h-[34rem] sm:w-[26rem] lg:right-8 lg:h-[36rem] lg:w-[28rem] lg:text-cream/90"
        />

        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-0 sm:pt-24">
          <p className="text-xs font-bold tracking-[0.2em] text-cream/45 uppercase">
            {business.city}, Jawa Tengah
          </p>

          <h1 className="mt-5 text-[4.5rem] leading-[0.82] font-extrabold tracking-[-0.04em] sm:text-[7rem] lg:text-[8.5rem]">
            Peepz
            <br />
            Padel
          </h1>

          <p className="mt-7 max-w-sm text-lg leading-relaxed text-cream/70 sm:max-w-md">
            Sewa lapangan mulai {rupiah(rateBands[0].price)}/jam. Raket, bola,
            dan coach tersedia di tempat. Buka sampai tengah malam.
          </p>

          <div className="mt-9 flex flex-wrap gap-3 pb-16 sm:pb-24">
            <a
              href="#estimasi"
              className="rounded-xl bg-cream px-6 py-3.5 font-bold text-brand transition-colors hover:bg-white"
            >
              Hitung biaya & booking
            </a>
            <a
              href="#harga"
              className="rounded-xl px-6 py-3.5 font-bold text-cream/80 ring-1 ring-cream/25 transition-colors hover:bg-cream/10 hover:text-cream"
            >
              Lihat harga
            </a>
          </div>
        </div>
      </div>

      <dl className="relative z-10 border-t border-cream/15 bg-brand">
        <div className="mx-auto grid max-w-6xl px-6 sm:grid-cols-3">
          {[
            ["Jam buka", "08.00 – 00.00", "Setiap hari"],
            ["Lokasi", "Jl. Lkr. Utara", "Peganjaran, Bae"],
            ["Booking", "Lewat WhatsApp", "Dikonfirmasi admin"],
          ].map(([k, v, sub], i) => (
            <div
              key={k}
              className={`py-5 sm:px-6 sm:first:pl-0 ${
                i > 0
                  ? "border-t border-cream/15 sm:border-t-0 sm:border-l"
                  : ""
              }`}
            >
              <dt className="text-[0.7rem] font-bold tracking-[0.15em] text-cream/40 uppercase">
                {k}
              </dt>
              <dd className="mt-1.5 font-bold">{v}</dd>
              <dd className="text-sm text-cream/45">{sub}</dd>
            </div>
          ))}
        </div>
      </dl>
    </section>
  );
}

/* --------------------------------------------------------------- pricing */

function Pricing() {
  return (
    <Section id="harga" eyebrow="Pricelist" title="Harga">
      <PriceList
        caption="Sewa lapangan"
        note="Sesi yang melewati pergantian jam dihitung per jam sesuai tarifnya."
        rows={rateBands.map((b) => ({
          key: b.label,
          left: `${fmtHour(b.startHour)} – ${fmtHour(b.endHour)}`,
          sub: b.label,
          right: rupiah(b.price),
          unit: "/jam",
        }))}
      />

      <div className="mt-14 grid gap-14 md:grid-cols-2">
        <PriceList
          caption="Sewa raket"
          note="Nama tipe raket menunggu konfirmasi owner."
          rows={racketTiers.map((t) => ({
            key: t.id,
            left: t.name,
            sub: "per sesi",
            right: rupiah(t.price),
            prefix: "dari",
            pending: t.pending,
          }))}
        />

        <div>
          <Caption>{ballTube.label}</Caption>
          <div className="mt-5 flex items-baseline gap-3 border-t-2 border-ink pt-5">
            <span className="text-5xl font-extrabold tracking-tight tabular-nums">
              {rupiah(ballTube.price)}
            </span>
            <span className="text-ink/45">/tube</span>
          </div>
          <p className="mt-3 text-ink/50">{ballTube.detail}</p>
        </div>
      </div>
    </Section>
  );
}

type Row = {
  key: string;
  left: string;
  sub?: string;
  right: string;
  unit?: string;
  prefix?: string;
  pending?: boolean;
};

function PriceList({
  caption,
  rows,
  note,
}: {
  caption: string;
  rows: Row[];
  note?: string;
}) {
  return (
    <div>
      <Caption>{caption}</Caption>
      <ul className="mt-5 border-t-2 border-ink">
        {rows.map((r) => (
          <li
            key={r.key}
            className="flex items-baseline justify-between gap-6 border-b border-ink/10 py-5"
          >
            <span>
              <span className="text-lg font-bold">
                {r.left}
                {r.pending && <Pending />}
              </span>
              {r.sub && (
                <span className="block text-sm text-ink/45">{r.sub}</span>
              )}
            </span>
            <span className="shrink-0 tabular-nums">
              {r.prefix && (
                <span className="mr-1.5 text-sm font-medium text-ink/40">
                  {r.prefix}
                </span>
              )}
              <span className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                {r.right}
              </span>
              {r.unit && <span className="text-ink/40">{r.unit}</span>}
            </span>
          </li>
        ))}
      </ul>
      {note && <p className="mt-4 text-sm text-ink/45">{note}</p>}
    </div>
  );
}

/* ------------------------------------------------------------- estimator */

function EstimatorSection() {
  return (
    <section id="estimasi" className="scroll-mt-16 bg-brand text-cream">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <p className="text-xs font-bold tracking-[0.2em] text-cream/40 uppercase">
          Estimasi
        </p>
        <h2 className="mt-4 max-w-2xl text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-5xl">
          Hitung dulu, baru chat admin
        </h2>
        <p className="mt-4 max-w-lg text-cream/60">
          Pilih kebutuhanmu di bawah. Tombol WhatsApp-nya sudah membawa tanggal,
          jam, dan total — kamu tinggal kirim.
        </p>

        <div className="mt-10">
          <Estimator />
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- coach */

function Coach() {
  return (
    <Section id="coach" eyebrow="Latihan" title="Coach">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <div
            aria-hidden
            className="art art-return mx-auto h-56 w-full max-w-56 text-brand sm:h-72 sm:max-w-72"
          />

          <div className="mt-8">
            <Caption>Sudah termasuk</Caption>
            <ul className="mt-4 flex flex-wrap gap-2">
              {coachIncludes.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-brand px-4 py-1.5 text-sm font-bold text-cream"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 border-l-2 border-brand pl-4 text-ink/70">
            <strong className="block text-brand">
              Belum termasuk lapangan.
            </strong>
            Sewa lapangan dihitung terpisah dari harga coach — pakai kalkulator
            di atas untuk melihat total keduanya.
          </p>
        </div>

        <div>
          <Caption>Harga per jam</Caption>
          <ul className="mt-5 border-t-2 border-ink">
            {coachRates.map((rate) => (
              <li
                key={rate.people}
                className="flex items-baseline justify-between gap-6 border-b border-ink/10 py-4"
              >
                <span className="text-lg font-bold">{rate.label}</span>
                <span className="shrink-0 text-right tabular-nums">
                  <span className="text-2xl font-extrabold tracking-tight">
                    {rupiah(rate.price)}
                  </span>
                  <span className="block text-sm text-ink/45">
                    {rupiah(Math.round(rate.price / rate.people))} / orang
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------- location */

function Location() {
  return (
    <section id="lokasi" className="scroll-mt-16 border-t border-ink/10">
      <div className="mx-auto grid max-w-6xl lg:grid-cols-2">
        <div className="px-6 py-20 sm:py-24">
          <p className="text-xs font-bold tracking-[0.2em] text-ink/40 uppercase">
            Mampir
          </p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Lokasi
          </h2>

          <p className="mt-6 max-w-sm text-lg leading-relaxed text-ink/70">
            {business.address}
          </p>
          <p className="mt-2 text-sm text-ink/40">
            Plus Code {business.plusCode}
          </p>
          <p className="mt-6 font-bold">{business.hoursLabel}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-brand px-5 py-3 font-bold text-cream transition-colors hover:bg-brand-deep"
            >
              Buka di Google Maps
            </a>
            <a
              href={waGeneral}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl px-5 py-3 font-bold ring-1 ring-ink/15 transition-colors hover:bg-sand/50"
            >
              Tanya admin
            </a>
          </div>
        </div>

        <div className="min-h-72 lg:min-h-[32rem]">
          <iframe
            title={`Peta lokasi ${business.name}`}
            src={mapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-72 w-full grayscale-[0.35]"
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- faq */

function Faq() {
  return (
    <Section id="faq" eyebrow="FAQ" title="Yang sering ditanya">
      <ul className="border-t-2 border-ink">
        {FAQ.map((item) => (
          <li key={item.q} className="border-b border-ink/10">
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-bold">
                {item.q}
                <span
                  aria-hidden
                  className="shrink-0 text-2xl leading-none font-normal text-brand/40 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-5 leading-relaxed text-ink/65">
                {item.a}
              </p>
            </details>
          </li>
        ))}
      </ul>

      <p className="mt-8 max-w-2xl border-l-2 border-brand/40 pl-4 text-sm text-ink/55">
        <strong className="text-brand">Menunggu info owner:</strong> jumlah
        lapangan, indoor/outdoor, durasi minimum sewa, DP dan kebijakan
        pembatalan, fasilitas (parkir, shower, loker), serta aturan sepatu.
      </p>
    </Section>
  );
}

/* ---------------------------------------------------------------- footer */

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-deep text-cream">
      <div
        aria-hidden
        className="art art-mark pointer-events-none absolute -right-8 -bottom-10 h-40 w-72 text-cream/[0.07] sm:h-56 sm:w-[26rem]"
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-3">
        <div>
          <p className="text-2xl font-extrabold tracking-tight">
            peepz<span className="text-cream/40">!</span> padel
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/50">
            {business.address}
          </p>
        </div>

        <div className="text-sm">
          <p className="text-[0.7rem] font-bold tracking-[0.15em] text-cream/35 uppercase">
            Jam buka
          </p>
          <p className="mt-2 text-cream/60">{business.hoursLabel}</p>
        </div>

        <div className="text-sm">
          <p className="text-[0.7rem] font-bold tracking-[0.15em] text-cream/35 uppercase">
            Kontak
          </p>
          <a
            href={waGeneral}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block text-cream/60 transition-colors hover:text-cream"
          >
            WhatsApp {business.phoneDisplay}
          </a>
          <a
            href={business.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-cream/60 transition-colors hover:text-cream"
          >
            Instagram {business.instagramHandle}
          </a>
        </div>
      </div>

      <div className="relative border-t border-cream/10 px-6 py-5 text-center text-xs text-cream/30">
        © {new Date().getFullYear()} {business.name}
      </div>
    </footer>
  );
}

/* ----------------------------------------------------------- primitives */

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-16">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <p className="text-xs font-bold tracking-[0.2em] text-ink/40 uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
          {title}
        </h2>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[0.7rem] font-bold tracking-[0.15em] text-ink/45 uppercase">
      {children}
    </h3>
  );
}

/** Menandai data yang masih menunggu konfirmasi owner. */
function Pending() {
  return (
    <span
      title="Nama tier belum ada di pricelist — menunggu konfirmasi owner"
      className="ml-2 cursor-help rounded bg-brand/12 px-1.5 py-0.5 align-middle text-[10px] font-bold text-brand"
    >
      ?
    </span>
  );
}

/* --------------------------------------------------------------- json-ld */

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
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
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
