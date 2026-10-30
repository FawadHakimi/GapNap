export const pad = (n) => String(n).padStart(2, '0');
export const fmtTime = (min) => `${pad(Math.floor(min / 60))}:${pad(min % 60)}`;
export const fmtPrice = (n) => `${n} ₸`;
export function dateKey(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
export function addDays(d, n) {
  const c = new Date(d);
  c.setDate(c.getDate() + n);
  return c;
}
// Intervals [aS, aE) and [bS, bE) conflict if aS < bE AND aE > bS.
// Back-to-back (12:00-12:30 and 12:30-13:00) is allowed because 12:30 < 12:30 is false.
export const overlaps = (aS, aE, bS, bE) => aS < bE && aE > bS;
