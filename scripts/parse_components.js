import fs from 'fs';

const files = fs.readdirSync('scripts').filter(f => f.endsWith('.mjs'));
console.log('Framer MJS files:', files);

for (const file of files) {
  const content = fs.readFileSync('scripts/' + file, 'utf-8');
  console.log(`\n=== File: ${file} (${content.length} bytes) ===`);

  // Search for text strings
  const stringLiterals = [...content.matchAll(/\"([^\"\n\\]{4,100})\"/g)]
    .map(m => m[1])
    .filter(s => !s.startsWith('data-') && !s.startsWith('framer-') && !s.includes('http') && !s.includes('calc('));
  
  const uniqueStrings = [...new Set(stringLiterals)];
  console.log('Sample strings:', uniqueStrings.slice(0, 25));
}
