"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { ballTube, coachRates, maxCoachPeople, racketTiers } from "@/data/pricing";
import {
  bookingMessage,
  estimate,
  fmtHour,
  rupiah,
  startHourOptions,
  whatsappUrl,
  type BookingInput,
} from "@/lib/booking";

/** Halaman ini di-prerender saat build, jadi "hari ini" hanya diketahui di client. */
const neverChanges = () => () => {};
const todayIso = () => {
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(
    n.getDate(),
  ).padStart(2, "0")}`;
};

const DURATIONS = [1, 2, 3, 4];
const PLAYERS = [1, 2, 3, 4, 5, 6, 7, 8];

const field =
  "w-full rounded-lg bg-cream px-3.5 py-3 font-medium text-ink outline-none ring-1 ring-transparent transition focus:ring-2 focus:ring-cream";
const label =
  "mb-2 block text-[0.7rem] font-bold tracking-[0.12em] text-cream/45 uppercase";

export function Estimator() {
  const [input, setInput] = useState<BookingInput>({
    date: "",
    startHour: 19,
    hours: 2,
    players: 4,
    racketTierId: racketTiers[0].id,
    rackets: 0,
    ballTubes: 0,
    withCoach: false,
    name: "",
  });

  const today = useSyncExternalStore(neverChanges, todayIso, () => "");

  const set = <K extends keyof BookingInput>(key: K, value: BookingInput[K]) =>
    setInput((prev) => {
      const next = { ...prev, [key]: value };
      // Durasi baru bisa membuat jam mulai tidak lagi muat sebelum tutup.
      const allowed = startHourOptions(next.hours);
      if (!allowed.includes(next.startHour)) next.startHour = allowed.at(-1)!;
      return next;
    });

  // Default ke hari ini tanpa menulis ke state, supaya tidak ada render berantai.
  const booking = useMemo(() => ({ ...input, date: input.date || today }), [input, today]);
  const result = useMemo(() => estimate(booking), [booking]);
  const message = useMemo(() => bookingMessage(booking, result), [booking, result]);
  const coachAvailable = input.players <= maxCoachPeople;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_23rem]">
      <div className="rounded-2xl bg-brand-deep/35 p-5 sm:p-7">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="date">
              Tanggal
            </label>
            <input
              id="date"
              type="date"
              className={field}
              value={booking.date}
              min={today}
              onChange={(e) => set("date", e.target.value)}
            />
          </div>

          <div>
            <label className={label} htmlFor="players">
              Jumlah pemain
            </label>
            <select
              id="players"
              className={field}
              value={input.players}
              onChange={(e) => set("players", Number(e.target.value))}
            >
              {PLAYERS.map((p) => (
                <option key={p} value={p}>
                  {p} orang
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={label} htmlFor="hours">
              Durasi
            </label>
            <select
              id="hours"
              className={field}
              value={input.hours}
              onChange={(e) => set("hours", Number(e.target.value))}
            >
              {DURATIONS.map((h) => (
                <option key={h} value={h}>
                  {h} jam
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={label} htmlFor="start">
              Jam mulai
            </label>
            <select
              id="start"
              className={field}
              value={input.startHour}
              onChange={(e) => set("startHour", Number(e.target.value))}
            >
              {startHourOptions(input.hours).map((h) => (
                <option key={h} value={h}>
                  {fmtHour(h)} – {fmtHour(h + input.hours)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={label} htmlFor="rackets">
              Sewa raket
            </label>
            <select
              id="rackets"
              className={field}
              value={input.rackets}
              onChange={(e) => set("rackets", Number(e.target.value))}
            >
              <option value={0}>Tidak perlu</option>
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n} unit
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={label} htmlFor="balls">
              Bola
            </label>
            <select
              id="balls"
              className={field}
              value={input.ballTubes}
              onChange={(e) => set("ballTubes", Number(e.target.value))}
            >
              <option value={0}>Tidak perlu</option>
              {[1, 2].map((n) => (
                <option key={n} value={n}>
                  {n} tube · {rupiah(ballTube.price * n)}
                </option>
              ))}
            </select>
          </div>

          {input.rackets > 0 && (
            <div className="sm:col-span-2">
              <label className={label} htmlFor="tier">
                Tipe raket
              </label>
              <select
                id="tier"
                className={field}
                value={input.racketTierId}
                onChange={(e) => set("racketTierId", e.target.value)}
              >
                {racketTiers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} · mulai dari {rupiah(t.price)}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="sm:col-span-2">
            <label className={label} htmlFor="name">
              Nama <span className="text-cream/25">(opsional)</span>
            </label>
            <input
              id="name"
              type="text"
              className={field}
              placeholder="Nama kamu"
              value={input.name}
              onChange={(e) => set("name", e.target.value)}
            />
          </div>
        </div>

        <label className="mt-6 flex cursor-pointer items-start gap-3.5 rounded-lg bg-cream/10 p-4 transition-colors hover:bg-cream/15">
          <input
            type="checkbox"
            className="mt-0.5 size-5 shrink-0 accent-cream"
            checked={input.withCoach}
            disabled={!coachAvailable}
            onChange={(e) => set("withCoach", e.target.checked)}
          />
          <span className="text-sm">
            <span className="font-bold text-cream">Pakai coach</span>
            <span className="mt-0.5 block text-cream/55">
              {coachAvailable
                ? `${coachRates.find((c) => c.people === input.players)?.label} · sudah termasuk bola & ballboy, belum termasuk lapangan`
                : `Harga coach di pricelist berhenti di ${maxCoachPeople} orang`}
            </span>
          </span>
        </label>
      </div>

      <div className="lg:sticky lg:top-24 lg:h-fit">
        <div className="rounded-2xl bg-cream p-6 text-ink">
          <p className="text-[0.7rem] font-bold tracking-[0.15em] text-ink/40 uppercase">
            Estimasi biaya
          </p>

          <dl className="mt-5 space-y-3.5">
            {result.items.map((item) => (
              <div key={item.label} className="flex items-start justify-between gap-4">
                <dt className="text-sm">
                  <span className="block font-bold">{item.label}</span>
                  <span className="block text-xs leading-relaxed text-ink/45">
                    {item.detail}
                  </span>
                </dt>
                <dd className="shrink-0 text-sm font-bold tabular-nums">
                  {rupiah(item.amount)}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 flex items-baseline justify-between border-t-2 border-ink pt-4">
            <span className="text-sm font-bold text-ink/50">Total</span>
            <span className="text-3xl font-extrabold tracking-tight tabular-nums">
              {rupiah(result.total)}
            </span>
          </div>

          <a
            href={whatsappUrl(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl bg-wa px-4 py-4 font-extrabold text-[#08331a] transition hover:brightness-105 active:scale-[0.99]"
          >
            <WhatsAppIcon />
            Booking via WhatsApp
          </a>

          <p className="mt-3 text-center text-xs text-ink/40">
            Pesan sudah terisi otomatis. Kamu tinggal kirim.
          </p>
        </div>

        <div className="mt-4 space-y-2">
          {result.notes.map((note) => (
            <p key={note} className="rounded-lg bg-cream/10 px-3.5 py-2.5 text-xs leading-relaxed text-cream/60">
              {note}
            </p>
          ))}
          <p className="rounded-lg bg-cream/10 px-3.5 py-2.5 text-xs leading-relaxed text-cream/60">
            Angka ini estimasi, bukan konfirmasi booking. Ketersediaan slot dipastikan
            admin.
          </p>
        </div>
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5 0-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.6-.4z" />
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
    </svg>
  );
}
