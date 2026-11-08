import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname,'..');
const slugs=['project-coordination','business-analysis','technical-analysis','qa-uat','fullstack','devsecops','it-operations','business-operations'];
const languages=['en','fr','ar'];
let count=0;
const failures=[];
const manifestFile=path.join(root,'public/assets/workflows/manifest.json');
const manifest=JSON.parse(fs.readFileSync(manifestFile,'utf8'));
for(const slug of slugs){
 const entry=manifest[slug];
 if(!entry || entry.file!==`/assets/workflows/${slug}.webp`)failures.push(`Missing/bad manifest entry: ${slug}`);
 const f=path.join(root,'public/assets/workflows',`${slug}.webp`);
 if(!fs.existsSync(f)){failures.push(`Missing cinematic image: ${slug}`);continue}
 const buf=fs.readFileSync(f);
 if(buf.length<1000||buf.toString('ascii',0,4)!=='RIFF'||buf.toString('ascii',8,12)!=='WEBP')failures.push(`Invalid WEBP: ${f}`);
 count++;
 for(const lang of languages){const svg=path.join(root,'public/assets/visuals',`${slug}-${lang}.svg`);if(!fs.existsSync(svg)||!fs.readFileSync(svg,'utf8').includes('<svg'))failures.push(`Missing localized SVG: ${slug}-${lang}`);else count++}
}
const cvDir=path.join(root,'public/assets/cv');
const cvs=fs.readdirSync(cvDir).filter(f=>!f.startsWith('.')&&f.endsWith('.pdf'));
if(cvs.length!==20)failures.push(`Expected 20 CV PDFs, found ${cvs.length}`);
const rolePage=fs.readFileSync(path.join(root,'app/[locale]/expertise/[slug]/page.tsx'),'utf8');
const gallery=fs.readFileSync(path.join(root,'components/VisualHighlights.tsx'),'utf8');
if(!rolePage.includes('<WorkflowArtwork')||!gallery.includes('/assets/workflows/'))failures.push('Visual artwork not wired to role pages/gallery');
if(failures.length){console.error(failures.join('\n'));process.exit(1)}
console.log(`Passed: ${slugs.length} cinematic images, ${slugs.length*3} localized SVGs, ${cvs.length} CVs and component references.`);
