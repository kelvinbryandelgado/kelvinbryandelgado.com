import Link from 'next/link'
import Image from 'next/image'
import site from '@/site.config.json'
import { getAllWorks } from '@/lib/works'
import { getProjects } from '@/lib/projects'

export default async function HomePage() {
  const works = await getAllWorks({ limit: 6, publishedOnly: true })
  const projects = await getProjects()

  return (
    <div>
      <section className="relative">
        <div className="relative h-[52vh] w-full bg-gradient-to-br from-accent-700 to-accent-600 text-white">
          <div className="absolute inset-0 opacity-20">
            <Image src="/hero.jpg" alt="" fill className="object-cover" priority />
          </div>
          <div className="container relative flex h-full items-center">
            <div className="max-w-2xl">
              <h1 className="h1">{site.tagline}</h1>
              <p className="mt-3 lead">Essays, stories, reviews, and films — alongside projects in progress.</p>
              <div className="mt-6 flex gap-3">
                <Link href="/works" className="rounded-full border bg-white/10 px-4 py-2 text-sm hover:bg-white/20">Explore Works</Link>
                <Link href="/projects" className="rounded-full border bg-white/10 px-4 py-2 text-sm hover:bg-white/20">In Progress</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container -mt-10">
          <blockquote className="rounded-2xl border bg-white p-6 shadow-sm md:p-8">
            <p className="quote">“{site.quote.text}”</p>
            <footer className="mt-2 small">— {site.quote.author}</footer>
          </blockquote>
        </div>
      </section>

      <section className="container py-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="h2">Published Works</h2>
          <Link href="/works" className="text-sm">All Works →</Link>
        </div>
        {works.length === 0 ? (
          <div className="rounded-xl border bg-white p-6 text-mute">No works yet published.</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {works.map(w => (
              <Link key={w.slug} href={`/works/${w.slug}`} className="group no-underline">
                <div className="overflow-hidden rounded-xl border bg-white">
                  {w.cover && (
                    <div className="relative h-44 w-full bg-slate-100">
                      <Image src={w.cover} alt={w.title} fill className="object-cover transition group-hover:scale-[1.02]" />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="font-serif text-xl">{w.title}</div>
                    <div className="mt-1 small capitalize">{w.type} • {w.date}</div>
                    <p className="mt-2 line-clamp-3 text-sm text-ink/80">{w.summary}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="container pb-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="h2">Projects in Progress</h2>
          <Link href="/projects" className="text-sm">All Projects →</Link>
        </div>
        {projects.length === 0 ? (
          <div className="rounded-xl border bg-white p-6 text-mute">No projects listed yet.</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {projects.slice(0,3).map(p => (
              <div key={p.title} className="rounded-xl border bg-white p-4">
                <div className="font-serif text-lg">{p.title}</div>
                <div className="mt-1 small">{p.stage} • ETA {p.eta}</div>
                <div className="mt-3 h-2 w-full rounded-full bg-slate-200">
                  <div className="h-2 rounded-full bg-accent-600" style={{ width: p.percent + '%' }} />
                </div>
                <p className="mt-3 text-sm text-ink/80">{p.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
