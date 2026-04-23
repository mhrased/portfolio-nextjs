'use client'

import { useEffect } from 'react'
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

export default function Home() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <Grain />
      <Navbar />

      <Hero />

      <div className="section-divider" />
      <About />

      <div className="section-divider" />
      <Skills />

      <div className="section-divider" />
      <Pipeline />

      <div className="section-divider" />
      <Work />

      <div className="section-divider" />
      <Process />

      <div className="section-divider" />
      <Contact />

      <Footer />
    </>
  )
}
