import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ParticlesProvider } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import '@fontsource-variable/outfit'
import '@fontsource-variable/inter'
import './styles.css'
import App from './App'

// Must be a stable function (defined once, outside any component).
const initParticles = async (engine) => {
  await loadSlim(engine)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ParticlesProvider init={initParticles}>
      <App />
    </ParticlesProvider>
  </StrictMode>,
)
