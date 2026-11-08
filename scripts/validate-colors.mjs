import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const roles=['project-coordination','business-analysis','technical-analysis','qa-uat','fullstack','devsecops','it-operations','business-operations'];
const langs=['en','fr','ar'];
const colors=['#ff629f','#57e6b9','#6db9ff','#ffbf63','#ff9b79','#a389ff','#61c5ff'];
for(const role of roles) for(const lang of langs){
 const p=path.join(root,'public','assets','visuals',`${role}-${lang}.svg`);
 if(!fs.existsSync(p))throw Error(`Missing illustration: ${p}`);
 const content=fs.readFileSync(p,'utf8');
 if(!content.includes('flow-dot')||!content.includes('stroke-width="2.1"'))throw Error(`Missing colored diagram or links: ${p}`);
}
const v=fs.readFileSync(path.join(root,'components','Visuals.tsx'),'utf8')+fs.readFileSync(path.join(root,'components','icon-set.tsx'),'utf8');
for(const value of colors)if(!v.includes(value))throw Error(`Color token missing: ${value}`);
const h=fs.readFileSync(path.join(root,'components','VisualHighlights.tsx'),'utf8');
for(const lang of langs)if(!h.includes(`${lang}:`))throw Error(`Visual gallery missing ${lang} translation`);
const roleCard=fs.readFileSync(path.join(root,'components','Cards.tsx'),'utf8');
if(!roleCard.includes('role-image-band'))throw Error('Role cards lack images');
if(!roleCard.includes('RoleVisual'))throw Error('Role cards do not use the per-role signature art');
const signature=fs.readFileSync(path.join(root,'components','RoleVisual.tsx'),'utf8');
for(const role of roles)if(!signature.includes(`'${role}'`))throw Error(`Signature art missing role: ${role}`);
const cvDir=path.join(root,'public','assets','cv');
const cvs=fs.readdirSync(cvDir).filter(f=>!f.startsWith('.')&&f.endsWith('.pdf'));
if(cvs.length!==20)throw Error(`Expected 20 CVs, found ${cvs.length}`);
console.log(`PASS: ${roles.length*langs.length} localized, color-coded workflow illustrations; 8 role cards; translated visual gallery; ${cvs.length} CV PDFs.`);
