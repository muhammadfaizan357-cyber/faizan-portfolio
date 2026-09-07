import fs from 'fs';

const html = fs.readFileSync('scraped_dean.html', 'utf-8');

// Find all video occurrences with surrounding context
const videoMatches = [...html.matchAll(/(<div[^>]*data-framer-name="[^"]*"[^>]*>[\s\S]{0,300}<video[\s\S]*?<\/video>[\s\S]{0,200}<\/div>)/gi)].map(m => m[0]);

console.log('Total video containers:', videoMatches.length);
videoMatches.forEach((vm, i) => {
  console.log(`\n=== VIDEO ${i+1} ===\n`, vm);
});
