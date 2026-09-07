import fs from 'fs';

const html = fs.readFileSync('scraped_dean.html', 'utf-8');
const oiz = fs.existsSync('scripts/oiz_dump.txt') ? fs.readFileSync('scripts/oiz_dump.txt', 'utf-8') : '';

console.log('=== SCRAPED HTML METADATA ===');
// Match title and meta tags
const title = html.match(/<title>([^<]+)<\/title>/i)?.[1];
console.log('Title:', title);

// Match all fonts used
const fontLinks = [...html.matchAll(/fonts\.(?:googleapis|gstatic)\.com[^\s"']+/g)].map(m => m[0]);
console.log('Fonts:', [...new Set(fontLinks)]);

// Match CSS custom properties or colors
const colors = [...html.matchAll(/#(?:[0-9a-fA-F]{3}){1,2}|rgba?\([^)]+\)/g)].map(m => m[0]);
console.log('Sample Colors:', [...new Set(colors)].slice(0, 30));

// Extract all data-framer components or main structures
const framerNames = [...html.matchAll(/data-framer-name="([^"]+)"/g)].map(m => m[1]);
console.log('Framer Component Names:', [...new Set(framerNames)]);

fs.writeFileSync('scripts/extracted_framer_names.json', JSON.stringify([...new Set(framerNames)], null, 2));
