import HeroCard from '@/components/HeroCard'
import PhotoStrip from '@/components/PhotoStrip'
import ProjectsCard from '@/components/ProjectsCard'
import AboutCard from '@/components/AboutCard'
import CurrentlyCard from '@/components/CurrentlyCard'
import IITCard from '@/components/IITCard'
import Footer from '@/components/Footer'

async function getStars(repo: string, fallback: number): Promise<number> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: { Accept: 'application/vnd.github+json' },
      next: { revalidate: false },
    })
    if (!res.ok) return fallback
    const data = await res.json()
    return data.stargazers_count ?? fallback
  } catch {
    return fallback
  }
}

export default async function Home() {
  const [youtubeStars, buildInPublicStars] = await Promise.all([
    getStars('rav4nn/youtube-rag-scraper', 55),
    getStars('rav4nn/buildinpublic-x', 0),
  ])

  return (
    <main className="min-h-screen bg-page-bg p-4 md:p-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Row 1: Hero (2 cols) + About (1 col) */}
        <div className="md:col-span-2">
          <HeroCard />
        </div>
        <div className="md:col-span-1">
          <AboutCard />
        </div>

        {/* Row 2: Photo Strip (full width) */}
        <div className="md:col-span-3">
          <PhotoStrip />
        </div>

        {/* Row 3+4: Projects (2 cols, tall) + Currently + IIT stacked */}
        <div className="md:col-span-2 md:row-span-2">
          <ProjectsCard youtubeStars={youtubeStars} buildInPublicStars={buildInPublicStars} />
        </div>
        <div className="md:col-span-1">
          <CurrentlyCard />
        </div>
        <div className="md:col-span-1">
          <IITCard />
        </div>

        {/* Footer (full width) */}
        <div className="md:col-span-3">
          <Footer />
        </div>
      </div>
    </main>
  )
}
