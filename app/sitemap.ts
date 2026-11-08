import type {MetadataRoute} from 'next';import {roles,locales} from '@/lib/site';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{const base='https://wassimlab.web.app';const pages=['','expertise','projects','experience','resumes','contact',...roles.map(r=>'expertise/'+r.slug)];return locales.flatMap(l=>pages.map(p=>({url:`${base}/${l}/${p?p+'/':''}`,changeFrequency:'monthly' as const,priority:p?0.65:1})));}
