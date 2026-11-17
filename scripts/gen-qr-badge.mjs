import https from 'https';
import fs from 'fs';

function fetchSvg(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    });
  });
}

async function run() {
  const qrSvgRaw = await fetchSvg('https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=https://wa.me/923022679431&format=svg&color=10b981&bgcolor=00000000');
  
  // Extract content inside <svg>...</svg>
  const innerMatch = qrSvgRaw.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
  const innerQr = innerMatch ? innerMatch[1] : '';

  const avatar = fs.readFileSync('src/assets/avatar.png').toString('base64');

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
      <circle cx="512" cy="340" r="135"/>
    </clipPath>
  </defs>

  <!-- Deep obsidian background -->
  <rect width="1024" height="1440" fill="url(#backBg)"/>
  <rect x="28" y="28" width="968" height="1384" rx="52" fill="none" stroke="rgba(255,255,255,0.09)" stroke-width="2.5"/>
  <rect x="48" y="48" width="928" height="1344" rx="40" fill="none" stroke="rgba(6,182,212,0.22)" stroke-width="1.5"/>

  <!-- Back Side Photo Portal (Aapki Image circular glowing lens me) -->
  <circle cx="512" cy="340" r="150" fill="none" stroke="url(#accentGrad)" stroke-width="3" opacity="0.6"/>
  <circle cx="512" cy="340" r="140" fill="rgba(6,182,212,0.12)" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
  
  <g clip-path="url(#circlePhotoClip)">
    <rect x="370" y="195" width="285" height="295" fill="#030712"/>
    <image href="data:image/png;base64,${avatar}" x="370" y="195" width="285" height="295" preserveAspectRatio="xMidYMid meet"/>
  </g>
  <circle cx="512" cy="340" r="135" fill="none" stroke="url(#accentGrad)" stroke-width="3.5"/>

  <!-- Name & Professional Title (Security Clearance removed!) -->
  <g transform="translate(512, 530)" text-anchor="middle">
    <text x="0" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="900" fill="#ffffff" letter-spacing="2">MUHAMMAD FAIZAN</text>
    <text x="0" y="42" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="700" fill="#10b981" letter-spacing="4">FULL-STACK DEVELOPER</text>
    <line x1="-300" y1="80" x2="300" y2="80" stroke="rgba(255,255,255,0.14)" stroke-width="1.5"/>
  </g>

  <!-- Clean Specs Grid -->
  <g transform="translate(110, 675)">
    <text x="0" y="0" font-family="monospace" font-size="18" font-weight="700" fill="rgba(255,255,255,0.4)" letter-spacing="2">PRIMARY STACK</text>
    <text x="0" y="34" font-family="system-ui, -apple-system, sans-serif" font-size="30" font-weight="800" fill="#ffffff">Laravel 11 • PHP 8.3 • React</text>

    <text x="0" y="102" font-family="monospace" font-size="18" font-weight="700" fill="rgba(255,255,255,0.4)" letter-spacing="2">DATABASE &amp; ARCHITECTURE</text>
    <text x="0" y="136" font-family="system-ui, -apple-system, sans-serif" font-size="30" font-weight="800" fill="#ffffff">MySQL • PostgreSQL • Redis • APIs</text>

    <text x="0" y="204" font-family="monospace" font-size="18" font-weight="700" fill="rgba(255,255,255,0.4)" letter-spacing="2">DIRECT EMAIL</text>
    <text x="0" y="238" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="800" fill="#10b981">contact@muhammadfaizan.dev</text>
  </g>

  <!-- Bottom WhatsApp QR Code Card Container -->
  <g transform="translate(110, 1010)">
    <!-- QR Card Container -->
    <rect width="804" height="310" rx="28" fill="rgba(10,18,34,0.92)" stroke="rgba(16,185,129,0.4)" stroke-width="2"/>
    
    <!-- QR Code on Left -->
    <g transform="translate(35, 30)">
      <rect width="250" height="250" rx="20" fill="#030712" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
      <!-- Inner QR Code -->
      <g transform="translate(20, 20) scale(0.8)">
        ${innerQr}
      </g>
    </g>

    <!-- WhatsApp Details on Right -->
    <g transform="translate(325, 80)">
      <g transform="translate(0, 0)">
        <circle cx="28" cy="28" r="28" fill="rgba(16,185,129,0.15)"/>
        <!-- WhatsApp Phone Icon -->
        <path d="M28 12C19.16 12 12 19.16 12 28C12 31.02 12.84 33.86 14.31 36.31L12.5 43.5L19.83 41.75C22.16 43.1 24.94 43.86 28 43.86C36.84 43.86 44 36.69 44 27.86C44 19.03 36.84 12 28 12Z" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="70" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="900" fill="#ffffff" letter-spacing="1">WHATSAPP QR</text>
      </g>

      <text x="0" y="110" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="800" fill="#10b981" letter-spacing="1">+92 302 2679431</text>
      <text x="0" y="150" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="600" fill="rgba(255,255,255,0.5)">Scan code to chat instantly on WhatsApp</text>
    </g>
  </g>
</svg>`;

  fs.writeFileSync('src/assets/card-back.svg', backSvg);
  console.log('card-back.svg updated: Security Clearance removed, replaced with MUHAMMAD FAIZAN - FULL-STACK DEVELOPER!');
}

run();
