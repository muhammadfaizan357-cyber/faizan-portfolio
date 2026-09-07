import fs from 'fs';

const code = fs.readFileSync('framer_main.js', 'utf-8');
const urls = [...code.matchAll(/https:\/\/[^"'\s)]+/g)].map(m => m[0]);
const uniqueUrls = [...new Set(urls)];

console.log('Total URLs found:', uniqueUrls.length);
fs.writeFileSync('framer_urls.json', JSON.stringify(uniqueUrls, null, 2));

// Look for components / routes mapping
const routes = [...code.matchAll(/routes:\s*\{([^}]+)\}/g)].map(m => m[1]);
console.log('Routes match:', routes);

// Look for strings / objects in framer_main.js
const mjs = [...code.matchAll(/\"([^\"]+\.mjs)\"/g)].map(m => m[1]);
console.log('MJS files:', mjs);
