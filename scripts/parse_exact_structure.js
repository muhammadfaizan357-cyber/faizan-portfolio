import fs from 'fs';

const sections = [
  'nav_exact',
  'hero_exact',
  'projects_exact',
  'tools_exact',
  'about_exact',
  'services_exact',
  'process_exact',
  'cta_exact',
  'testimonial_exact',
  'faq_exact',
  'contact_exact'
];

sections.forEach(sec => {
  const content = fs.readFileSync(`scripts/${sec}.html`, 'utf-8');
  console.log(`\n================== ${sec.toUpperCase()} ==================`);
  
  // Extract SVGs
  const svgs = [...content.matchAll(/<svg[\s\S]*?<\/svg>/gi)].map(m => m[0]);
  console.log(`SVGs count: ${svgs.length}`);
  
  // Extract images
  const imgs = [...content.matchAll(/<img[^>]*src="([^"]+)"[^>]*>/gi)].map(m => m[1]);
  console.log(`Images:`, [...new Set(imgs)]);
  
  // Extract videos
  const vids = [...content.matchAll(/<video[^>]*src="([^"]+)"[^>]*>/gi)].map(m => m[1]);
  console.log(`Videos:`, [...new Set(vids)]);
  
  // Extract text snippets
  const texts = [...content.matchAll(/>([^<]{2,100})</g)].map(m => m[1].trim()).filter(t => t.length > 2 && !t.startsWith('{') && !t.startsWith('var'));
  console.log(`Texts:`, [...new Set(texts)].slice(0, 15));
});
