import { chromium } from '@playwright/test';
import { createServer } from 'node:http';
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

// Audit actual signatures, decode locally, and preserve every original.
const root = resolve('public/images');
const files = [];
for (const folder of ['logo', 'mascota', 'fondos']) {
  for (const name of await readdir(resolve(root, folder)).catch((error) => {
    if (error.code === 'ENOENT') return [];
    throw error;
  })) {
    if (/\.(png|jpe?g|webp)$/i.test(name)) files.push(`${folder}/${name}`);
  }
}
const server = createServer(async (req, res) => {
  const key = decodeURIComponent(req.url.slice(1));
  if (!files.includes(key)) return res.end('<html lang="es"><title>Auditoría local</title></html>');
  res.end(await readFile(resolve(root, key)));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const browser = await chromium.launch({ channel: 'chrome' });
try {
  const page = await browser.newPage();
  await page.goto(`http://127.0.0.1:${server.address().port}`);
  await mkdir(resolve(root, 'optimized'), { recursive: true });
  await mkdir('artifacts', { recursive: true });
  const audit = [];
  for (const file of files) {
    const bytes = await readFile(resolve(root, file));
    const signature = bytes.subarray(0, 8).toString('hex');
    const actual = signature.startsWith('89504e47')
      ? 'png'
      : signature.startsWith('ffd8ff')
        ? 'jpeg'
        : bytes.toString('ascii', 8, 12) === 'WEBP'
          ? 'webp'
          : 'unknown';
    const result = await page.evaluate(
      async ({ file, size }) => {
        const img = new Image();
        img.src = '/' + file;
        await img.decode();
        const canvas = document.createElement('canvas');
        canvas.width = Math.min(img.width, size);
        canvas.height = Math.round((canvas.width * img.height) / img.width);
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        return {
          width: img.width,
          height: img.height,
          data: canvas.toDataURL('image/webp', 0.82).split(',')[1],
        };
      },
      { file, size: file.startsWith('fondos') ? 1440 : file.includes('favicon') ? 96 : 480 },
    );
    const output = file
      .split('/')
      .pop()
      .replace(/\.[^.]+$/, '.webp');
    const optimized = Buffer.from(result.data, 'base64');
    await writeFile(resolve(root, 'optimized', output), optimized);
    audit.push({
      file,
      actual,
      width: result.width,
      height: result.height,
      bytes: bytes.length,
      optimizedBytes: optimized.length,
      output,
    });
  }
  const sheet = await page.evaluate(async (files) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = Math.ceil(files.length / 4) * 190;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#e7e9f1';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < files.length; i++) {
      const img = new Image();
      img.src = '/' + files[i];
      await img.decode();
      const x = (i % 4) * 250,
        y = Math.floor(i / 4) * 190;
      const scale = Math.min(240 / img.width, 155 / img.height);
      ctx.drawImage(img, x + 5, y + 5, img.width * scale, img.height * scale);
      ctx.fillStyle = '#111';
      ctx.font = '12px sans-serif';
      ctx.fillText(files[i], x + 5, y + 178);
    }
    return canvas.toDataURL('image/png').split(',')[1];
  }, files);
  await writeFile('artifacts/custom-art-contact-sheet.png', Buffer.from(sheet, 'base64'));
  await writeFile('artifacts/media-audit.json', JSON.stringify(audit, null, 2));
  console.log(JSON.stringify(audit, null, 2));
} finally {
  await browser.close();
  await new Promise((r) => server.close(r));
}
