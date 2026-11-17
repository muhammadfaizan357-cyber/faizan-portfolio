import fs from 'fs';

const avatar = fs.readFileSync('src/assets/avatar.png').toString('base64');

// Front SVG: Clean, razor-sharp VIP Developer ID Card with avatar photo, verified badge, chip, and signature typography
const frontSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1440" viewBox="0 0 1024 1440">
  <defs>
    <linearGradient id="frontBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0f1d"/>
      <stop offset="60%" stop-color="#070c18"/>
      <stop offset="100%" stop-color="#02040a"/>
    </linearGradient>
    <linearGradient id="accentCyan" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#10b981"/>
    </linearGradient>
    <linearGradient id="avatarGlow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#06b6d4" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- Deep obsidian backdrop -->
  <rect width="1024" height="1440" fill="url(#frontBg)"/>

  <!-- Sleek borders -->
  <rect x="28" y="28" width="968" height="1384" rx="52" fill="none" stroke="rgba(255,255,255,0.09)" stroke-width="2.5"/>
  <rect x="48" y="48" width="928" height="1344" rx="40" fill="none" stroke="rgba(6,182,212,0.22)" stroke-width="1.5"/>

  <!-- Top Status Bar -->
  <g transform="translate(80, 175)">
    <circle cx="16" cy="16" r="8" fill="#10b981"/>
    <text x="36" y="23" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="800" fill="#10b981" letter-spacing="4">VERIFIED CREATOR PASS</text>
    <text x="864" y="23" text-anchor="end" font-family="monospace" font-size="20" font-weight="700" fill="rgba(255,255,255,0.45)">#DEV-2026</text>
  </g>

  <!-- Main Avatar Photo Container -->
  <g transform="translate(80, 235)">
    <rect width="864" height="885" rx="36" fill="#030712" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>
    <rect width="864" height="885" rx="36" fill="url(#avatarGlow)"/>
    <!-- Centered HD Avatar Image -->
    <image href="data:image/png;base64,${avatar}" x="72" y="15" width="720" height="855" preserveAspectRatio="xMidYMid meet"/>
    <!-- Floating status pill over photo -->
    <rect x="44" y="775" width="370" height="66" rx="20" fill="rgba(10,15,29,0.88)" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
    <circle cx="76" cy="808" r="8" fill="#06b6d4"/>
    <text x="98" y="815" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="800" fill="#ffffff" letter-spacing="2">AVAILABLE FOR HIRE</text>
  </g>

  <!-- Footer Information -->
  <g transform="translate(80, 1175)">
    <text x="0" y="48" font-family="system-ui, -apple-system, sans-serif" font-size="54" font-weight="900" fill="#ffffff" letter-spacing="-1">MUHAMMAD FAIZAN</text>
    <text x="0" y="102" font-family="system-ui, -apple-system, sans-serif" font-size="26" font-weight="700" fill="url(#accentCyan)" letter-spacing="3">FULL-STACK WEB ARCHITECT</text>
    <text x="0" y="150" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="500" fill="rgba(255,255,255,0.5)">Laravel • PHP • React • Next.js • Cloud Architecture</text>
    
    <!-- Smart Microchip Accent -->
    <g transform="translate(715, 25)">
      <rect width="148" height="106" rx="18" fill="rgba(255,255,255,0.03)" stroke="rgba(6,182,212,0.45)" stroke-width="2"/>
      <line x1="38" y1="28" x2="110" y2="28" stroke="rgba(6,182,212,0.6)" stroke-width="2"/>
      <line x1="38" y1="53" x2="110" y2="53" stroke="rgba(6,182,212,0.6)" stroke-width="2"/>
      <line x1="38" y1="78" x2="110" y2="78" stroke="rgba(6,182,212,0.6)" stroke-width="2"/>
      <circle cx="74" cy="53" r="16" fill="none" stroke="#06b6d4" stroke-width="2"/>
    </g>
  </g>
</svg>`;

// Back SVG: Replaced the circle monogram "MF" with Muhammad Faizan's avatar photo inside a clean glowing lens!
let barcodes = '';
for (let i = 0; i < 64; i++) {
  const x = 20 + i * 11.8;
  const w = i % 3 === 0 ? 5 : i % 2 === 0 ? 3 : 1.5;
  const alpha = 0.5 + (i % 5) * 0.1;
  barcodes += `<rect x="${x}" y="10" width="${w}" height="44" fill="rgba(255,255,255,${alpha})"/>`;
}

const backSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1440" viewBox="0 0 1024 1440">
  <defs>
    <linearGradient id="backBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0f1d"/>
      <stop offset="60%" stop-color="#070c18"/>
      <stop offset="100%" stop-color="#02040a"/>
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#10b981"/>
    </linearGradient>
    <clipPath id="circlePhotoClip">
      <circle cx="512" cy="380" r="145"/>
    </clipPath>
  </defs>

  <!-- Deep obsidian background -->
  <rect width="1024" height="1440" fill="url(#backBg)"/>
  <rect x="28" y="28" width="968" height="1384" rx="52" fill="none" stroke="rgba(255,255,255,0.09)" stroke-width="2.5"/>
  <rect x="48" y="48" width="928" height="1344" rx="40" fill="none" stroke="rgba(6,182,212,0.22)" stroke-width="1.5"/>

  <!-- Back Side Photo Portal (Aapki Image circular glowing frame me!) -->
  <!-- Outer glowing rings -->
  <circle cx="512" cy="380" r="162" fill="none" stroke="url(#accentGrad)" stroke-width="3" opacity="0.6"/>
  <circle cx="512" cy="380" r="150" fill="rgba(6,182,212,0.12)" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
  
  <!-- Image clipped inside circle -->
  <g clip-path="url(#circlePhotoClip)">
    <rect x="360" y="225" width="304" height="310" fill="#030712"/>
    <image href="data:image/png;base64,${avatar}" x="362" y="228" width="300" height="310" preserveAspectRatio="xMidYMid meet"/>
  </g>
  <!-- Inner ring highlight -->
  <circle cx="512" cy="380" r="145" fill="none" stroke="url(#accentGrad)" stroke-width="3.5"/>

  <!-- Title & Access Level -->
  <g transform="translate(512, 595)" text-anchor="middle">
    <text x="0" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="900" fill="#ffffff" letter-spacing="6">SECURITY CLEARANCE</text>
    <text x="0" y="46" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="700" fill="#10b981" letter-spacing="8">LEVEL 5 // SENIOR ARCHITECT</text>
    <line x1="-300" y1="90" x2="300" y2="90" stroke="rgba(255,255,255,0.14)" stroke-width="1.5"/>
  </g>

  <!-- Clean Specs Grid (Crisp high-contrast typography) -->
  <g transform="translate(110, 770)">
    <text x="0" y="0" font-family="monospace" font-size="20" font-weight="700" fill="rgba(255,255,255,0.4)" letter-spacing="2">CORE STACK</text>
    <text x="0" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="800" fill="#ffffff">Laravel 11 • PHP 8.3 • React</text>

    <text x="0" y="115" font-family="monospace" font-size="20" font-weight="700" fill="rgba(255,255,255,0.4)" letter-spacing="2">DATABASE &amp; CACHE</text>
    <text x="0" y="153" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="800" fill="#ffffff">MySQL • PostgreSQL • Redis</text>

    <text x="0" y="230" font-family="monospace" font-size="20" font-weight="700" fill="rgba(255,255,255,0.4)" letter-spacing="2">ARCHITECTURE SPECIALTY</text>
    <text x="0" y="268" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="800" fill="#06b6d4">High-Throughput APIs • Clean Architecture</text>

    <text x="0" y="345" font-family="monospace" font-size="20" font-weight="700" fill="rgba(255,255,255,0.4)" letter-spacing="2">DIRECT CONTACT</text>
    <text x="0" y="383" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="800" fill="#10b981">contact@muhammadfaizan.dev</text>
  </g>

  <!-- High-Tech Barcode Strip -->
  <g transform="translate(110, 1260)">
    <rect width="804" height="66" fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" rx="10"/>
    <g transform="translate(10, 0)">
      ${barcodes}
    </g>
  </g>
</svg>`;

fs.writeFileSync('src/assets/card-front.svg', frontSvg);
fs.writeFileSync('src/assets/card-back.svg', backSvg);
console.log('Regenerated ultra-clean badge SVGs with back photo!');
