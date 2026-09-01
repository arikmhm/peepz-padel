import {
  business,
  ballTube,
  coachRates,
  maxCoachPeople,
  racketTiers,
  rateBands,
  // Import relatif + ekstensi .ts supaya `pnpm test` bisa jalan langsung di Node
  // tanpa bundler. Lihat scripts.test di package.json.
} from "../data/pricing.ts";

export type BookingInput = {
  /** yyyy-mm-dd, kosong berarti belum dipilih */
  date: string;
  startHour: number;
  hours: number;
  players: number;
  racketTierId: string;
  rackets: number;
  ballTubes: number;
  withCoach: boolean;
  name: string;
};

export type LineItem = { label: string; detail: string; amount: number };

export type Estimate = {
  items: LineItem[];
  total: number;
  notes: string[];
};

export const rupiah = (n: number) => `Rp${new Intl.NumberFormat("id-ID").format(n)}`;

/** 8 -> "08.00", 24 -> "00.00" */
export const fmtHour = (h: number) => `${String(h % 24).padStart(2, "0")}.00`;

export function courtPriceForHour(hour: number): number {
  const band = rateBands.find((b) => hour >= b.startHour && hour < b.endHour);
  if (!band) throw new RangeError(`Jam ${hour} di luar jam operasional`);
  return band.price;
}

/** Durasi yang melewati batas Rate Band dihitung per jam menurut band masing-masing. */
export function courtPrice(startHour: number, hours: number): number {
  let total = 0;
  for (let h = startHour; h < startHour + hours; h++) total += courtPriceForHour(h);
  return total;
}

/** Pilihan jam mulai yang masih memungkinkan durasi penuh sebelum tutup. */
export function startHourOptions(hours: number): number[] {
  const out: number[] = [];
  for (let h = business.opensAt; h + hours <= business.closesAt; h++) out.push(h);
  return out;
}

export function estimate(input: BookingInput): Estimate {
  const items: LineItem[] = [];
  const notes: string[] = [];

  const court = courtPrice(input.startHour, input.hours);
  const end = input.startHour + input.hours;
  items.push({
    label: "Sewa lapangan",
    detail: `${fmtHour(input.startHour)}–${fmtHour(end)} · ${input.hours} jam`,
    amount: court,
  });

  const bandsUsed = new Set(
    Array.from({ length: input.hours }, (_, i) => courtPriceForHour(input.startHour + i)),
  );
  if (bandsUsed.size > 1) {
    notes.push("Sesi ini melewati pergantian tarif, jadi tiap jam dihitung sesuai tarifnya.");
  }

  const coach = coachRates.find((c) => c.people === input.players);
  if (input.withCoach) {
    if (coach) {
      items.push({
        label: "Coach",
        detail: `${coach.label} · ${input.hours} jam · sudah termasuk bola & ballboy`,
        amount: coach.price * input.hours,
      });
    } else {
      notes.push(
        `Harga coach di pricelist berhenti di ${maxCoachPeople} orang. Untuk ${input.players} orang, tanyakan ke admin.`,
      );
    }
  }

  if (input.rackets > 0) {
    const tier = racketTiers.find((t) => t.id === input.racketTierId) ?? racketTiers[0];
    items.push({
      label: "Sewa raket",
      detail: `${input.rackets} unit · ${tier.name} · mulai dari ${rupiah(tier.price)}`,
      amount: tier.price * input.rackets,
    });
    notes.push("Harga raket tertulis “mulai dari”, harga pastinya dikonfirmasi admin.");
  }

  // Coach Session sudah termasuk bola, jadi pembelian tube tidak ditagihkan lagi.
  const chargeableTubes = input.withCoach && coach ? 0 : input.ballTubes;
  if (input.ballTubes > 0 && chargeableTubes === 0) {
    notes.push("Bola sudah termasuk dalam sesi coach, jadi tidak dihitung terpisah.");
  } else if (chargeableTubes > 0) {
    items.push({
      label: ballTube.label,
      detail: `${chargeableTubes} × ${ballTube.detail}`,
      amount: ballTube.price * chargeableTubes,
    });
  }

  return { items, total: items.reduce((s, i) => s + i.amount, 0), notes };
}

const DAYS = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

/** Format tanpa `new Date(string)` supaya tidak bergeser karena timezone. */
export function fmtDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return "(belum dipilih)";
  const dt = new Date(y, m - 1, d);
  return `${DAYS[dt.getDay()]}, ${d} ${MONTHS[m - 1]} ${y}`;
}

export function bookingMessage(input: BookingInput, result: Estimate): string {
  const end = input.startHour + input.hours;
  const tier = racketTiers.find((t) => t.id === input.racketTierId) ?? racketTiers[0];

  const rows: [string, string][] = [
    ["Tanggal", fmtDate(input.date)],
    ["Jam", `${fmtHour(input.startHour)} - ${fmtHour(end)} (${input.hours} jam)`],
    ["Pemain", `${input.players} orang`],
    ["Sewa raket", input.rackets > 0 ? `${input.rackets} unit (${tier.name})` : "tidak"],
    ["Bola", input.ballTubes > 0 ? `${input.ballTubes} tube` : "tidak"],
    ["Coach", input.withCoach ? "ya" : "tidak"],
    ["Estimasi", rupiah(result.total)],
    ["Nama", input.name.trim() || "-"],
  ];

  const pad = Math.max(...rows.map(([k]) => k.length));
  const body = rows.map(([k, v]) => `${k.padEnd(pad)} : ${v}`).join("\n");

  return `Halo ${business.name}! Saya mau booking:\n\n${body}\n\nApakah slot ini tersedia?`;
}

export const whatsappUrl = (text: string) =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`;
