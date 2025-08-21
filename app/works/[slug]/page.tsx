import Image from 'next/image'
import Link from 'next/link'
import { getAllWorks, getWork } from '@/lib/works'
import type { Metadata } from 'next'
type Props={ params:{ slug:string } }
export async function generateStaticParams(){ const items=await getAllWorks(); return items.map(i=>({ slug:i.slug }))}
export async function generateMetadata({ params }:Props): Promise<Metadata>{ const item=await getWork(params.slug); return { title:item?.title??'Work', description:item?.summary??'' } }
export default async function WorkPage({ params }:Props){
  const item=await getWork(params.slug); if(!item) return <div className="container py-10">Not found.</div>
  if(item.external_url && !item.body){ return (<div className="container py-10">
    <h1 className="h1">{item.title}</h1>
    <div className="mt-1 small capitalize">{item.type} • {item.date}</div>
    {item.cover && (<div className="relative mt-6 h-72 w-full overflow-hidden rounded-xl border bg-slate-100"><Image src={item.cover} alt={item.title} fill className="object-cover" /></div>)}
    <p className="mt-6 text-ink/80">{item.summary}</p>
    <a className="mt-6 inline-block rounded-full border bg-white px-4 py-2 text-sm no-underline hover:bg-slate-50" href={item.external_url} target="_blank">Read / Watch externally →</a>
  </div>)}
  return (<div className="container py-10">
    <h1 className="h1">{item.title}</h1>
    <div className="mt-1 small capitalize">{item.type} • {item.date}</div>
    {item.cover && (<div className="relative mt-6 h-72 w-full overflow-hidden rounded-xl border bg-slate-100"><Image src={item.cover} alt={item.title} fill className="object-cover" /></div>)}
    {item.type==='film' && item.video_url && (<div className="mt-6 aspect-video w-full overflow-hidden rounded-xl border bg-black">
      <iframe src={item.video_url} title={item.title} className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>)}
    <article className="prose prose-slate mt-8 max-w-none prose-headings:font-serif"><div dangerouslySetInnerHTML={{ __html: item.body || '' }} /></article>
    <div className="mt-8"><Link href="/works" className="text-sm">← Back to works</Link></div>
  </div>)}
}
