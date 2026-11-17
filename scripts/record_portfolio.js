import puppeteer from 'puppeteer-core';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const FFMPEG_PATH = 'C:\\Users\\Zeeshan Ahmed\\AppData\\Local\\Python\\pythoncore-3.14-64\\Lib\\site-packages\\imageio_ffmpeg\\binaries\\ffmpeg-win-x86_64-v7.1.exe';
const OUTPUT_MP4 = path.resolve('public/portfolio-walkthrough.mp4');
const ROOT_MP4 = path.resolve('portfolio-walkthrough.mp4');

const FPS = 20; // 20 frames per second for smooth, high quality playback
const WIDTH = 1920;
const HEIGHT = 1080;

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// Ease function for smooth cinematic scrolling
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

async function record() {
  console.log('Starting Portfolio Recording...');
  console.log(`Chrome: ${CHROME_PATH}`);
  console.log(`FFmpeg: ${FFMPEG_PATH}`);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: [
      `--window-size=${WIDTH},${HEIGHT}`,
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--hide-scrollbars',
      '--disable-notifications'
    ],
    defaultViewport: {
      width: WIDTH,
      height: HEIGHT,
      deviceScaleFactor: 1
    }
  });

  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT });

  console.log('Navigating to http://localhost:8080/ ...');
  await page.goto('http://localhost:8080/', { waitUntil: 'networkidle0', timeout: 30000 });
  await sleep(2000); // Wait for initial intro animations and ShapeGrid to draw

  // Spawn ffmpeg to encode screenshots on the fly
  const ffmpegArgs = [
    '-y',
    '-f', 'image2pipe',
    '-vcodec', 'mjpeg',
    '-framerate', String(FPS),
    '-i', '-',
    '-c:v', 'libx264',
    '-preset', 'fast',
    '-crf', '20',
    '-pix_fmt', 'yuv420p',
    OUTPUT_MP4
  ];

  const ffmpeg = spawn(FFMPEG_PATH, ffmpegArgs, { stdio: ['pipe', 'inherit', 'inherit'] });

  ffmpeg.on('error', err => {
    console.error('FFmpeg process error:', err);
  });

  let frameCount = 0;

  async function captureFrame() {
    const buffer = await page.screenshot({ type: 'jpeg', quality: 85 });
    if (!ffmpeg.stdin.destroyed) {
      ffmpeg.stdin.write(buffer);
      frameCount++;
    }
  }

  async function captureFramesForDuration(seconds, onTick) {
    const totalFrames = Math.round(seconds * FPS);
    for (let f = 0; f < totalFrames; f++) {
      if (onTick) {
        await onTick(f / totalFrames);
      }
      await captureFrame();
    }
  }

  // Smooth scroll helper
  async function smoothScroll(fromY, toY, seconds, onProgress) {
    const totalFrames = Math.round(seconds * FPS);
    for (let f = 0; f < totalFrames; f++) {
      const progress = easeInOutQuad(f / totalFrames);
      const currentY = fromY + (toY - fromY) * progress;
      await page.evaluate(y => window.scrollTo(0, y), currentY);
      if (onProgress) {
        await onProgress(progress, currentY);
      }
      await captureFrame();
    }
    await page.evaluate(y => window.scrollTo(0, y), toY);
  }

  console.log('=== Step 1: Hero Section & ShapeGrid Interaction ===');
  // Move mouse across hero to trigger ShapeGrid glow and interactive cascade
  await captureFramesForDuration(4, async (p) => {
    const mouseX = 400 + Math.sin(p * Math.PI * 2) * 350;
    const mouseY = 350 + Math.cos(p * Math.PI * 2) * 150;
    await page.mouse.move(mouseX, mouseY);
  });

  // Click cascade test in Hero
  await page.mouse.click(650, 420);
  await captureFramesForDuration(1.5);

  console.log('=== Step 2: Smooth Scroll to About Section ===');
  await smoothScroll(0, 950, 3, async (p) => {
    await page.mouse.move(500 + p * 200, 400);
  });
  await captureFramesForDuration(2);

  console.log('=== Step 3: Smooth Scroll to Skills & Technologies (Bento & AI Bg) ===');
  // Find skills section offset
  const skillsY = await page.evaluate(() => {
    const el = document.getElementById('stack') || document.getElementById('skills');
    return el ? el.offsetTop - 50 : 1850;
  });

  await smoothScroll(950, skillsY, 3.5);
  await captureFramesForDuration(1);

  // Hover over iPhone glassmorphic skill cards
  const skillPositions = [
    { x: 750, y: 350 }, // Frontend (Angular/React)
    { x: 920, y: 350 }, // React
    { x: 1100, y: 350 }, // Tools (Git)
    { x: 750, y: 520 }, // Backend (Laravel/PHP)
    { x: 920, y: 520 }, // Node.js
    { x: 380, y: 520 }  // Download CV button
  ];

  for (const pos of skillPositions) {
    await page.mouse.move(pos.x, pos.y);
    await captureFramesForDuration(0.8);
  }
  await captureFramesForDuration(1.5);

  console.log('=== Step 4: Smooth Scroll to Featured Projects ===');
  const projectsY = await page.evaluate(() => {
    const el = document.getElementById('projects');
    return el ? el.offsetTop - 50 : 2800;
  });
  await smoothScroll(skillsY, projectsY, 3);
  await captureFramesForDuration(2.5);

  console.log('=== Step 5: Smooth Scroll to Services & Process ===');
  const servicesY = await page.evaluate(() => {
    const el = document.getElementById('services');
    return el ? el.offsetTop - 50 : 3800;
  });
  await smoothScroll(projectsY, servicesY, 3);
  await captureFramesForDuration(2);

  console.log('=== Step 6: Smooth Scroll to Contact Section ===');
  const contactY = await page.evaluate(() => {
    const el = document.getElementById('contact');
    return el ? el.offsetTop - 50 : 4900;
  });
  await smoothScroll(servicesY, contactY, 3);
  await captureFramesForDuration(2.5);

  console.log('=== Step 7: Toggle Theme (Demonstrating Dual Theme) ===');
  // Scroll back to top to showcase Hero & Skills in Light Mode
  await smoothScroll(contactY, 0, 3.5);
  await captureFramesForDuration(1);

  // Click theme toggle button in header
  const toggled = await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label*="theme" i]') || document.querySelector('button[aria-label*="colour" i]');
    if (btn) {
      btn.click();
      return true;
    }
    document.documentElement.classList.toggle('dark');
    return false;
  });
  console.log('Theme toggled:', toggled);
  await captureFramesForDuration(2.5);

  // Move mouse across light mode ShapeGrid in Hero
  await captureFramesForDuration(2.5, async (p) => {
    const mouseX = 500 + Math.sin(p * Math.PI * 2) * 300;
    const mouseY = 380 + Math.cos(p * Math.PI * 2) * 120;
    await page.mouse.move(mouseX, mouseY);
  });

  // Scroll down to Skills in Light Mode to show light mode AI background and glassmorphic cards
  await smoothScroll(0, skillsY, 3);
  await captureFramesForDuration(2.5);

  console.log('Finished capturing frames! Total frames recorded:', frameCount);

  // End ffmpeg stream
  ffmpeg.stdin.end();

  await new Promise((resolve) => {
    ffmpeg.on('close', resolve);
  });

  await browser.close();

  // Copy to root directory as well for easy user access
  if (fs.existsSync(OUTPUT_MP4)) {
    fs.copyFileSync(OUTPUT_MP4, ROOT_MP4);
    const stats = fs.statSync(OUTPUT_MP4);
    console.log(`Video recorded successfully! Size: ${(stats.size / (1024 * 1024)).toFixed(2)} MB`);
    console.log(`Saved at: ${OUTPUT_MP4}`);
    console.log(`Saved at: ${ROOT_MP4}`);
  }
}

record().catch(err => {
  console.error('Recording failed:', err);
  process.exit(1);
});
