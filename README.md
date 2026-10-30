# GapNap

Booking and payment site for a university nap room: 12 beds, max 2 hours, no accounts. Payment is simulated; data is kept in localStorage by a fake async API.

## Pages (hash-based, no router library)
- `#/` Home (landing page): hero, how it works, prices, live availability, hours.
- `#/book` Booking and payment (4 steps). `#/book?d=60` opens with that duration chosen (step 1 done).
- `#/find` Find my bill.

Back button and refresh keep you on the same page. Hash links work on GitHub Pages.

## Logo
Replace `src/assets/logo.svg` (used in the header, footer and bill) and `public/logo.svg` (favicon). The iPhone icon is `public/apple-touch-icon.png` (180x180 PNG).
If you use a PNG instead, save it as `src/assets/logo.png` and change the import in `src/components/Logo.jsx`.

## Run locally
```
npm install
npm run dev
```

## Structure
```
src/api        fake API (localStorage)
src/assets     logo
src/components UI components
src/config     prices, hours, beds
src/i18n       EN / RU / KZ dictionaries + context
src/utils      time, phone, hash route, storage migration
src/styles     global.css
```

## Deploy on GitHub Pages
1. Create a GitHub repo and push this folder to branch `main`.
2. Repo Settings > Pages > Source: **GitHub Actions**.
3. Push again. `.github/workflows/deploy.yml` builds and publishes. `base: './'` in `vite.config.js` makes it work under `/repo-name/`.

## Notes
Old "naproom" localStorage data is copied to the new `gapnap_` keys on first load. Old `NR-` booking numbers can still be found; new ones start with `GN-`.
