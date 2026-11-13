# Christmas @ Casa Jamal · 2026

Japanese Christmas invitation for December 19, 2026, from 14:00 JST.
Static HTML, CSS, and JavaScript; no runtime dependencies or database.

## Local development

Use Node.js 22 or later. Run `npm run dev`, then visit http://localhost:5173.
Run `npm run build` to create `dist/`, or `npm run preview` to serve that build.

The active site lives in `public/`. `scripts/` contains the dependency-free build
and local server. The legacy Svelte source and assets are retained for reference
but are not included in the build.

## Deployment

`vercel.json` explicitly selects a static build, runs `npm run build`, and serves
`dist/`. The existing GitHub → Vercel connection continues to deploy when changes
reach `main`. No environment variables are required for this invitation.
The Vercel production deployment itself has not been tested from this workspace.

## Features

- Responsive Japanese invitation and original SVG winter scene.
- Canvas snowfall, occasional flying Santa, glowing lights, and chimney smoke.
- Automatic reduced-motion preference support.
- Tap the moon to summon Santa, or the scene to change the lights and create sparkles.
- Catch Santa to drop a present, then tap it to unwrap a random surprise.
- Tap the chimney for Santa's boots; the window cat peeks out and hides when tapped.
- Tap the title five times within a short sequence to switch between normal and 8-bit editions.
- Calendar download for December 19, 2026, 14:00–20:00 Japan time.
- Google Fonts with local rounded sans-serif fallbacks.

## Hidden 8-bit edition

`/8bit` is an unlinked alternate invitation with pixel artwork, pixel fonts,
square snow, and opt-in square/triangle-wave chiptune audio. It keeps the main
page's calendar and interactions. A robots meta tag requests no indexing; this
is an Easter egg, not a private or authenticated page.

`scripts/retro.mjs` generates it from the main invitation so copy stays in sync.
The build emits `dist/8bit.html`, and Vercel rewrites `/8bit` to that file.
