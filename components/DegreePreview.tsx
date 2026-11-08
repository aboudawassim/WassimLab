'use client';

/**
 * Degree preview rendered as a CSS background, not an <img>, so the browser
 * offers no direct save or open action. Right-click, drag and copy are blocked.
 * A tiled watermark stays visible over any screenshot or screen capture.
 */
export function DegreePreview({label,note}:{label:string;note:string}){
 return <div
  className="degree-preview"
  role="img"
  aria-label={label}
  style={{backgroundImage:"url('/assets/media/national-engineering-degree.webp')"}}
  onContextMenu={event=>event.preventDefault()}
  onDragStart={event=>event.preventDefault()}
  onCopy={event=>event.preventDefault()}
 >
  <span className="degree-watermark" aria-hidden="true">
   {Array.from({length:12}).map((_,index)=><span key={index}>WASSIMLAB · VIEW ONLY</span>)}
  </span>
  <span className="degree-preview-tag">{note}</span>
 </div>;
}
