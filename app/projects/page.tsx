import Image from 'next/image'
import { getProjects } from '@/lib/projects'
export default async function ProjectsPage(){
  const projects=await getProjects()
  return (<div className="container py-10">
    <h1 className="h1">Projects</h1>
    <p className="mt-2 lead">Ongoing and upcoming.</p>
    {projects.length===0?(<div className="mt-8 rounded-xl border bg-white p-6 text-mute">No projects listed. Edit <code>content/projects.json</code>.</div>):(
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map(p=>(<div key={p.title} className="overflow-hidden rounded-xl border bg-white">
          {p.poster && (<div className="relative h-56 w-full bg-slate-100"><Image src={p.poster} alt={p.title} fill className="object-cover" /></div>)}
          <div className="p-4">
            <div className="font-serif text-2xl">{p.title}</div>
            <div className="mt-1 small">{p.stage} • ETA {p.eta}</div>
            <div className="mt-3 h-2 w-full rounded-full bg-slate-200"><div className="h-2 rounded-full bg-accent-600" style={{ width: p.percent + '%' }} /></div>
            <p className="mt-3 text-sm text-ink/80">{p.description}</p>
            {p.video_url && (<div className="mt-4 aspect-video w-full overflow-hidden rounded-xl border bg-black">
              <iframe src={p.video_url} title={p.title} className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>)}
          </div>
        </div>))}
      </div>)}
  </div>)}
