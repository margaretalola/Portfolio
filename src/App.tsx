import { useState } from 'react'
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Experience from "@/components/Experience"
import ProjectShowcase from "@/components/ProjectShowcase"
import Skills from "@/components/Skills"
import Certifications from "@/components/Certifications"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import ExploreButton from "@/components/ExploreButton"
import SectionTracker from "@/components/SectionTracker"
import UniverseGame from "@/universe/UniverseGame"
import { GamificationProvider } from "@/contexts/GamificationContext"

export default function App() {
  const [showUniverse, setShowUniverse] = useState(false)

  return (
    <GamificationProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <About />
          <Experience />
          <ProjectShowcase />
          <Skills />
          <Certifications />
          <Contact />
        </main>
        <Footer />
        <ExploreButton onClick={() => setShowUniverse(true)} />
        <SectionTracker />
      </div>

      {showUniverse && (
        <div id="universe">
          <UniverseGame
            onExit={() => setShowUniverse(false)}
          />
        </div>
      )}
    </GamificationProvider>
  )
}
