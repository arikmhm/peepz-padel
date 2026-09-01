import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { business } from "@/data/pricing";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Lapangan padel di Kudus. Sewa lapangan mulai Rp200.000/jam, sewa raket, dan sesi coach. Buka setiap hari 08.00–00.00. Cek harga lengkap dan booking lewat WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL("https://peepzpadel.com"),
  title: {
    default: "Peepz Padel Kudus — Sewa Lapangan Padel & Coach",
    template: "%s · Peepz Padel",
  },
  description,
  keywords: [
    "lapangan padel Kudus",
    "sewa lapangan padel Kudus",
    "padel Kudus",
    "coach padel Kudus",
    "Peepz Padel",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: business.name,
    title: "Peepz Padel Kudus — Sewa Lapangan Padel & Coach",
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#5d351f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${jakarta.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
