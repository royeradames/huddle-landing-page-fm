# Huddle landing page

An implementation of the [Frontend Mentor Huddle landing page with a single introductory section](https://www.frontendmentor.io/challenges/huddle-landing-page-with-a-single-introductory-section-B_2Wvxgi0), using its supplied logo, illustration, background shapes, copy and design references.

Huddle is a fictional product. **Register** is an honest demo: pressing it says "Demo only: Huddle is a practice design, so nothing is registered or sent." No request is made. The social links open each network's home page in a new tab; there are no Huddle accounts.

## Development

Node 22.13 or later. Use `npm ci`, `npm run dev`, `npm run lint`, `npm run typecheck`, `npm run build`, and `npm test`. Browser tests use installed Chrome and own port 4526.

Next 16.3.6, React 19.2.8, TypeScript 5.9.3 and Tailwind 4.2.1 are pinned to the family baseline. The page is a server component; only the Register notice is a client component.

## Sources

Original challenge files are preserved under `reference/`; supplied images moved byte-for-byte to `public/images/`. Geometry, colours and type come from the decoded Figma frames (Desktop 1440, Desktop Active, Tablet 768, Mobile 375). Poppins 400/600 and Open Sans 400 are self-hosted at build time through `next/font/google`.

The starter ships no social icons. Facebook and Instagram glyphs are drawn inline; the Twitter bird reuses the path from the Frontend Mentor article preview starter's `icon-twitter.svg`.

## Design decisions

- The mobile design sets Register at 12px in a 40px-tall pill and 28px social circles. The family floors raise Register to 16px in a 44px pill and give each social circle a 44px hit area around a 32px ring.
- Hover colours follow the Desktop Active frame: magenta Register with white text, pink social ring and glyph.
- Search identity: the site name "Huddle" is the logo's alt text, `og:site_name` and the `WebSite` JSON-LD name. The canonical URL is the planned production domain `huddle-landing-page-fm.royeradames.com`.
- Mobile and tablet use the supplied mobile background scaled to the viewport width, as the Tablet frame does. The desktop background SVG is 1318px wide and its shapes are drawn in 1440-frame coordinates, so it stays unscaled and anchored to the centred 1440 frame (the pink ring sits behind the phone mockup, as in the design).
