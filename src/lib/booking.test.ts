import { test } from "node:test";
import assert from "node:assert/strict";
import {
  bookingMessage,
  courtPrice,
  courtPriceForHour,
  estimate,
  fmtDate,
  fmtHour,
  startHourOptions,
  whatsappUrl,
  type BookingInput,
} from "./booking.ts";

const base: BookingInput = {
  date: "2026-09-06",
  startHour: 19,
  hours: 2,
  players: 4,
  racketTierId: "t1",
  rackets: 0,
  ballTubes: 0,
  withCoach: false,
  name: "Arik",
};

test("harga lapangan dalam satu rate band", () => {
  assert.equal(courtPrice(8, 2), 400_000);
  assert.equal(courtPrice(19, 2), 500_000);
});

test("harga lapangan lintas rate band dihitung per jam", () => {
  // 21.00 Prime (250) + 22.00 Malam (225)
  assert.equal(courtPrice(21, 2), 475_000);
  // 15.00 Pagi (200) + 16-21 Prime (250 x6) + 22-23 Malam (225 x2)
  assert.equal(courtPrice(15, 9), 200_000 + 250_000 * 6 + 225_000 * 2);
});

test("jam di luar operasional ditolak", () => {
  assert.throws(() => courtPriceForHour(7), RangeError);
  assert.throws(() => courtPriceForHour(24), RangeError);
});

test("jam mulai hanya yang muat sebelum tutup", () => {
  assert.deepEqual(startHourOptions(3).at(-1), 21);
  assert.deepEqual(startHourOptions(1).at(-1), 23);
  assert.equal(startHourOptions(1)[0], 8);
});

test("coach ditambahkan di atas harga lapangan, bukan menggantikannya", () => {
  const r = estimate({ ...base, withCoach: true });
  assert.equal(r.total, 500_000 + 350_000 * 2);
  assert.equal(r.items.length, 2);
});

test("bola tidak ditagih dua kali kalau sudah termasuk sesi coach", () => {
  const r = estimate({ ...base, withCoach: true, ballTubes: 1 });
  assert.equal(r.total, 500_000 + 700_000);
  assert.ok(r.notes.some((n) => n.includes("sudah termasuk")));
});

test("bola ditagih kalau tanpa coach", () => {
  assert.equal(estimate({ ...base, ballTubes: 1 }).total, 500_000 + 86_000);
});

test("pemain di atas 6 tidak memakai harga coach mana pun", () => {
  const r = estimate({ ...base, players: 7, withCoach: true });
  assert.equal(r.total, 500_000);
  assert.ok(r.notes.some((n) => n.includes("7 orang")));
});

test("sewa raket dikalikan jumlah unit", () => {
  assert.equal(estimate({ ...base, rackets: 2 }).total, 500_000 + 100_000);
});

test("format jam dan tanggal", () => {
  assert.equal(fmtHour(8), "08.00");
  assert.equal(fmtHour(24), "00.00");
  assert.equal(fmtDate("2026-09-06"), "Minggu, 6 September 2026");
  assert.equal(fmtDate(""), "(belum dipilih)");
});

test("pesan whatsapp memuat tanggal, jam, dan estimasi", () => {
  const msg = bookingMessage(base, estimate(base));
  assert.match(msg, /Minggu, 6 September 2026/);
  assert.match(msg, /19\.00 - 21\.00 \(2 jam\)/);
  assert.match(msg, /Rp500\.000/);
  assert.match(msg, /Arik/);
  assert.ok(whatsappUrl(msg).startsWith("https://wa.me/62882008878838?text="));
  assert.ok(!whatsappUrl(msg).includes("\n"));
});
