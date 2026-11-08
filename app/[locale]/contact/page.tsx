import type {Metadata} from 'next';
import Link from 'next/link';
import {localizedMetadata} from '@/lib/seo';
import {uiCopy} from '@/lib/ui-copy';
import type {Locale} from '@/lib/site';
import {dictionary} from '@/lib/dictionary';
import {MotionAction} from '@/components/MotionKit';
import ContactForm from '@/components/ContactForm';

const EMAIL='med.wassim.abouda@gmail.com';
const PHONE='+97450706084';
const PHONE_DISPLAY='+974 5070 6084';
const LINKEDIN='https://www.linkedin.com/in/abouda-mdwassim/';
const GITHUB='https://github.com/aboudawassim';

type IconName='pin'|'mail'|'phone'|'linkedin'|'github';

function ContactIcon({name}:{name:IconName}){
 if(name==='linkedin')return <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>;
 if(name==='github')return <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>;
 const paths:Record<'pin'|'mail'|'phone',string>={
  pin:'M12 21s7-5.686 7-11a7 7 0 1 0-14 0c0 5.314 7 11 7 11z M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  mail:'M3.5 6.5h17v11h-17z M3.5 7l8.5 6 8.5-6',
  phone:'M6.6 3.5 9 6l-1.6 2.3a13.4 13.4 0 0 0 8.3 8.3L18 15l2.5 2.4-1.4 2.1a2 2 0 0 1-2.2.8A17.6 17.6 0 0 1 3.7 7.1a2 2 0 0 1 .8-2.2z'
 };
 return <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]}/></svg>;
}

function DetailIcon({name}:{name:IconName}){return <span className="contact-icon" aria-hidden="true"><ContactIcon name={name}/></span>;}

export async function generateMetadata({params}:{params:Promise<{locale:Locale}>}):Promise<Metadata>{
 const {locale}=await params,t=dictionary[locale];
 return localizedMetadata(locale,'contact',t.contactHeading,t.contactSub);
}

export default async function Contact({params}:{params:Promise<{locale:Locale}>}){
 const {locale}=await params;
 const t=dictionary[locale],c=uiCopy[locale].contact;
 const discussHref=`mailto:${EMAIL}?subject=${encodeURIComponent(c.discuss)}`;
 return <div className="container subpage contact-page">
  <link rel="preconnect" href="https://formsubmit.co"/>
  <link rel="dns-prefetch" href="https://formsubmit.co"/>
  <div className="subpage-head contact-head">
   <span className="eyebrow">WASSIMLAB / {uiCopy[locale].sections.contact}</span>
   <h1>{t.contactHeading}</h1>
   <p>{t.contactSub}</p>
   <div className="contact-meta">
    <span className="contact-status"><i className="status-dot" aria-hidden="true"/>{c.availability}</span>
    <span>{c.rateValue} {c.rateUnit}</span>
   </div>
  </div>

  <div className="contact-grid">
   <div className="contact-side">
    <div className="content-panel contact-panel contact-details">
     <div className="contact-panel-head">
      <span className="eyebrow">{c.detailsEyebrow}</span>
      <h2>{c.detailsTitle}</h2>
     </div>
     <dl className="contact-list">
      <div>
       <dt><DetailIcon name="pin"/>{c.location}</dt>
       <dd>{c.locationValue}</dd>
      </div>
      <div>
       <dt><DetailIcon name="mail"/>{c.emailLabel}</dt>
       <dd><a href={`mailto:${EMAIL}`}>{EMAIL}</a></dd>
      </div>
      <div>
       <dt><DetailIcon name="phone"/>{c.phoneLabel}</dt>
       <dd><a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a></dd>
      </div>
      <div>
       <dt><DetailIcon name="linkedin"/>LinkedIn</dt>
       <dd><a href={LINKEDIN} target="_blank" rel="noopener noreferrer">{c.linkedin} ↗</a></dd>
      </div>
      <div>
       <dt><DetailIcon name="github"/>GitHub</dt>
       <dd><a href={GITHUB} target="_blank" rel="noopener noreferrer">{c.github} ↗</a></dd>
      </div>
     </dl>
     <a className="contact-direct" href={`mailto:${EMAIL}`}>{c.emailDirect} ↗</a>
    </div>

    <div className="content-panel contact-panel contact-rate">
     <div className="contact-panel-head">
      <span className="eyebrow">{c.rateEyebrow}</span>
      <h2>{c.rateTitle}</h2>
     </div>
     <div className="rate-value"><b>{c.rateValue}</b><span>{c.rateUnit}</span></div>
     <p>{c.rateNote}</p>
     <div className="rate-tags">{c.rateTags.map(tag=><span key={tag}>{tag}</span>)}</div>
    </div>
   </div>

   <div className="content-panel contact-panel contact-form-panel">
    <div className="contact-panel-head">
     <span className="eyebrow">{c.formEyebrow}</span>
     <h2>{c.formTitle}</h2>
     <p>{c.formNote}</p>
    </div>
    <ContactForm labels={{
     name:c.name,email:c.email,subject:c.subject,message:c.message,submit:c.submit,hint:c.formHint,
     sending:c.sending,success:c.success,error:c.error,
     errName:c.errName,errEmail:c.errEmail,errSubject:c.errSubject,errMessage:c.errMessage,
     placeholderName:c.placeholderName,placeholderEmail:c.placeholderEmail,placeholderSubject:c.placeholderSubject,placeholderMessage:c.placeholderMessage,
     attachment:c.attachment,attachmentHint:c.attachmentHint,attachmentRemove:c.attachmentRemove,errFile:c.errFile,errFileSize:c.errFileSize
    }}/>
   </div>
  </div>

  <div className="contact-cta contact-cta-page">
   <div>
    <span className="eyebrow">WASSIMLAB / {uiCopy[locale].sections.contact}</span>
    <h2>{c.openTitle}</h2>
    <p>{c.openText}</p>
    <div className="contact-cta-actions">
     <MotionAction><a className="btn white" href={discussHref}>{c.discuss} ↗</a></MotionAction>
     <MotionAction><Link className="contact-cta-link" href={`/${locale}/resumes/`}>{c.cvs} ↓</Link></MotionAction>
    </div>
   </div>
   <span className="cta-mark" aria-hidden="true">W.</span>
  </div>
 </div>;
}
