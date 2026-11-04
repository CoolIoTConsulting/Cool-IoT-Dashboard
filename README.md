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

## Where to edit things

| I want to...                         | Edit                          |
| ------------------------------------ | ----------------------------- |
| Change links, email button, socials  | `src/config.js`               |
| Add or edit knowledge base answers   | `src/data/kb.json`            |
| Change colors (dark and light)       | top of `src/styles.css`       |
| Change the articles feed             | `ARTICLES` in `src/config.js` |
| Add/change social links and icons    | `SOCIALS` in `src/config.js`, icons in `src/components/SocialIcons.jsx` |
| Swap the logos                       | `public/logo-dark.png` / `public/logo-light.png` |
| Change particle defaults / palettes  | `src/particleSettings.js`     |

Adding a knowledge base entry is just a new object in `kb.json`:

```json
{ "id": "unique-id", "category": "Tips", "q": "Question?", "a": "Answer." }
```

New categories appear as filter chips automatically.

## Logo, light/dark mode and Playground

- The header is just the logo image (it already contains the name and slogan).
  `logo-dark.png` (white text) shows in dark mode and `logo-light.png` (navy
  text) in light mode. To update them, replace the files in `public/` keeping
  the same names and a transparent background.
- Dark is the default. The round button in the top-right corner switches to
  light mode, and the choice is saved per device in localStorage
  (`cooliot-dashboard:theme`). `index.html` applies it before the page paints, so
  there is no flash.
- The Particles Playground is collapsed by default. The background particles
  keep running with the visitor's saved settings (`cooliot-dashboard:particles`).

## Layout and social icons

Tile order, top to bottom (and on phones): Contact Us, Knowledge Base, Latest
Articles, Stay Connected, Particles Playground. On wider screens they pair up
as `[Contact | Knowledge Base]`, `[Articles | Socials]`, then the full-width
Playground. Tiles in the same row share one height, and the Knowledge Base
list scrolls to fit beside the contact form.

Social icons come from the `simple-icons` npm package (bundled, no external
requests). To add a network, import its icon in `SocialIcons.jsx`, add it to
`BRAND`, then add an entry with the matching `icon` name to `SOCIALS`. The
Nextdoor icon is a simple house glyph because the packaged Nextdoor mark is
only a tiny wordmark.

## Latest Articles feed

The feed reads your WordPress site's built-in REST API
(`https://cooliot.org/wp-json/wp/v2/posts`), straight from the visitor's
browser. No backend or plugin is needed.

- **Test it first:** open `https://cooliot.org/wp-json/wp/v2/posts?per_page=2`
  in a browser. You should see JSON. If you see an error or a login prompt,
  a security plugin or your host is blocking the REST API; allow public read
  access to `wp/v2/posts`.
- The page is served from a different domain (GitHub Pages), and WordPress
  allows that by default. If a security plugin adds stricter CORS rules, the
  tile simply shows "We could not load the latest articles" plus a link to
  your Articles page, and nothing else breaks.
- Only published posts appear. Featured images are used as thumbnails when set.
- Change how many show with `ARTICLES.count` in `src/config.js`.

## Make the contact form work (5 minutes)

A static site cannot send email on its own, so the form uses
[Web3Forms](https://web3forms.com) (free tier, emails go straight to you).

1. Go to web3forms.com, enter the email you want messages sent to, and copy the
   access key they email you.
2. Paste it into `FORM.accessKey` in `src/config.js`.
3. Rebuild/redeploy. Test by sending yourself a message.

The access key is meant to be public, so committing it is fine. The form also
includes a hidden honeypot field to cut spam. Until a key is set, the form
shows a friendly message pointing visitors to the website contact page.

Prefer another service (Formspree, Getform, your own endpoint)? Change
`FORM.endpoint` and the payload in `sendForm()` inside
`src/components/ContactCard.jsx`.

## Host it free on GitHub Pages

1. Create a GitHub repo and push this project to the `main` branch.
2. In the repo go to **Settings > Pages** and set **Source** to **GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) builds and deploys on
   every push to `main`.
4. Your site will be at `https://<user-or-org>.github.io/<repo>/`.

`vite.config.js` uses `base: './'`, so it works at that sub-path with no changes.
A custom domain (for example `hub.cooliot.org`) can be added under Settings > Pages.

## Embed in Home Assistant

1. Open your dashboard, switch to edit mode and add a **Webpage** card, or
   create a dashboard in panel mode so it fills the whole page.
2. Set the URL to your GitHub Pages address.
3. To get a sidebar entry like "Cool Iot Website": Settings > Dashboards >
   Add dashboard > **Webpage**, then paste the URL and choose an icon.

Notes:

- GitHub Pages does not block iframe embedding, unlike the WordPress site.
- If Home Assistant is served over HTTPS (Nabu Casa or a reverse proxy), the
  embedded site must be HTTPS too. GitHub Pages is, so this works.
- Links open in a new tab so they do not get trapped inside the dashboard frame.
- The Playground's saved settings live in the browser's localStorage, per
  device. Some embedded contexts block storage; the app then just falls back to
  defaults without breaking.

## Project layout

```
src/
  App.jsx                    page + bento grid
  config.js                  links, form service
  styles.css                 palette + all styling
  particleSettings.js        slider defaults, palettes, tsParticles options
  data/kb.json               knowledge base content
  hooks/useLocalStorage.js   remembers playground settings
  components/
    ContactCard.jsx
    KnowledgeBase.jsx
    ArticlesFeed.jsx
    ParticlesPlayground.jsx
    ParticlesBackground.jsx
    ThemeToggle.jsx
```

## Maintenance tips

- Run `npm outdated` now and then, and update with `npm update`.
- Everything is plain React state: no router, no state library, no CSS framework.
- Fonts (Outfit and Inter) are bundled from npm via `@fontsource`, so the site
  makes no requests to third parties.
