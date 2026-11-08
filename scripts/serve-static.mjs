import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const cwd=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const root=path.join(cwd,'out');
const port=Number(process.env.PORT||4173);
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.xml':'application/xml; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.ico':'image/x-icon','.pdf':'application/pdf','.woff2':'font/woff2'};
try{await fs.stat(path.join(root,'index.html'))}catch{console.error('Missing out/index.html. Run npm run build before previewing.');process.exit(1)}
const server=http.createServer(async(req,res)=>{
 if(!['GET','HEAD'].includes(req.method||'')){res.writeHead(405).end();return}
 try{
  const pathname=decodeURIComponent(new URL(req.url||'/',`http://localhost:${port}`).pathname);
  const relative=pathname.endsWith('/')?pathname+'index.html':pathname;
  let filename=path.resolve(root,'.'+relative);
  if(!filename.startsWith(root+path.sep)){res.writeHead(403).end();return}
  let data;
  try{data=await fs.readFile(filename)}catch{
   if(!path.extname(filename)){filename=path.join(filename,'index.html');data=await fs.readFile(filename)}
   else throw new Error('not found');
  }
  res.setHeader('Content-Type',mime[path.extname(filename)]||'application/octet-stream');
  res.setHeader('X-Content-Type-Options','nosniff');
  res.writeHead(200);res.end(req.method==='HEAD'?undefined:data);
 }catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'}).end('Not found')}
});
server.listen(port,()=>console.log(`Preview static export: http://localhost:${port}`));
