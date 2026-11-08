import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const read=(p)=>fs.readFileSync(path.join(root,p),'utf8');
const assert=(condition,msg)=>{if(!condition) throw new Error(msg)};
const pkg=JSON.parse(read('package.json'));
assert(pkg.dependencies.motion?.startsWith('^14.'),'Motion for React dependency is missing or unexpected');
assert(pkg.dependencies.three,'three.js dependency is missing');
assert(pkg.dependencies['@react-three/fiber'],'React Three Fiber dependency is missing');
const kit=read('components/MotionKit.tsx');
const visuals=read('components/Visuals.tsx');
const shell=read('components/Shell.tsx');
const ambient=read('components/AmbientField.tsx');
const ambientStars=read('components/ambient/AmbientStars.tsx');
const progress=read('components/nav/ScrollProgress.tsx');
const resume=read('components/ResumeExplorer.tsx');
const layout=read('app/[locale]/layout.tsx');
const checks=[
 ['MotionConfig reduced motion','reducedMotion="user"',kit],
 ['Spring hover cards','whileHover=',kit],
 ['Pressed states','whileTap=',kit],
 ['Pointer-responsive portrait','onPointerMove',kit],
 ['Route transitions','route-transition',kit],
 ['Route transition is CSS only','animation:routeIn',read('app/globals.css')],
 ['Workflow motion nodes','<motion.g',visuals],
 ['Workflow path drawing','<motion.path',visuals],
 ['Active workflow explanations','diagram-inspector-copy',visuals],
 ['Artifact shared layout','layoutId="active-artifact-pill"',visuals],
 ['Nav shared layout','layoutId="nav-active-underline"',shell],
 ['Ambient field mounted after idle','requestIdleCallback',ambient],
 ['Ambient field pauses when hidden','visibilitychange',ambient],
 ['Ambient field honours reduced motion','prefers-reduced-motion',ambient],
 ['Ambient field needs WebGL','hasWebGL',ambient],
 ['Ambient field contains render failure','WebGLBoundary',ambient],
 ['Ambient star rotation','useFrame',ambientStars],
 ['Ambient pointer glow','ambient-glow',ambient],
 ['Navbar hover glide','nav-hover-pill',shell],
 ['Navbar hover spring','type:\'spring\'',shell],
 ['Scroll progress spring','useSpring',progress],
 ['Scroll progress reduced motion','useReducedMotion',progress],
 ['Resume list reflow','mode="popLayout"',resume],
 ['Motion provider wired into locale','<MotionProvider>',layout],
];
for(const [name,needle,source] of checks)assert(source.includes(needle),`Failed: ${name}`);
assert(!shell.includes('NavField'),'Navbar must not mount a point field');
assert(!fs.existsSync(path.join(root,'components/nav/NavField.tsx')),'Navbar point field component should be removed');
const svgFiles=fs.readdirSync(path.join(root,'public/assets/visuals')).filter(x=>!x.startsWith('.')&&/-en\.svg$|-ar\.svg$|-fr\.svg$/.test(x));
const pdfs=fs.readdirSync(path.join(root,'public/assets/cv')).filter(x=>!x.startsWith('.')&&x.endsWith('.pdf'));
assert(svgFiles.length===24,`Expected 24 translated SVGs, found ${svgFiles.length}`);
assert(pdfs.length===20,`Expected 20 CV PDFs, found ${pdfs.length}`);
for(const locale of ['en','fr','ar'])assert(fs.existsSync(path.join(root,`app/[locale]/page.tsx`)),`${locale} locale page missing`);
console.log(`PASS: ${checks.length} motion checks, ${svgFiles.length} localized SVGs, ${pdfs.length} CV PDFs. Typechecked build still required.`);
