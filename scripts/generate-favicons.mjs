import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/**
 * Generator favicon Craftivation (mengikuti pola Arsalynk).
 * Jalankan: node scripts/generate-favicons.mjs
 *
 * Sumber: public/assets/icon-craftivation.svg (glyph "C" gradient magenta).
 * Google mewajibkan favicon kelipatan 48px (48, 96, 144, 192) — karena itu
 * 48/96/192 dibuat eksplisit, plus ICO multi-frame, Apple touch icon, dan PWA 512.
 */
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");
const appDir = path.join(rootDir, "app");

// Glyph menempati x 18–37, y 10–46 pada viewBox 56x56 (kecil & banyak ruang kosong).
// Crop persegi di sekitar glyph agar tampil besar & terbaca pada ukuran 16–48px.
const GLYPH_CENTER_X = 27.5;
const GLYPH_CENTER_Y = 28;
const CROP_SIDE = 42; // tinggi glyph 36 + margin optis ±8% (aman dari circle-crop SERP)

function buildSvg(source) {
  const x = GLYPH_CENTER_X - CROP_SIDE / 2;
  const y = GLYPH_CENTER_Y - CROP_SIDE / 2;
  return source
    .replace(/width="56"\s+height="56"/, `width="${CROP_SIDE}" height="${CROP_SIDE}"`)
    .replace(/viewBox="0 0 56 56"/, `viewBox="${x} ${y} ${CROP_SIDE} ${CROP_SIDE}"`);
}

function createIco(frames) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(frames.length, 4);

  let offset = 6 + 16 * frames.length;
  const entries = frames.map(({ size, buffer }) => {
    const dir = Buffer.alloc(16);
    dir.writeUInt8(size >= 256 ? 0 : size, 0);
    dir.writeUInt8(size >= 256 ? 0 : size, 1);
    dir.writeUInt16LE(1, 4);
    dir.writeUInt16LE(32, 6);
    dir.writeUInt32LE(buffer.length, 8);
    dir.writeUInt32LE(offset, 12);
    offset += buffer.length;
    return dir;
  });

  return Buffer.concat([header, ...entries, ...frames.map((f) => f.buffer)]);
}

async function generate() {
  const sourcePath = path.join(publicDir, "assets", "icon-craftivation.svg");
  const original = fs.readFileSync(sourcePath, "utf8");
  const svg = buildSvg(original);
  const svgBuffer = Buffer.from(svg);

  const sizes = [16, 32, 48, 96, 180, 192, 512];
  const png = {};
  for (const size of sizes) {
    png[size] = await sharp(svgBuffer, { density: 600 })
      .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toBuffer();
  }

  const ico = createIco([
    { size: 16, buffer: png[16] },
    { size: 32, buffer: png[32] },
    { size: 48, buffer: png[48] },
  ]);

  const writes = [
    [path.join(publicDir, "favicon.ico"), ico],
    [path.join(appDir, "favicon.ico"), ico],
    [path.join(publicDir, "icon.svg"), svg],
    [path.join(appDir, "icon.svg"), svg],
    [path.join(publicDir, "favicon.svg"), svg],
    [path.join(publicDir, "favicon-16x16.png"), png[16]],
    [path.join(publicDir, "favicon-32x32.png"), png[32]],
    [path.join(publicDir, "favicon-48x48.png"), png[48]],
    [path.join(publicDir, "favicon-96x96.png"), png[96]],
    [path.join(publicDir, "favicon-192x192.png"), png[192]],
    [path.join(publicDir, "favicon-512x512.png"), png[512]],
    [path.join(publicDir, "icon.png"), png[512]],
    [path.join(appDir, "icon.png"), png[512]],
    [path.join(publicDir, "apple-touch-icon.png"), png[180]],
    [path.join(appDir, "apple-icon.png"), png[180]],
  ];

  for (const [dest, data] of writes) {
    fs.writeFileSync(dest, data);
    console.log(`Wrote ${path.relative(rootDir, dest)} (${data.length} bytes)`);
  }
  console.log("\nSemua favicon Craftivation berhasil dibuat.");
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
