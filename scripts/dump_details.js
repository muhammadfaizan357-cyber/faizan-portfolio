import fs from 'fs';

const oiz = fs.readFileSync('scripts/OizVdVoNQ.BFqISncD.mjs', 'utf-8');
const f1a = fs.readFileSync('scripts/f1aLcofrw.BKLkWiLd.mjs', 'utf-8');

// Search for all text occurrences in both files
function extractAllTexts(source) {
  const matches = [...source.matchAll(/children:\s*(?:\[|\"|\`)([^\"\`\]]+)(?:\]|\"|\`)/g)].map(m => m[1]);
  return matches;
}

console.log('OIZ length:', oiz.length, 'F1A length:', f1a.length);
fs.writeFileSync('scripts/oiz_dump.txt', oiz);
fs.writeFileSync('scripts/f1a_dump.txt', f1a);

// Look for image definitions, component names, SVGs
const images = [...(oiz + f1a).matchAll(/https:\/\/framerusercontent\.com\/images\/[a-zA-Z0-9_\-\.]+/g)].map(m => m[0]);
console.log('Images in components:', [...new Set(images)]);
