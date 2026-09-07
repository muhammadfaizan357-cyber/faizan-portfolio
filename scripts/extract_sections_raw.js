import fs from 'fs';

const html = fs.readFileSync('scraped_dean.html', 'utf-8');

// Extract everything inside data-framer-name="Hero"
const heroIndex = html.indexOf('data-framer-name="Hero"');
if (heroIndex !== -1) {
  const heroSlice = html.slice(heroIndex - 100, heroIndex + 4000);
  fs.writeFileSync('scripts/hero_raw.html', heroSlice);
  console.log('Saved scripts/hero_raw.html');
}

// Extract everything inside data-framer-name="Projects"
const projIndex = html.indexOf('data-framer-name="Projects"');
if (projIndex !== -1) {
  const projSlice = html.slice(projIndex - 100, projIndex + 4000);
  fs.writeFileSync('scripts/projects_raw.html', projSlice);
  console.log('Saved scripts/projects_raw.html');
}

// Extract everything inside data-framer-name="Call to action"
const ctaIndex = html.indexOf('data-framer-name="Call to action"');
if (ctaIndex !== -1) {
  const ctaSlice = html.slice(ctaIndex - 100, ctaIndex + 4000);
  fs.writeFileSync('scripts/cta_raw.html', ctaSlice);
  console.log('Saved scripts/cta_raw.html');
}
