import type {Metadata} from 'next';
import type {Locale} from './site';

const base='https://wassimlab.web.app';
/** The static-export equivalent page must exist in every supported language. */
export function localizedMetadata(locale:Locale,path:string,title:string,description:string):Metadata{
 const suffix=path?path.replace(/^\/+|\/+$/g,'')+'/':'';
 const url=(lang:Locale)=>`${base}/${lang}/${suffix}`;
 return {
  metadataBase:new URL(base),title,description,
  alternates:{canonical:url(locale),languages:{en:url('en'),fr:url('fr'),ar:url('ar'),'x-default':url('en')}},
  openGraph:{type:'website',title,description,url:url(locale),siteName:'WassimLab',images:[{url:`${base}/og-image.png`,width:1200,height:630,alt:'WassimLab professional portfolio'}]},
  icons:{
   icon:[{url:'/favicon.ico',sizes:'any'},{url:'/favicon.svg',type:'image/svg+xml'},{url:'/icon-192.png',sizes:'192x192',type:'image/png'}],
   shortcut:['/favicon.ico'],
   apple:[{url:'/apple-touch-icon.png',sizes:'180x180',type:'image/png'}]
  },
  manifest:'/manifest.webmanifest',
  robots:{index:true,follow:true}
 };
}
