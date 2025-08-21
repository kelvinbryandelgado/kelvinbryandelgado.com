import Link from 'next/link'
import Image from 'next/image'
import { getAllWorks } from '@/lib/works'
export const dynamic='force-static'
export default async function WorksIndex({ searchParams }:{ searchParams:{ type?: string }}){
  const type=searchParams?.type
  const works=await getAllWorks({ publishedOnly:true, type })
  return (<div className="container py-10">
    <h1 className="h1">Works</h1>
    <p className="mt-2 lead">Stories, essays, reviews, and films.</p>
    <div className="mt-6 flex gap-3 text-sm">
      <Link href="/works" className={!type ? 'font-semibold' : ''}>All</Link>
      <Link href="/works?type=story" className={type==='story'?'font-semibold':''}>Stories</Link>
      <Link href="/works?type=essay" className={type==='essay'?'font-semibold':''}>Essays</Link>
      <Link href="/works?type=review" className={type==='review'?'font-semibold':''}>Reviews</Link>
      <Link href="/works?type=film" className={type==='film'?'font-semibold':''}>Films</Link>
    </div>
    {works.length===0?(<div className="mt-8 rounded-xl border bg-white p-6 text-mute">No works yet. Add files in <code>content/works</code>.</div>):(
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {works.map(w=>(
          <Link key={w.slug} href={`/works/${w.slug}`} className="no-underline">
            <div className="overflow-hidden rounded-xl border bg-white">
              {w.cover&&(<div className="relative h-44 w-full bg-slate-100">
                <Image src={w.cover} alt={w.title} fill className="object-cover" /></div>)}
              <div className="p-4">
                <div className="font-serif text-xl">{w.title}</div>
                <div className="mt-1 small capitalize">{w.type} • {w.date}</div>
                <p className="mt-2 line-clamp-3 text-sm text-ink/80">{w.summary}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>)}
  </div>)}
