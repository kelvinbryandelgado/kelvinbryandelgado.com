import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import Image from 'next/image'
import site from '@/site.config.json'
import { EB_Garamond, Source_Sans_3 } from 'next/font/google'

const garamond = EB_Garamond({ subsets: ['latin'], variable: '--font-eb-garamond' })
const sourceSans = Source_Sans_3({ subsets: ['latin'], variable: '--font-source-sans' })

export const metadata: Metadata = {
  title: site.siteName,
  description: 'Essays, stories, reviews, and films — alongside projects in progress.',
  metadataBase: new URL('https://' + site.domain),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${garamond.variable} ${sourceSans.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="container flex h-16 items-center justify-between">
        <Link className="flex items-center gap-3 no-underline" href="/">
          <Image src="/logo.png" alt="Logo" width={36} height={36} className="rounded-full border" />
          <div className="leading-tight">
            <div className="font-serif text-xl">{site.siteName}</div>
            <div className="small">{site.tagline}</div>
          </div>
        </Link>
        <nav className="hidden gap-6 md:flex">
          <div className="nav-item">
            <Link href="/works" className="no-underline text-sm">Works</Link>
            <div className="dropdown">
              <Link href="/works?type=story">Stories</Link>
              <Link href="/works?type=essay">Essays</Link>
              <Link href="/works?type=review">Reviews</Link>
              <Link href="/works?type=film">Films</Link>
            </div>
          </div>
          <div className="nav-item">
            <Link href="/projects" className="no-underline text-sm">Projects</Link>
            <div className="dropdown">
              <Link href="/projects">All Projects</Link>
              <Link href="/projects#upcoming">Upcoming</Link>
            </div>
          </div>
          <div className="nav-item">
            <Link href="/about" className="no-underline text-sm">About</Link>
            <div className="dropdown">
              <Link href="/about#bio">Bio</Link>
              <Link href="/about#contact">Contact</Link>
              <Link href="/about#press">Press</Link>
            </div>
          </div>
          <div className="nav-item">
            <Link href="/patreon" className="no-underline text-sm">Patreon</Link>
            <div className="dropdown">
              {site.social.patreon ? <a href={site.social.patreon} target="_blank">Become a Patron</a> : <span className="block px-3 py-2 text-mute">Add patreon link in site.config.json</span>}
              <a href="/patreon#tiers">Tiers</a>
              <a href="/patreon#rewards">Rewards</a>
            </div>
          </div>
          <div className="nav-item">
            <Link href="/resources" className="no-underline text-sm">Resources</Link>
            <div className="dropdown">
              <Link href="/resources#reading">Reading Lists</Link>
              <Link href="/resources#links">Links</Link>
              <Link href="/resources#notes">Notes</Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container py-10 text-sm text-mute">
        © {new Date().getFullYear()} {site.siteName}. All rights reserved.
      </div>
    </footer>
  )
}
