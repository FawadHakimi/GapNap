// Accepts +7..., 7..., 8... or 10 digits. Returns "+7 XXX XXX XX XX" or null.
export function normalizePhone(raw) {
  let d = raw.replace(/\D/g, '');
  if (d.length === 11 && (d[0] === '7' || d[0] === '8')) d = d.slice(1);
  if (!/^[2-9]\d{9}$/.test(d)) return null;
  return `+7 ${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 8)} ${d.slice(8, 10)}`;
}
