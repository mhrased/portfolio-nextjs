import Grain from '@/components/Grain'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Pipeline from '@/components/sections/Pipeline'
import Work from '@/components/sections/Work'
import Process from '@/components/sections/Process'
import Contact from '@/components/sections/Contact'
import RevealObserver from '@/components/RevealObserver'
import {
  getSiteData,
  getHeroData,
  getExperience,
  getSkills,
  getProjects,
  getProcessData,
} from '@/lib/data.server'
import { getLatestCommits } from '@/lib/commits'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const site = getSiteData()
  const hero = getHeroData()
  const experience = getExperience()
  const skills = getSkills()
  const projects = getProjects()
  const process = getProcessData()
  const commits = await getLatestCommits()

  return (
    <>
      <RevealObserver />
      <Grain />
      <Navbar site={site} />

      <Hero site={site} hero={hero} commits={commits} />

      <div className="section-divider" />
      <About site={site} experience={experience} />

      <div className="section-divider" />
      <Skills skills={skills} />

      <div className="section-divider" />
      <Pipeline />

      <div className="section-divider" />
      <Work projects={projects} />

      <div className="section-divider" />
      <Process process={process} />

      <div className="section-divider" />
      <Contact site={site} />

      <Footer site={site} />
    </>
  )
}
