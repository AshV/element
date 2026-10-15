import http from 'http';
import fs from 'fs';
import path from 'path';
import config from '../astro.config.mjs';

const PORT = 5173;
const DIST = path.resolve('dist');
const rawBase = config.base || '/';
const base = rawBase.startsWith('/') ? (rawBase.endsWith('/') ? rawBase : `${rawBase}/`) : `/${rawBase}/`;
const baseNoSlash = base.replace(/\/+$/, '');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.mp4': 'video/mp4',
  '.wav': 'audio/wav',
  '.woff2': 'font/woff2',
};

http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (baseNoSlash && urlPath.startsWith(base)) {
    urlPath = urlPath.slice(base.length);
  } else if (baseNoSlash && urlPath === baseNoSlash) {
    res.writeHead(302, { Location: base });
    return res.end();
  }
  let filePath = path.join(DIST, urlPath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }
  if (!fs.existsSync(filePath)) {
    const p404 = path.join(DIST, '404.html');
    filePath = fs.existsSync(p404) ? p404 : path.join(DIST, 'index.html');
  }
  const ext = path.extname(filePath);
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
}).listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}${base}`);
});
