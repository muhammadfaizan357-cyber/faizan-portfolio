import fs from 'fs';

const html = fs.readFileSync('scraped_dean.html', 'utf-8');

function extractComponent(startStr, endStr, outName) {
  const s = html.indexOf(startStr);
  if (s !== -1) {
    const e = html.indexOf(endStr, s + 100);
    const content = e !== -1 ? html.slice(s, e) : html.slice(s, s + 5000);
    fs.writeFileSync(`scripts/${outName}.html`, content);
    console.log(`Saved scripts/${outName}.html (${content.length} chars)`);
  }
}

extractComponent('data-framer-name="Navigation"', 'data-framer-name="Hero"', 'nav_exact');
extractComponent('data-framer-name="Hero"', 'data-framer-name="Projects"', 'hero_exact');
extractComponent('data-framer-name="Projects"', 'data-framer-name="Tools"', 'projects_exact');
extractComponent('data-framer-name="Tools"', 'data-framer-name="About me"', 'tools_exact');
extractComponent('data-framer-name="About me"', 'data-framer-name="Services"', 'about_exact');
extractComponent('data-framer-name="Services"', 'data-framer-name="Process"', 'services_exact');
extractComponent('data-framer-name="Process"', 'data-framer-name="Call to action"', 'process_exact');
extractComponent('data-framer-name="Call to action"', 'data-framer-name="Testimonial"', 'cta_exact');
extractComponent('data-framer-name="Testimonial"', 'data-framer-name="FAQ"', 'testimonial_exact');
extractComponent('data-framer-name="FAQ"', 'data-framer-name="Contact"', 'faq_exact');
extractComponent('data-framer-name="Contact"', 'data-framer-name="Footer"', 'contact_exact');
extractComponent('data-framer-name="Footer"', '</body>', 'footer_exact');
