import fs from 'fs';

const html = fs.readFileSync('scraped_dean.html', 'utf-8');

// Match <img> tags or background-image / style with images
const imgTags = [...html.matchAll(/<img[^>]+>/gi)].map(m => m[0]);
console.log('Total img tags:', imgTags.length);
imgTags.forEach((tag, i) => console.log(`${i}: ${tag}`));

// Match picture / source tags or styles
const bgImages = [...html.matchAll(/background(?:-image)?:\s*url\(([^)]+)\)/gi)].map(m => m[1]);
console.log('Total bg images:', bgImages.length);
bgImages.forEach((b, i) => console.log(`BG ${i}: ${b}`));

// Match all links
const links = [...html.matchAll(/<a\s+[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi)].map(m => ({
  href: m[1],
  html: m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}));
console.log('\nTotal links:', links.length);
links.forEach((l, i) => console.log(`${i}: [${l.html}] -> ${l.href}`));
