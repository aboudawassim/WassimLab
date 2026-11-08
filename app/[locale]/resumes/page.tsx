import type {Metadata} from 'next';
import {localizedMetadata} from '@/lib/seo';
import {uiCopy} from '@/lib/ui-copy';
import type {Locale} from '@/lib/site';import {dictionary} from '@/lib/dictionary';import {ResumeExplorer} from '@/components/ResumeExplorer';
export async function generateMetadata({params}:{params:Promise<{locale:Locale}>}):Promise<Metadata>{const {locale}=await params,t=dictionary[locale];return localizedMetadata(locale,"resumes",t.resumesHeading,t.resumesSub);}
export default async function Resumes({params}:{params:Promise<{locale:Locale}>}){const {locale}=await params,t=dictionary[locale];return <div className="container subpage"><div className="subpage-head"><span className="eyebrow">{uiCopy[locale].sections.documents}</span><h1>{t.resumesHeading}</h1><p>{t.resumesSub}</p></div><ResumeExplorer locale={locale}/></div>}
