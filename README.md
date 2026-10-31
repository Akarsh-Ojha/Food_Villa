# Restaurant WhatsApp Ordering (React + Tailwind + Framer Motion + react-icons)

    npm install
    npm run dev       # local dev server
    npm run build     # production build in /dist (static, host anywhere)

**Set your WhatsApp number** in `src/config.js` → `WHATSAPP_NUMBER` (country code + number, digits only, no "+").
Menu, categories, prices and restaurant name are in the same file. Add `img: "https://…"` to show real photos.
Hindi/English text lives in `src/i18n.js`. Routing uses HashRouter, so it works on any static host.
