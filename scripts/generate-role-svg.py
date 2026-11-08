from pathlib import Path
from html import escape
import json,math
root=Path(__file__).resolve().parent.parent
graphs=json.loads((root/'lib/diagram-specs.json').read_text())
out=root/'public/assets/visuals'
icons={
 'target':'<circle cx="0" cy="0" r="9"/><circle cx="0" cy="0" r="5"/><circle cx="0" cy="0" r="1.5"/>',
 'users':'<circle cx="-4" cy="-6" r="3.2"/><path d="M-12 10v-2q1-6 8-6t8 6v2M5-6a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0M7 2q6-1 6 7"/>',
 'calendar':'<rect x="-10" y="-9" width="20" height="19" rx="2"/><path d="M-6-12v5M6-12v5M-10-3h20M-5 2h4m4 0h2"/>',
 'layers':'<path d="m0-12 12 6-12 6-12-6 12-6Zm-12 12 12 6 12-6M-12 6l12 6 12-6"/>',
 'shield':'<path d="M0-12 11-7v7q0 9-11 13Q-11 9-11 0v-7Z"/><path d="m-5 0 4 4 6-7"/>',
 'rocket':'<path d="M-6 5q0-15 16-16 0 16-16 16l-4 6 1-6Z"/><circle cx="3" cy="-4" r="2.5"/><path d="M-7 8-13 14m8-19-6-1"/>',
 'alert':'<path d="M0-13 12 10h-24Z"/><path d="M0-4v7m0 4v.5"/>',
 'network':'<rect x="-4" y="-12" width="8" height="8" rx="1"/><rect x="-14" y="6" width="8" height="8" rx="1"/><rect x="6" y="6" width="8" height="8" rx="1"/><path d="M0-4v6M-10 6V2h20v4"/>',
 'file':'<path d="M-8-12H3l7 7v17H-8Z"/><path d="M3-12v8h7M-3 1h9m-9 5h9"/>',
 'list':'<path d="M-6-8h17M-6 0h17M-6 8h17M-12-8h2m-2 8h2m-2 8h2"/>',
 'repeat':'<path d="M-11-2q0-10 11-10 8 0 11 6l2 3m0-8v8H5M11 2q0 10-11 10-8 0-11-6l-2-3m0 8V3h8"/>',
 'monitor':'<rect x="-13" y="-12" width="26" height="19" rx="2"/><path d="M-7 13H7M0 7v6"/>',
 'code':'<path d="m-6-9-9 9 9 9M6-9l9 9-9 9M4-13l-8 26"/>',
 'database':'<ellipse cx="0" cy="-9" rx="11" ry="4"/><path d="M-11-9V9q0 4 11 4T11 9V-9M-11 0q0 4 11 4T11 0"/>',
 'lock':'<rect x="-10" y="-1" width="20" height="15" rx="2"/><path d="M-7-1v-5a7 7 0 0 1 14 0v5M0 4v5"/>',
 'activity':'<path d="M-13 0h6l4-11L3 12l5-12h5"/>',
 'play':'<circle cx="0" cy="0" r="12"/><path d="m-4-7 11 7-11 7Z"/>',
 'cloud':'<path d="M-10 10q-9-5-2-13 3-3 8-2Q3-16 10-7q11 0 8 11-1 6-9 6Z"/>'
}


# Consistent semantic colors match the live interactive diagram icons.
palette={
 'target':('#ff629f','#f43578'),'users':('#a389ff','#6b55ee'),
 'calendar':('#ffbf63','#f88b36'),'layers':('#b781ff','#7648ef'),
 'shield':('#57e6b9','#0cae92'),'rocket':('#ff9b79','#fb5b82'),
 'alert':('#ffc36a','#fa7848'),'network':('#6db9ff','#3478f7'),
 'file':('#6cd5ff','#248de4'),'list':('#af87ff','#784cef'),
 'repeat':('#67e6ce','#1cbba8'),'monitor':('#65dcf8','#3187ef'),
 'code':('#61c5ff','#3b6df2'),'database':('#ae90ff','#6759dc'),
 'lock':('#ff83a1','#ed567e'),'activity':('#9ce78f','#43b87e'),
 'play':('#ffbb70','#ee8f47'),'cloud':('#85e2ff','#2e99db')
}

def edges_line(from_, to):
 x1,y1=from_['x'],from_['y'];x2,y2=to['x'],to['y'];dx=x2-x1;dy=y2-y1;dist=max(math.hypot(dx,dy),1);nx=dx/dist;ny=dy/dist
 sx=x1+nx*75;sy=y1+ny*47;ex=x2-nx*75;ey=y2-ny*47
 cx=(sx+ex)/2+(20 if dy>0 else -20 if dy<0 else 0);cy=(sy+ey)/2
 return f'M{sx:.1f} {sy:.1f} Q{cx:.1f} {cy:.1f} {ex:.1f} {ey:.1f}'

for slug,g in graphs.items():
 by={n['key']:n for n in g['nodes']}
 for locale,idx in [('en',0),('fr',1),('ar',2)]:
  accent=g['accent']; title=g['title'][{'en':0,'fr':1,'ar':2}[locale]]
  parts=[f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 605" width="1120" height="605" role="img" aria-label="{escape(title)}">
  <defs><linearGradient id="bg" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#0b1025"/><stop offset="1" stop-color="#17214c"/></linearGradient><linearGradient id="edge" x1="0" x2="1" y1="0" y2="1"><stop stop-color="{accent}"/><stop offset="1" stop-color="#69daee"/></linearGradient><linearGradient id="face" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#2a3a72"/><stop offset="1" stop-color="#131c3b"/></linearGradient><linearGradient id="sheen" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#ffffff" stop-opacity=".16"/><stop offset=".5" stop-color="#ffffff" stop-opacity="0"/></linearGradient><radialGradient id="halo"><stop stop-color="{accent}" stop-opacity=".19"/><stop offset="1" stop-color="{accent}" stop-opacity="0"/></radialGradient><radialGradient id="vignette"><stop stop-color="#040818" stop-opacity="0"/><stop offset="1" stop-color="#040818" stop-opacity=".5"/></radialGradient><pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#9ca8d0" opacity=".13"/></pattern><pattern id="grid" width="70" height="70" patternUnits="userSpaceOnUse"><path d="M70 0H0V70" fill="none" stroke="#8fa6d8" stroke-opacity=".05"/></pattern><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M1 1L9 5 1 9" stroke="#77dafa" stroke-width="1.7" fill="none"/></marker><filter id="blur"><feGaussianBlur stdDeviation="22"/></filter><filter id="shadow" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="0" dy="12" stdDeviation="12" flood-color="#070c23" flood-opacity=".5"/></filter></defs>
  <style>.line{{stroke-dasharray:9 7;animation:dash 19s linear infinite}}.orb{{animation:orb 8s ease-in-out infinite}}.flow-dot{{filter:drop-shadow(0 0 7px #83eaff)}}@keyframes dash{{to{{stroke-dashoffset:-240}}}}@keyframes orb{{50%{{opacity:.5}}}}@media(prefers-reduced-motion:reduce){{.line,.orb{{animation:none}}.flow-dot{{display:none}}}}</style>
  <rect width="1120" height="605" fill="url(#bg)"/><rect width="1120" height="605" fill="url(#grid)"/><rect width="1120" height="605" fill="url(#dots)"/><ellipse cx="560" cy="300" rx="400" ry="265" fill="url(#halo)"/>
  <circle cx="80" cy="535" r="155" fill="{accent}" opacity=".07" filter="url(#blur)"/><circle cx="1055" cy="85" r="135" fill="#5fd8ff" opacity=".06" filter="url(#blur)"/><rect width="1120" height="605" fill="url(#vignette)"/>
  <g fill="none" stroke="#b4b6f3" opacity=".09"><circle cx="560" cy="295" r="260" stroke-dasharray="5 14"/><circle cx="560" cy="295" r="306"/></g><g opacity=".4"><circle cx="905" cy="64" r="3" fill="#79ebda"/><circle cx="925" cy="64" r="3" fill="{accent}"/><circle cx="945" cy="64" r="3" fill="#9cb7d8"/></g>
  <g><rect x="986" y="30" width="89" height="26" rx="13" fill="{accent}" fill-opacity=".12" stroke="{accent}" stroke-opacity=".4"/><text x="1030.5" y="47" text-anchor="middle" font-size="10" font-family="Arial,sans-serif" font-weight="700" letter-spacing="1.4" fill="{accent}">{locale.upper()}</text></g>
  <text x="45" y="36" font-size="11" font-family="Arial,sans-serif" font-weight="700" fill="{accent}" letter-spacing="2">WASSIMLAB   /   VISUAL DELIVERY SYSTEM</text><text x="45" y="56" font-size="18" font-family="Arial,Tajawal,sans-serif" font-weight="700" fill="#f1f4ff" direction="{'rtl' if locale=='ar' else 'ltr'}">{escape(title)}</text>
  <line x1="45" y1="75" x2="1075" y2="75" stroke="#8293bd" stroke-opacity=".18"/><rect x="45" y="74" width="112" height="2" rx="1" fill="{accent}" opacity=".65"/>
  <g fill="none" stroke="{accent}" stroke-opacity=".22"><path d="M24 100V76h24M1096 100V76h-24M24 552v24h24M1096 552v24h-24"/></g>
  ''']
  for j,(a,b) in enumerate(g['edges']):
   d=edges_line(by[a],by[b]);parts.append(f'<path d="{d}" stroke="{accent}" stroke-opacity=".25" stroke-width="10" fill="none"/><path class="line" d="{d}" stroke="url(#edge)" stroke-opacity=".82" stroke-width="2.5" fill="none" marker-end="url(#arrow)"/><circle class="flow-dot" r="3.5" fill="#a6f3ff"><animateMotion dur="{2.8+(j%4)*.4:.1f}s" repeatCount="indefinite" begin="{j*.17:.1f}s" path="{d}"/></circle>')
  for j,n in enumerate(g['nodes']):
   key,icon,x,y,ntype=n['key'],n['icon'],n['x'],n['y'],n['type'];label=n['label'][idx];fs=14 if len(label)<16 else 12 if len(label)<23 else 10
   color,color2=palette.get(icon,palette['target'])
   dash=' stroke-dasharray="7 4"' if ntype=='artifact' else ''
   halo=f'<rect x="{x-80}" y="{y-55}" width="160" height="105" rx="19" fill="none" stroke="{color}" stroke-opacity=".34" stroke-width="1"/>' if ntype in ('hub','gate') else ''
   parts.append(f'''<g filter="url(#shadow)"><rect x="{x-78}" y="{y-45}" width="156" height="96" rx="16" fill="{color2}" opacity=".22" transform="translate(5 7)"/>{halo}<rect x="{x-76}" y="{y-51}" width="152" height="97" rx="15" fill="url(#face)" stroke="{color}" stroke-opacity=".75" stroke-width="1.5"{dash}/><rect x="{x-75}" y="{y-50}" width="150" height="54" rx="14" fill="url(#sheen)" opacity=".55"/><rect x="{x-58}" y="{y-43}" width="116" height="3" rx="2" fill="{color}" opacity=".78"/><circle cx="{x}" cy="{y-20}" r="25" fill="{color}" fill-opacity=".18"/><circle cx="{x}" cy="{y-20}" r="21" fill="{color2}" stroke="{color}" stroke-width="1.8"/><path d="M{x-11} {y-33}q4-10 16-9" fill="none" stroke="#fff" stroke-opacity=".27" stroke-width="2"/><g transform="translate({x} {y-20})" fill="none" stroke="#ffffff" stroke-width="2.1" stroke-linejoin="round" stroke-linecap="round">{icons.get(icon,icons['target'])}</g><text x="{x}" y="{y+21}" font-size="{fs}" font-family="Arial,Tajawal,sans-serif" font-weight="700" fill="#f2f6ff" direction="{'rtl' if locale=='ar' else 'ltr'}" text-anchor="middle">{escape(label)}</text><rect x="{x-46}" y="{y+38}" width="92" height="2" rx="1" fill="{color}" opacity=".3"/><g class="orb"><circle cx="{x+63}" cy="{y-40}" r="10" fill="#0d1533" stroke="{color}" stroke-width="1.4"/><text x="{x+63}" y="{y-36.4}" font-size="9" font-family="Arial,sans-serif" font-weight="700" fill="{color}" text-anchor="middle">{str(j+1).zfill(2)}</text></g></g>''')
  parts.append(f'''<g font-family="Arial,Tajawal,sans-serif" font-size="10" fill="#93a5cc"><text x="46" y="582" letter-spacing="1">CONCEPTUAL WORKFLOW  /  {slug.upper().replace('-', ' ')}</text><text x="1075" y="582" text-anchor="end" letter-spacing="1">{locale.upper()}  ·  2026  ·  01</text><line x1="45" y1="562" x2="1075" y2="562" stroke="#8293bd" stroke-opacity=".14"/><rect x="45" y="561.5" width="34" height="1.5" fill="{accent}" opacity=".7"/></g></svg>''')
  path=out/f'{slug}-{locale}.svg';path.write_text('\n'.join(parts),encoding='utf-8')
print('created',len(graphs)*3,'localized SVG images')
