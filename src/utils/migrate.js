// One-time copy of old "naproom." / "naproom_" localStorage data to new "gapnap_" keys.
export function migrateStorage() {
  try {
    Object.keys(localStorage)
      .filter((k) => /^naproom[._]/.test(k))
      .forEach((k) => {
        const next = `gapnap_${k.slice(8).replace(/\./g, '_')}`;
        if (localStorage.getItem(next) === null) localStorage.setItem(next, localStorage.getItem(k));
      });
  } catch { /* storage blocked: nothing to migrate */ }
}
