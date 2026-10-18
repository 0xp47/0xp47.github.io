// One-time asset fix: "Ground Zero.png" is white ink on an OPAQUE black square —
// in light mode the black square shows as ugly blocks. Bake the square into alpha
// (white ink, transparent bg) so the watermark composites cleanly on any theme.
const sharp = require("sharp");
const path = require("path");

(async () => {
  const src = path.join(__dirname, "..", "public", "Ground Zero.png");
  const out = path.join(__dirname, "..", "public", "Ground Zero-ink.png");

  const { data, info } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const px = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    // Luminance drives alpha: white ink → opaque, black background → transparent.
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    px[i] = 255;
    px[i + 1] = 255;
    px[i + 2] = 255;
    px[i + 3] = Math.round(lum);
  }

  await sharp(px, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toFile(out);

  console.log("wrote", out);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});

