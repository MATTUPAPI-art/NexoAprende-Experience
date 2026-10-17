import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
const root = resolve('dist/nexoaprende-experience/browser');
const mount = '/NexoAprende-Experience/';
const port = Number(process.env.NEXO_PAGES_PORT ?? 4327);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
};
const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (pathname === mount.slice(0, -1)) {
      res.writeHead(301, { Location: mount });
      return res.end();
    }
    if (!pathname.startsWith(mount)) {
      res.writeHead(404);
      return res.end('Outside application base path');
    }
    const file = resolve(root, pathname.slice(mount.length) || 'index.html');
    if (!file.startsWith(root + '/') && !file.startsWith(root + '\\')) {
      res.writeHead(403);
      return res.end();
    }
    const info = await stat(file);
    if (!info.isFile()) throw new Error('Not a file');
    const range = /^bytes=(\d+)-(\d*)$/.exec(req.headers.range ?? '');
    const start = range ? Number(range[1]) : 0,
      end = range?.[2] ? Math.min(Number(range[2]), info.size - 1) : info.size - 1;
    if (start > end || start >= info.size) {
      res.writeHead(416, { 'Content-Range': `bytes */${info.size}` });
      return res.end();
    }
    res.writeHead(range ? 206 : 200, {
      'Content-Type': types[extname(file)] ?? 'application/octet-stream',
      'Content-Length': end - start + 1,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'no-store',
      ...(range ? { 'Content-Range': `bytes ${start}-${end}/${info.size}` } : {}),
    });
    if (req.method === 'HEAD') return res.end();
    createReadStream(file, { start, end }).pipe(res);
  } catch {
    res.writeHead(404);
    res.end('File not found');
  }
});
server.listen(port, '127.0.0.1', () =>
  console.log(`Static Pages preview: http://127.0.0.1:${port}${mount}`),
);
