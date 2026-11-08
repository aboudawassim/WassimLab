import type {Metadata} from 'next';
import Link from 'next/link';

export const metadata:Metadata={title:'WassimLab',description:'Redirecting to the English portfolio.',robots:{index:false,follow:true}};

export default function Root(){return <main lang="en"><meta httpEquiv="refresh" content="0;url=/en/"/><p>Redirecting to English. <Link href="/en/">Continue</Link></p></main>}
