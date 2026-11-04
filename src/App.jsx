import { useEffect } from 'react'
import ContactCard from './components/ContactCard'
import KnowledgeBase from './components/KnowledgeBase'
import ArticlesFeed from './components/ArticlesFeed'
import SocialsCard from './components/SocialsCard'
import ParticlesPlayground from './components/ParticlesPlayground'
import ParticlesBackground from './components/ParticlesBackground'
import ThemeToggle from './components/ThemeToggle'
import { useLocalStorage } from './hooks/useLocalStorage'
import { DEFAULT_PARTICLES } from './particleSettings'
import { SITE } from './config'

const base = import.meta.env.BASE_URL

export default function App() {
  const [particles, setParticles] = useLocalStorage('cooliot-dashboard:particles', DEFAULT_PARTICLES)
  const [theme, setTheme] = useLocalStorage('cooliot-dashboard:theme', 'dark')

  // index.html sets the initial value before paint; this keeps it in sync on toggle.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'light' ? 'light' : 'dark')
  }, [theme])

  return (
    <>
      <ParticlesBackground settings={particles} />
      <ThemeToggle theme={theme} setTheme={setTheme} />

      <main className="page">
        <header className="hero">
          {/* The logo files already contain the name and slogan. */}
          <img
            className="logo"
            src={`${base}${theme === 'light' ? 'logo-light.png' : 'logo-dark.png'}`}
            alt={`${SITE.name} - ${SITE.tagline}`}
            width="720"
            height="691"
          />
        </header>

        {/* Reading order (and mobile order): Contact, Knowledge Base, Articles,
            Socials, Playground. On desktop they pair up two per row. */}
        <div className="bento">
          <ContactCard />
          <KnowledgeBase />
          <ArticlesFeed />
          <SocialsCard />
          <ParticlesPlayground settings={particles} setSettings={setParticles} />
        </div>
      </main>
    </>
  )
}
