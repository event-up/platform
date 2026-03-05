const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Source PNG (400x400) - passed as first argument or default
const sourcePng = process.argv[2] || '/Users/seniya/Downloads/400x400.png';
// Output ICO file - passed as second argument or default to landing public
const outputIco = process.argv[3] || '/Users/seniya/Projects/eventup/platform/apps/landing/public/favicon.ico';

async function generateFavicon() {
  try {
    // Ensure source exists
    if (!fs.existsSync(sourcePng)) {
      console.error(`Source PNG not found: ${sourcePng}`);
      process.exit(1);
    }

    // Sizes required: 16x16 and 32x32
    const sizes = [16, 32];
    const pngBuffers = await Promise.all(sizes.map(async (size) => {
      const buffer = await sharp(sourcePng)
        .resize(size, size, { fit: 'cover' })
        .png()
        .toBuffer();
      return buffer;
    }));

    // ICO header: 6 bytes (reserved, type, count)
    const header = Buffer.alloc(6);
    header.writeUInt16LE(0, 0);   // Reserved = 0
    header.writeUInt16LE(1, 2);   // Type = 1 (icon)
    header.writeUInt16LE(sizes.length, 4); // Count

    // Directory entries: 16 bytes each
    const entries = [];
    let offset = 6 + (16 * sizes.length); // Data starts after header + entries

    sizes.forEach((size, i) => {
      const pngBuffer = pngBuffers[i];
      const entry = Buffer.alloc(16);
      entry[0] = size;                // bWidth
      entry[1] = size;                // bHeight
      entry[2] = 0;                   // bColorCount (0 = >=256)
      entry[3] = 0;                   // bReserved
      entry.writeUInt16LE(0, 4);      // wPlanes (0 for PNG)
      entry.writeUInt16LE(0, 6);      // wBitCount (0 for PNG)
      entry.writeUInt32LE(pngBuffer.length, 8); // dwSizeInBytes
      entry.writeUInt32LE(offset, 12); // dwImageOffset
      entries.push(entry);
      offset += pngBuffer.length;
    });

    // Combine all parts
    const buffers = [header, ...entries, ...pngBuffers];
    const icoBuffer = Buffer.concat(buffers);

    // Ensure output directory exists
    const outDir = path.dirname(outputIco);
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    fs.writeFileSync(outputIco, icoBuffer);
    console.log(`✅ Favicon generated: ${outputIco} (${icoBuffer.length} bytes)`);
  } catch (error) {
    console.error('Error generating favicon:', error);
    process.exit(1);
  }
}

generateFavicon();
