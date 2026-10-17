import { chromium } from '@playwright/test';
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Uses the existing QA browser's native codecs. Originals are never overwritten.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const images = ['etapa-infantil', 'etapa-juvenil', 'etapa-adolescente'];
const videos = ['portada-educativa', 'actividades-ninos'];
const routes = new Map([
  ...images.map((name) => [`/${name}.jpg`, resolve(root, `public/images/etapas/${name}.jpg`)]),
  ...videos.map((name) => [`/${name}.mp4`, resolve(root, `public/videos/${name}.mp4`)]),
]);
const server = createServer(async (req, res) => {
  const file = routes.get(req.url);
  if (!file) {
    res.setHeader('Content-Type', 'text/html');
    res.end('<!doctype html><html lang="es"><title>Preparación local</title></html>');
    return;
  }
  try {
    res.setHeader('Content-Type', req.url.endsWith('.jpg') ? 'image/jpeg' : 'video/mp4');
    res.end(await readFile(file));
  } catch {
    res.statusCode = 404;
    res.end();
  }
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const browser = await chromium.launch({
  channel:
    process.platform === 'win32' &&
    existsSync('C:/Program Files/Google/Chrome/Application/chrome.exe')
      ? 'chrome'
      : undefined,
  headless: true,
});
try {
  const page = await browser.newPage();
  await page.goto(`http://127.0.0.1:${server.address().port}`);
  await mkdir(resolve(root, 'public/images/optimized'), { recursive: true });
  await mkdir(resolve(root, 'public/videos/optimized'), { recursive: true });
  for (const name of images) {
    if (!existsSync(routes.get(`/${name}.jpg`))) continue;
    const result = await page.evaluate(async (name) => {
      const img = new Image();
      img.src = `/${name}.jpg`;
      await img.decode();
      const width = Math.min(1200, img.width);
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = Math.round((img.height * width) / img.width);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      return {
        original: [img.width, img.height],
        data: canvas.toDataURL('image/webp', 0.8).split(',')[1],
      };
    }, name);
    const buffer = Buffer.from(result.data, 'base64');
    await writeFile(resolve(root, `public/images/optimized/${name}.webp`), buffer);
    console.log(
      `${name}: ${result.original.join('×')} → 1200 px, ${Math.round(buffer.length / 1024)} kB WebP`,
    );
  }
  for (const name of videos) {
    if (!existsSync(routes.get(`/${name}.mp4`))) continue;
    const result = await page.evaluate(async (name) => {
      const video = document.createElement('video');
      video.src = `/${name}.mp4`;
      video.muted = true;
      video.playsInline = true;
      document.body.append(video);
      await new Promise((resolve, reject) => {
        video.onloadeddata = resolve;
        video.onerror = () => reject(new Error('El MP4 no se puede decodificar'));
      });
      const metadata = {
        width: video.videoWidth,
        height: video.videoHeight,
        duration: Math.round(video.duration * 10) / 10,
      };
      const canvas = document.createElement('canvas');
      canvas.width = 960;
      canvas.height = Math.round((video.videoHeight * 960) / video.videoWidth);
      const ctx = canvas.getContext('2d');
      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : 'video/webm;codecs=vp8';
      const recorder = new MediaRecorder(canvas.captureStream(24), {
        mimeType,
        videoBitsPerSecond: 700000,
      });
      const chunks = [];
      const done = new Promise((resolve) => {
        recorder.ondataavailable = (e) => {
          if (e.data.size) chunks.push(e.data);
        };
        recorder.onstop = resolve;
      });
      await video.play();
      let running = true;
      const draw = () => {
        if (!running) return;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        requestAnimationFrame(draw);
      };
      draw();
      recorder.start();
      await new Promise((resolve) => {
        const timer = setTimeout(resolve, Math.min(12000, video.duration * 1000));
        video.onended = () => {
          clearTimeout(timer);
          resolve();
        };
      });
      running = false;
      recorder.stop();
      video.pause();
      await done;
      video.remove();
      const blob = new Blob(chunks, { type: 'video/webm' });
      const data = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.readAsDataURL(blob);
      });
      return { metadata, data };
    }, name);
    const buffer = Buffer.from(result.data, 'base64');
    await writeFile(resolve(root, `public/videos/optimized/${name}.webm`), buffer);
    console.log(
      `${name}: ${JSON.stringify(result.metadata)} → clip silencioso de hasta 12 s, ${Math.round(buffer.length / 1024)} kB WebM`,
    );
  }
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
