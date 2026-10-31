// Rooms, beds and address. Change them here only.
// ASSUMPTION: Room 1 = beds 1-20, Room 2 = beds 21-40.
export const ROOMS = [
  { id: 1, from: 1, to: 20 },
  { id: 2, from: 21, to: 40 },
];
export const TOTAL_ROOMS = ROOMS.length;
export const TOTAL_BEDS = ROOMS.reduce((sum, r) => sum + r.to - r.from + 1, 0);
export const roomOf = (bed) => ROOMS.find((r) => bed >= r.from && bed <= r.to)?.id ?? 1;

export const ADDRESS = {
  en: 'Basement of the Tole Bi side of the KBTU building',
  ru: 'Подвал здания KBTU со стороны Толе би',
  kk: 'KBTU ғимаратының Төле би жағындағы жертөле',
};
