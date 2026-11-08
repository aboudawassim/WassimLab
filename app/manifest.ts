import type {MetadataRoute} from 'next';

export const dynamic='force-static';

export default function manifest():MetadataRoute.Manifest{
 return {
  name:'WassimLab — Mohamed Wassim Abouda',
  short_name:'WassimLab',
  description:'Portfolio of Mohamed Wassim Abouda: business analysis, IT project coordination, QA/UAT and full-stack engineering.',
  start_url:'/en/',
  display:'standalone',
  background_color:'#080a16',
  theme_color:'#080a16',
  icons:[
   {src:'/icon-192.png',sizes:'192x192',type:'image/png'},
   {src:'/icon-512.png',sizes:'512x512',type:'image/png'}
  ]
 };
}
