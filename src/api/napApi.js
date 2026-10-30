import { BEDS, OPEN, CLOSE, PRICES, HOLD_SECONDS } from '../config/config';
import { addDays, dateKey, overlaps } from '../utils/time';
import { normalizePhone } from '../utils/phone';

const KEY = 'gapnap_data_v1';
const wait = () => new Promise((r) => setTimeout(r, 400 + Math.random() * 500));

function conflicts(db, { bed, date, start, duration }, ignoreHoldId) {
  const end = start + duration;
  const now = Date.now();
  const hit = (x) => x.bed === bed && x.date === date && overlaps(start, end, x.start, x.start + x.duration);
  return db.bookings.some(hit) || db.holds.some((h) => h.expires > now && h.id !== ignoreHoldId && hit(h));
}

function bookingNumber(db, date) {
  db.counter += 1;
  return `GN-${date.replace(/-/g, '')}-${String(db.counter).padStart(4, '0')}`;
}

function seed() {
  const names = ['Aigerim', 'Daniyar', 'Madina', 'Ahmad', 'Alina', 'Timur', 'Dana', 'Arman'];
  const db = { bookings: [], holds: [], counter: 0 };
  for (let day = 0; day < 7; day++) {
    for (let i = 0; i < 5; i++) {
      const date = dateKey(addDays(new Date(), day));
      const duration = [30, 60, 120][(day + i) % 3];
      const start = OPEN + ((day * 3 + i * 5) % 14) * 30;
      const bed = ((day * 5 + i * 3) % BEDS) + 1;
      const b = { bed, date, start, duration };
      if (start + duration > CLOSE || conflicts(db, b)) continue;
      const number = bookingNumber(db, date);
      db.bookings.push({
        ...b,
        id: `S${db.counter}`,
        number,
        name: names[(day + i) % names.length],
        phone: `+7 701 555 ${String(10 + db.counter).padStart(2, '0')} 00`,
        amount: PRICES[duration],
        paidAt: new Date().toISOString(),
      });
    }
  }
  return db;
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* fall through to seed */ }
  const db = seed();
  save(db);
  return db;
}
function save(db) {
  try { localStorage.setItem(KEY, JSON.stringify(db)); } catch { /* storage full or blocked */ }
}

// Returns only anonymous data: bed + time. Active holds look like bookings.
export async function getBookings(date) {
  await wait();
  const db = load();
  const now = Date.now();
  return [...db.bookings, ...db.holds.filter((h) => h.expires > now)]
    .filter((x) => x.date === date)
    .map(({ id, bed, start, duration }) => ({ id, bed, start, duration }));
}

export async function holdBed({ bed, date, start, duration }) {
  await wait();
  const db = load();
  if (conflicts(db, { bed, date, start, duration })) throw new Error('conflict');
  const hold = {
    id: `H${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`.toUpperCase(),
    bed, date, start, duration,
    expires: Date.now() + HOLD_SECONDS * 1000,
  };
  db.holds = db.holds.filter((h) => h.expires > Date.now()).concat(hold);
  save(db);
  return hold;
}

export async function releaseHold(holdId) {
  await wait();
  const db = load();
  db.holds = db.holds.filter((h) => h.id !== holdId);
  save(db);
}

export async function createBooking({ holdId, bed, date, start, duration, name, phone }) {
  await wait();
  if (Math.random() < 0.05) throw new Error('random'); // simulated rare failure
  const db = load();
  if (conflicts(db, { bed, date, start, duration }, holdId)) throw new Error('conflict');
  db.holds = db.holds.filter((h) => h.id !== holdId);
  const booking = {
    id: `B${Date.now().toString(36)}`.toUpperCase(),
    number: bookingNumber(db, date),
    bed, date, start, duration, name, phone,
    amount: PRICES[duration],
    paidAt: new Date().toISOString(),
  };
  db.bookings.push(booking);
  save(db);
  return booking;
}

export async function findBooking(phone, number) {
  await wait();
  const p = normalizePhone(phone);
  const n = number.trim().toUpperCase();
  return load().bookings.find((b) => b.phone === p && b.number === n) ?? null;
}
