'use client';

import {useState} from 'react';
import type {ChangeEvent, FormEvent} from 'react';

export type ContactFormLabels={
 name:string;email:string;subject:string;message:string;submit:string;hint:string;
 sending:string;success:string;error:string;
 errName:string;errEmail:string;errSubject:string;errMessage:string;
 placeholderName:string;placeholderEmail:string;placeholderSubject:string;placeholderMessage:string;
 attachment:string;attachmentHint:string;attachmentRemove:string;errFile:string;errFileSize:string;
};

const ENDPOINT='https://formsubmit.co/ajax/med.wassim.abouda@gmail.com';
const MAIL_PATTERN=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_FILE_BYTES=10*1024*1024;
const ACCEPTED_TYPES=['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document','image/png','image/jpeg','image/webp'];
const ACCEPT_ATTR='.pdf,.doc,.docx,.png,.jpg,.jpeg,.webp';
type Values={name:string;email:string;subject:string;message:string};
type Status='idle'|'sending'|'success'|'error';

export default function ContactForm({labels}:{labels:ContactFormLabels}){
 const [values,setValues]=useState<Values>({name:'',email:'',subject:'',message:''});
 const [errors,setErrors]=useState<Partial<Record<keyof Values,string>>>({});
 const [file,setFile]=useState<File|null>(null);
 const [fileError,setFileError]=useState('');
 const [status,setStatus]=useState<Status>('idle');
 const sending=status==='sending';

 function field(key:keyof Values){
  return {
   id:`contact-${key}`,
   name:key,
   value:values[key],
   disabled:sending,
   'aria-invalid':errors[key]?('true' as const):undefined,
   'aria-describedby':errors[key]?`contact-${key}-error`:undefined,
   onChange:(event:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
    setValues(prev=>({...prev,[key]:event.target.value}));
    if(errors[key])setErrors(prev=>({...prev,[key]:undefined}));
    if(status!=='idle')setStatus('idle');
   }
  };
 }

 function onFile(event:ChangeEvent<HTMLInputElement>){
  const next=event.target.files?.[0]??null;
  setFileError('');
  if(status!=='idle')setStatus('idle');
  if(!next){setFile(null);return}
  if(next.size>MAX_FILE_BYTES){setFile(null);setFileError(labels.errFileSize);event.target.value='';return}
  if(!ACCEPTED_TYPES.includes(next.type)){setFile(null);setFileError(labels.errFile);event.target.value='';return}
  setFile(next);
 }

 function clearFile(){
  setFile(null);
  setFileError('');
  const input=document.getElementById('contact-attachment') as HTMLInputElement|null;
  if(input)input.value='';
 }

 function validate(){
  const next:Partial<Record<keyof Values,string>>={};
  if(!values.name.trim())next.name=labels.errName;
  if(!MAIL_PATTERN.test(values.email.trim()))next.email=labels.errEmail;
  if(!values.subject.trim())next.subject=labels.errSubject;
  if(values.message.trim().length<10)next.message=labels.errMessage;
  setErrors(next);
  return Object.keys(next).length===0;
 }

 async function onSubmit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();
  if(sending||!validate())return;
  if(file&&file.size>MAX_FILE_BYTES){setFileError(labels.errFileSize);return}
  setStatus('sending');
  try{
   const body=new FormData();
   body.append('name',values.name.trim());
   body.append('email',values.email.trim());
   body.append('subject',values.subject.trim());
   body.append('message',values.message.trim());
   body.append('_subject',`${values.subject.trim()} — ${values.name.trim()}`);
   body.append('_template','table');
   body.append('_captcha','false');
   body.append('_honey','');
   if(file)body.append('attachment',file,file.name);
   const response=await fetch(ENDPOINT,{method:'POST',headers:{Accept:'application/json'},body});
   const data=await response.json().catch(()=>null);
   const ok=response.ok&&(data?.success==='true'||data?.success===true);
   if(!ok)throw new Error('Submission failed');
   setStatus('success');
   setValues({name:'',email:'',subject:'',message:''});
   clearFile();
  }catch{
   setStatus('error');
  }
 }

 return <form className="contact-form" onSubmit={onSubmit} encType="multipart/form-data" noValidate aria-busy={sending}>
  <div className="contact-field">
   <label htmlFor="contact-name">{labels.name}</label>
   <input {...field('name')} type="text" autoComplete="name" maxLength={80} placeholder={labels.placeholderName} required/>
   {errors.name&&<span className="contact-error" id="contact-name-error">{errors.name}</span>}
  </div>
  <div className="contact-field">
   <label htmlFor="contact-email">{labels.email}</label>
   <input {...field('email')} type="email" autoComplete="email" inputMode="email" maxLength={120} placeholder={labels.placeholderEmail} required/>
   {errors.email&&<span className="contact-error" id="contact-email-error">{errors.email}</span>}
  </div>
  <div className="contact-field full">
   <label htmlFor="contact-subject">{labels.subject}</label>
   <input {...field('subject')} type="text" autoComplete="off" maxLength={120} placeholder={labels.placeholderSubject} required/>
   {errors.subject&&<span className="contact-error" id="contact-subject-error">{errors.subject}</span>}
  </div>
  <div className="contact-field full">
   <label htmlFor="contact-message">{labels.message}</label>
   <textarea {...field('message')} rows={6} maxLength={2000} placeholder={labels.placeholderMessage} required/>
   {errors.message&&<span className="contact-error" id="contact-message-error">{errors.message}</span>}
  </div>
  <div className="contact-field full">
   <label htmlFor="contact-attachment">{labels.attachment}</label>
   <div className="contact-file">
    <input id="contact-attachment" name="attachment" type="file" accept={ACCEPT_ATTR} onChange={onFile} disabled={sending} aria-describedby={fileError?'contact-attachment-error':undefined} aria-invalid={fileError?'true':undefined}/>
    <span className="contact-file-note">{file?`${file.name} · ${(file.size/1024/1024).toFixed(2)} MB`:labels.attachmentHint}</span>
    {file&&<button type="button" className="contact-file-remove" onClick={clearFile} disabled={sending}>{labels.attachmentRemove}</button>}
   </div>
   {fileError&&<span className="contact-error" id="contact-attachment-error">{fileError}</span>}
  </div>
  <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="contact-honey"/>
  <div className="contact-form-actions">
   <button className="btn primary" type="submit" disabled={sending}>{sending?labels.sending:labels.submit} {sending?'…':'↗'}</button>
   <p className="contact-form-hint">{labels.hint}</p>
  </div>
  <p className={status==='error'?'contact-status-line is-error':'contact-status-line'} role="status" aria-live="polite">
   {status==='success'&&labels.success}
   {status==='error'&&labels.error}
  </p>
 </form>;
}
