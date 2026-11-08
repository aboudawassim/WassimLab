import type {ReactNode} from 'react';
import '../globals.css';
import type {Metadata,Viewport} from 'next';
import {localizedMetadata} from '@/lib/seo';
import {notFound} from 'next/navigation';
import {dictionary} from '@/lib/dictionary';
import {locales, type Locale} from '@/lib/site';
import {Header,Footer} from '@/components/Shell';
import {AmbientField} from '@/components/AmbientField';
import {MotionProvider,PageTransition} from '@/components/MotionKit';
const preloadTheme = "try{var saved=localStorage.getItem('wassim-theme');var t=saved==='light'||saved==='dark'?saved:(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.dataset.theme=t}catch(e){}";
export const viewport:Viewport={themeColor:[{media:'(prefers-color-scheme: dark)',color:'#080a16'},{media:'(prefers-color-scheme: light)',color:'#f7f9ff'}],colorScheme:'dark light'};
export function generateStaticParams(){return locales.map(locale=>({locale}));}
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;const l=locales.includes(locale as Locale)?locale as Locale:'en';return localizedMetadata(l,'',dictionary[l].siteTitle,dictionary[l].heroDesc)}
export default async function LocaleLayout({children,params}:{children:ReactNode;params:Promise<{locale:string}>}){const {locale}=await params;if(!locales.includes(locale as Locale))notFound();return <html lang={locale} dir={locale==='ar'?'rtl':'ltr'} suppressHydrationWarning><head><link rel="preload" href="/fonts/dm-sans-400-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/>{locale==='ar'&&<link rel="preload" href="/fonts/tajawal-400-arabic.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/>}<script dangerouslySetInnerHTML={{__html:preloadTheme}}/></head><body><MotionProvider><div className="locale-shell"><div className="ambient-global" aria-hidden="true"/><AmbientField/><Header locale={locale as Locale}/><main id="main"><PageTransition>{children}</PageTransition></main><Footer locale={locale as Locale}/></div></MotionProvider></body></html>}
