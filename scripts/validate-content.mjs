import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const source=fs.readFileSync('lib/roles.ts','utf8');
const site=fs.readFileSync('lib/site.ts','utf8');
const ui=fs.readFileSync('lib/ui-copy.ts','utf8');
const slugs=['project-coordination','business-analysis','technical-analysis','qa-uat','fullstack','devsecops','it-operations','business-operations'];
const locales=['en','fr','ar'];
const arrCount=(text,key)=>{
 const match=text.match(new RegExp('"'+key+'"\\s*:\\s*\\[([\\s\\S]*?)\\]'));
 assert(match,`Missing array ${key}`);
 return match[1].split('\n').filter(x=>/^\s*"/.test(x)).length;
};
for (let i=0;i<slugs.length;i++){
 const start=source.indexOf('  "'+slugs[i]+'": {');
 assert(start>=0,`Missing role ${slugs[i]}`);
 const next=i+1<slugs.length?source.indexOf('  "'+slugs[i+1]+'": {',start+1):source.indexOf('} as Record<Slug',start);
 const role=source.slice(start,next>start?next:undefined);
 for(let j=0;j<locales.length;j++){
  const here=role.indexOf('    "'+locales[j]+'": {');
  assert(here>=0,`Missing locale ${slugs[i]}/${locales[j]}`);
  const nextLocale=j+1<locales.length?role.indexOf('    "'+locales[j+1]+'": {',here+1):-1;
  const section=role.slice(here,nextLocale>here?nextLocale:undefined);
  assert.equal(arrCount(section,'flow'),arrCount(section,'outputs'),`Stage/deliverable mismatch ${slugs[i]}/${locales[j]}`);
 }
}
const cvNames=[...site.matchAll(/'([^']+\.pdf)'/g)].map(m=>m[1]);
assert.equal(cvNames.length,20,'Expected exactly 20 CV files');
for(const filename of cvNames){assert(fs.existsSync(path.join('public/assets/cv',filename)),`Missing CV: ${filename}`)}
for(const locale of locales){assert(ui.includes(locale+': {'),`Missing interface locale ${locale}`)}
for(const slug of slugs){
 assert(fs.existsSync(`public/assets/workflows/${slug}.webp`),`Missing workflow ${slug}`);
 for(const locale of locales){assert(fs.existsSync(`public/assets/visuals/${slug}-${locale}.svg`),`Missing localized SVG ${slug}/${locale}`)}
}
console.log('PASS: 24 workflow stage-to-deliverable mappings, 20 CV downloads, all 8 images and 24 localized SVG diagrams.');
