# Designer Portfolio — Same Layout & Feel as the Reference

Build a bold, big-type designer portfolio that follows the same page structure, flow and interaction style as aboutdean.framer.website, with our own copy, generated visuals and icons (so nothing is lifted from their site).

## Look and feel

- Huge condensed uppercase display headings, light off-white background, black text, one bright cyan accent for buttons and highlights.
- Pill buttons with a soft glow, thin section divider lines with small plus-marks at the corners, generous whitespace.
- Light/dark toggle in the top bar, floating center nav pill (Home / Projects / Services) with social icons on the left.
- Motion: fade/slide-in on scroll, hover lift on cards, marquee strip for the "Services" label, counters that count up.

## Pages

- `/` — Home: hero (greeting pill, giant "GRAPHICS DESIGNER" headline with a cut-out avatar between the words, intro line, CTA), horizontal projects strip, stats row, "My Stack" tool cards, About Me with stats + experience timeline, Services marquee + 4 numbered service cards with product images, 3-step Process, CTA band, Testimonial, FAQ accordion, Contact section (email, phone, socials, booking note), footer.
- `/projects` — grid of all projects with hover reveal.
- `/projects/$slug` — project detail page: cover image, role/year/services meta, overview, image blocks, next-project link.
- `/services` — expanded service descriptions.
- Contact form on the home contact section (client-side validation + success toast; no backend yet).

## Content

Placeholder persona and copy written for the site (name, city, service descriptions, 4 sample projects, testimonial, FAQ answers). Send me your real name, bio, project list, links and photo any time and I'll swap it in.

## Technical notes

- TanStack Start routes: `index.tsx`, `projects.index.tsx`, `projects.$slug.tsx`, `services.tsx`; shared header/footer in `__root.tsx`.
- Design tokens (colors, radii, shadows, display font) added in `src/styles.css`; condensed display + clean sans fonts loaded via `<link>` in the root head.
- Reusable components: nav pill, section header, project card, stat counter, stack card, service card, process step, FAQ accordion (shadcn), testimonial, contact form.
- Motion via `motion/react`; project data in a local typed data module so pages and detail routes share it.
- Per-route `head()` metadata (title, description, og/twitter) and generated images for hero avatar, project covers and service visuals.
