import fs from "node:fs";
import path from "node:path";

// Generates a 32x32 32-bit BGRA .ico file with dark #080c14 rounded badge and blue/cyan "F" logo
const W = 32;
const H = 32;
const pixels = Buffer.alloc(W * H * 4);

function setPixel(x, y, r, g, b, a = 255) {
  if (x < 0 || x >= W || y < 0 || y >= H) return;
  // ICO BMP rows are bottom-to-top
  const row = H - 1 - y;
  const idx = (row * W + x) * 4;
  pixels[idx] = b;
  pixels[idx + 1] = g;
  pixels[idx + 2] = r;
  pixels[idx + 3] = a;
}

// 1. Rounded square background (#080c14) with royal blue border
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const rx = x < 6 ? 6 - x : x > W - 7 ? x - (W - 7) : 0;
    const ry = y < 6 ? 6 - y : y > H - 7 ? y - (H - 7) : 0;
    const dist = Math.hypot(rx, ry);
    if (dist > 6.2) {
      setPixel(x, y, 0, 0, 0, 0);
    } else if (dist > 4.6 || x === 0 || x === W - 1 || y === 0 || y === H - 1) {
      setPixel(x, y, 59, 130, 246, 255); // #3b82f6 border
    } else {
      setPixel(x, y, 8, 12, 20, 255); // #080c14 dark navy fill
    }
  }
}

// 2. Draw slanted geometric "F" monogram in blue->cyan gradient
for (let y = 7; y <= 25; y++) {
  const t = (y - 7) / 18;
  const r = Math.round(59 * (1 - t) + 6 * t);
  const g = Math.round(130 * (1 - t) + 182 * t);
  const b = Math.round(246 * (1 - t) + 212 * t);
  const slant = Math.round((25 - y) * 0.22);

  for (let x = 7; x <= 24; x++) {
    const sx = x - slant;
    const inStem = sx >= 7 && sx <= 11;
    const inTopBar = y >= 7 && y <= 11 && sx >= 7 && sx <= 22;
    const inMidBar = y >= 15 && y <= 18 && sx >= 7 && sx <= 19;
    if (inStem || inTopBar || inMidBar) {
      setPixel(x, y, r, g, b, 255);
    }
  }
}

const andMask = Buffer.alloc((W * H) / 8, 0);
const bmpHeader = Buffer.alloc(40);
bmpHeader.writeUInt32LE(40, 0);
bmpHeader.writeInt32LE(W, 4);
bmpHeader.writeInt32LE(H * 2, 8);
bmpHeader.writeUInt16LE(1, 12);
bmpHeader.writeUInt16LE(32, 14);
bmpHeader.writeUInt32LE(0, 16);
bmpHeader.writeUInt32LE(pixels.length + andMask.length, 20);

const imageData = Buffer.concat([bmpHeader, pixels, andMask]);
const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0);
icoHeader.writeUInt16LE(1, 2);
icoHeader.writeUInt16LE(1, 4);

const dirEntry = Buffer.alloc(16);
dirEntry.writeUInt8(W, 0);
dirEntry.writeUInt8(H, 1);
dirEntry.writeUInt8(0, 2);
dirEntry.writeUInt8(0, 3);
dirEntry.writeUInt16LE(1, 4);
dirEntry.writeUInt16LE(32, 6);
dirEntry.writeUInt32LE(imageData.length, 8);
dirEntry.writeUInt32LE(22, 12);

const icoBuffer = Buffer.concat([icoHeader, dirEntry, imageData]);
fs.writeFileSync(path.resolve("public/favicon.ico"), icoBuffer);
console.log("Generated custom F logo public/favicon.ico:", icoBuffer.length, "bytes");
