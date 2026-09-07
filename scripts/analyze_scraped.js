import fs from 'fs';

const html = fs.readFileSync('scraped_dean.html', 'utf-8');

// 1. Check sections & headings
console.log('=== SECTIONS & TITLES ===');
const headings = [...html.matchAll(/<(h[1-6]|p|span|div)[^>]*class="[^"]*framer-[^"]*"[^>]*>([\s\S]*?)<\/\1>/gi)]
  .map(m => m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
  .filter(t => t.length > 3 && t.length < 80);

const uniqueHeadings = [...new Set(headings)];
fs.writeFileSync('extracted_headings.json', JSON.stringify(uniqueHeadings, null, 2));

// 2. Search for Framer data/props
const scriptSources = [...html.matchAll(/src="([^"]+\.mjs)"/gi)].map(m => m[1]);
console.log('Script MJS sources:', scriptSources);

// 3. Extract all text nodes hierarchy
console.log('Done initial extraction.');
