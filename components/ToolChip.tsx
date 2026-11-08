import type {CSSProperties} from 'react';
import {Glyph} from '@/components/icon-set';
import type {ToolEntry} from '@/lib/tools';
import {toolIconColors, toolIconPaths} from '@/lib/tool-icons';

/**
 * One methods/tools chip. Branded entries render the official mark and link to
 * the vendor site; methods render a line glyph and link only when a standards
 * body or glossary page exists.
 */
export function ToolChip({entry,hue}:{entry:ToolEntry;hue:string}){
 const brandColor=entry.brand?toolIconColors[entry.brand]:undefined;
 const iconStyle=brandColor?{color:brandColor,background:`color-mix(in srgb, ${brandColor} 18%, transparent)`}:undefined;
 const icon=entry.brand
  ? <svg className="tool-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={toolIconPaths[entry.brand]}/></svg>
  : <svg className="tool-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><Glyph name={entry.glyph??'layers'} x={12} y={12} size={24}/></svg>;
 const body=<><span className="method-icon" style={iconStyle}>{icon}</span><span className="method-label">{entry.label}</span>{entry.href&&<span className="method-arrow" aria-hidden="true">↗</span>}</>;
 const style={'--method-hue':hue} as CSSProperties;
 return entry.href
  ? <a className="method method-color" href={entry.href} target="_blank" rel="noopener noreferrer" style={style} aria-label={`${entry.label} — official website`}>{body}</a>
  : <div className="method method-color" style={style}>{body}</div>;
}
