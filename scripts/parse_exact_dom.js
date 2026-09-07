import fs from 'fs';

const html = fs.readFileSync('scraped_dean.html', 'utf-8');

// 1. Search for video, canvas, or interactive elements in scraped_dean.html
const videos = [...html.matchAll(/<video[^>]*>([\s\S]*?)<\/video>|<video[^>]*\/>|<video[^>]*>/gi)].map(m => m[0]);
console.log('=== VIDEOS FOUND ===');
console.log(videos);

// 2. Search for all iframe or spline or 3d embeds
const iframes = [...html.matchAll(/<iframe[^>]*>([\s\S]*?)<\/iframe>/gi)].map(m => m[0]);
console.log('=== IFRAMES ===', iframes);

// 3. Search for hero text & avatar container
const heroMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || html.match(/data-framer-name="Hero"[\s\S]*?(?=data-framer-name=")/i);
console.log('=== HERO SECTION EXCERPT ===');
if (heroMatch) {
  console.log(heroMatch[0].slice(0, 1500));
}

// 4. Look for all media URLs (.mp4, .webm, .gif, .png, .webp, .svg)
const media = [...html.matchAll(/https:\/\/framerusercontent\.com\/(?:images|assets|videos)\/[a-zA-Z0-9_\-\.]+/g)].map(m => m[0]);
console.log('=== ALL FRAMER MEDIA URLS ===');
console.log([...new Set(media)]);

// 5. Look for avatar specific tags
const avatarTags = [...html.matchAll(/<div[^>]*data-framer-name="[^"]*(?:Image|Avatar|Photo|Head|Job)[^"]*"[^>]*>[\s\S]*?<\/div>/gi)].map(m => m[0]);
console.log('=== AVATAR / IMAGE TAGS ===');
console.log(avatarTags.slice(0, 5));
