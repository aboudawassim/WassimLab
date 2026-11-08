import type {Metadata} from 'next';
import {localizedMetadata} from '@/lib/seo';
import {uiCopy} from '@/lib/ui-copy';
import type {Locale} from '@/lib/site';
import {dictionary} from '@/lib/dictionary';
import {Reveal} from '@/components/MotionKit';
import {RoleCards} from '@/components/Cards';
import {ProcessExplorer} from '@/components/Visuals';

export async function generateMetadata({params}:{params:Promise<{locale:Locale}>}):Promise<Metadata>{const {locale}=await params,t=dictionary[locale];return localizedMetadata(locale,"expertise",t.rolesHeading,t.rolesSub);}

export default async function Expertise({params}:{params:Promise<{locale:Locale}>}){
 const {locale}=await params,t=dictionary[locale],u=uiCopy[locale];
 return <div className="container subpage">
  <Reveal className="subpage-head"><span className="eyebrow">01 / {u.sections.capabilities}</span><h1>{t.rolesHeading}</h1><p>{t.rolesSub}</p></Reveal>
  <RoleCards locale={locale}/>
  <section className="workflow-block" id="process">
   <Reveal className="section-heading"><span className="eyebrow">02 / {u.sections.lifecycle}</span><h2>{t.howHeading}</h2><p>{t.howSub}</p></Reveal>
   <ProcessExplorer locale={locale}/>
  </section>
 </div>;
}
