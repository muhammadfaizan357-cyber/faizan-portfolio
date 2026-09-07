import https from 'https';
import fs from 'fs';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function main() {
  const mainScript = await fetchUrl('https://framerusercontent.com/sites/3sFOKpq5a8X3zPzw7nc3tv/script_main.CRKZSgMn.mjs');
  fs.writeFileSync('framer_main.js', mainScript);
  console.log('framer_main.js saved, length:', mainScript.length);

  // Extract all imported modules
  const importUrls = [...mainScript.matchAll(/https:\/\/framerusercontent\.com\/modules\/[a-zA-Z0-9_\-\.\/]+/g)].map(m => m[0]);
  const uniqueImports = [...new Set(importUrls)];
  console.log('Found chunk modules:', uniqueImports.length);
  fs.writeFileSync('framer_chunks.json', JSON.stringify(uniqueImports, null, 2));

  // Let's fetch the main page chunks
  for (const url of uniqueImports) {
    try {
      const code = await fetchUrl(url);
      const filename = url.split('/').pop();
      fs.writeFileSync(`scripts/chunk_${filename}.js`, code);
    } catch (e) {
      console.error('Error fetching', url, e.message);
    }
  }
  console.log('Fetched all chunks!');
}

main();
