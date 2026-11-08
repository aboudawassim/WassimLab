import type {Metadata} from 'next';
import {localizedMetadata} from '@/lib/seo';
import {uiCopy} from '@/lib/ui-copy';
import type {Locale} from '@/lib/site';import {dictionary} from '@/lib/dictionary';import {ProjectCards} from '@/components/Cards';
export async function generateMetadata({params}:{params:Promise<{locale:Locale}>}):Promise<Metadata>{const {locale}=await params,t=dictionary[locale];return localizedMetadata(locale,"projects",t.projectsHeading,t.projectsSub);}
export default async function Projects({params}:{params:Promise<{locale:Locale}>}){const {locale}=await params,t=dictionary[locale];return <div className="container subpage"><div className="subpage-head"><span className="eyebrow">{uiCopy[locale].sections.links}</span><h1>{t.projectsHeading}</h1><p>{t.projectsSub}</p></div><ProjectCards locale={locale}/><p className="disclaimer">{t.disclaimer}</p></div>}
