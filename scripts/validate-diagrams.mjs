import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const root=path.resolve(path.dirname(url.fileURLToPath(import.meta.url)),'..');
const specs=JSON.parse(fs.readFileSync(path.join(root,'lib/diagram-specs.json'),'utf8'));
const slugs=['project-coordination','business-analysis','technical-analysis','qa-uat','fullstack','devsecops','it-operations','business-operations'];
const locales=['en','fr','ar'];
const icons=new Set(['target','users','calendar','layers','shield','rocket','alert','network','file','list','repeat','monitor','code','database','lock','activity','play','cloud']);
const types=new Set(['hub','actor','artifact','stage','system','gate']);
const problems=[];
for(const slug of slugs){
 const spec=specs[slug];if(!spec){problems.push(`${slug}: diagram specification missing`);continue}
 const ids=new Set();
 for(const node of spec.nodes){
  const {key:id,icon,x,y,type,label,note}=node;
  if(ids.has(id))problems.push(`${slug}: duplicate node id ${id}`);ids.add(id);
  if(!icons.has(icon))problems.push(`${slug}: unknown icon ${icon}`);
  if(!types.has(type))problems.push(`${slug}: node ${id} has unknown type ${type}`);
  if(x<75||x>1050||y<85||y>525)problems.push(`${slug}: node ${id} outside safe diagram area`);
  if(!Array.isArray(label)||label.length!==3||label.some(x=>!String(x).trim()))problems.push(`${slug}: node ${id} missing label translation`);
  if(!Array.isArray(note)||note.length!==3||note.some(x=>!String(x).trim()))problems.push(`${slug}: node ${id} missing insight translation`);
  if(Array.isArray(note)&&note.some((x,i)=>x===label[i]))problems.push(`${slug}: node ${id} insight duplicates its label`);
 }
 for(const [a,b] of spec.edges){if(!ids.has(a)||!ids.has(b))problems.push(`${slug}: broken edge ${a} → ${b}`)}
 if(spec.nodes.length<5||spec.edges.length<4)problems.push(`${slug}: diagram has insufficient topology`);
 if(spec.edges.length<spec.nodes.length*0.8)problems.push(`${slug}: topology too sparse for ${spec.nodes.length} nodes`);
 for(const locale of locales){
  const image=path.join(root,'public/assets/visuals',`${slug}-${locale}.svg`);
  if(!fs.existsSync(image))problems.push(`${slug}-${locale}: SVG missing`);
  else if(!fs.readFileSync(image,'utf8').includes('marker-end="url(#arrow)"'))problems.push(`${slug}-${locale}: directional arrows missing`);
 }
}
const cv=fs.readdirSync(path.join(root,'public/assets/cv')).filter(x=>!x.startsWith('.')&&x.endsWith('.pdf'));
if(cv.length!==20)problems.push(`expected 20 CV PDFs, found ${cv.length}`);
if(problems.length){console.error(problems.join('\n'));process.exit(1)}
const nodeCount=slugs.reduce((n,slug)=>n+specs[slug].nodes.length,0);
console.log(`PASS: ${slugs.length} role-specific interactive graph definitions (${nodeCount} nodes with per-node localized insights), ${slugs.length*locales.length} localized SVGs, all graph links and nodes valid; ${cv.length} CV PDFs present.`);
