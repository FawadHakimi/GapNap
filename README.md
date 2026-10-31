# GapNap

Nap room booking for KBTU students: 2 rooms, 40 beds, max 2 hours, no accounts. Payment is simulated; data is kept in localStorage by a fake async API.

## Pages (hash-based, no router library)
- `#/` Home: hero, live availability, features, how it works, prices, address, FAQ.
- `#/book` Booking and payment. `#/book?d=60` opens with that duration chosen.
- `#/find` Find my bill.
- `#/support` Support: contact buttons and a message form. `#/support?b=GN-...` prefills the booking number.

## Config files (edit these)
- `src/config/config.js` prices, working hours, durations.
- `src/config/venue.js` rooms, bed ranges (Room 1 = beds 1-20, Room 2 = 21-40), address in 3 languages.
- `src/config/contacts.js` Telegram, WhatsApp, phone, email. Replace the placeholders. Empty value = button hidden.

## Logo
Replace `src/assets/logo.svg` (header, footer, bill), `public/logo.svg` (favicon) and `public/apple-touch-icon.png` (180x180).

## Run locally
```
npm install
npm run dev
```

## Deploy on GitHub Pages
1. Push this folder to branch `main` of a GitHub repo.
2. Settings > Pages > Source: **GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds and publishes. `base: './'` in `vite.config.js` makes hash links work under `/repo-name/`.

## Notes
Old saved data (12 beds) still loads; demo bookings for all 40 beds are added once. Demo wording for "2 rooms / 40 beds" in Russian assumes those numbers.
