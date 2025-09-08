import http from 'node:http';
import { existsSync, createReadStream, statSync } from 'node:fs';
import { resolve, extname } from 'node:path';

const root = resolve('sites/docs/dist');
const port = process.env.PORT || 4173;
const base = '/Slate';

const types = { '.html':'text/html','.css':'text/css','.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.ico':'image/x-icon','':'' };

const server = http.createServer((req,res)=>{
  let url = req.url || '/';
  if (url === '/') url = base + '/';
  if (url.startsWith(base)) url = url.slice(base.length) || '/';
  let file = resolve(root + url);
  if (!extname(file)) file = file.endsWith('/') ? file+'index.html' : file+'/index.html';
  if (!existsSync(file)) { res.statusCode=404; res.end('Not found'); return; }
  res.setHeader('Content-Type', types[extname(file)] || 'text/plain');
  res.setHeader('Cache-Control', 'no-store');
  createReadStream(file).pipe(res);
});
server.listen(port, ()=>console.log(`[serve-docs] http://localhost:${port}${base}`));
