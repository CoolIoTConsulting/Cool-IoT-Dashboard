# Cool IoT Dashboard

A small React app (Vite + tsParticles) built to live inside a Home Assistant
dashboard. It gives people a fast way to contact Cool IoT Consulting, browse a
small knowledge base, and play with a particles background.

No backend, no tracking, no external fonts or CDNs.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs ./dist
```

## Embed in Home Assistant

1. Open your dashboard, switch to edit mode and add a **Webpage** card, or
   create a dashboard in panel mode so it fills the whole page.
2. Set the URL to your GitHub Pages address.
3. To get a sidebar entry like "Cool Iot Website": Settings > Dashboards >
   Add dashboard > **Webpage**, then paste the URL and choose an icon.

## Maintenance tips

- Run `npm outdated` now and then, and update with `npm update`.
- Everything is plain React state: no router, no state library, no CSS framework.
- Fonts (Outfit and Inter) are bundled from npm via `@fontsource`, so the site
  makes no requests to third parties.
