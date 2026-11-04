import { useMemo } from 'react'
import Particles from '@tsparticles/react'
import { buildOptions } from '../particleSettings'

// Full-page particle layer that sits behind the dashboard tiles.
// The Playground sliders feed `settings`; changes apply live.
// The tsParticles engine itself is initialised once in main.jsx
// (ParticlesProvider), so this component only renders once it is ready.
export default function ParticlesBackground({ settings }) {
  const reducedMotion = useMemo(
    () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false,
    [],
  )

  const options = useMemo(() => {
    const o = buildOptions(settings, reducedMotion)
    // Listen on the whole window so hover effects work "through" the tiles.
    o.interactivity.detectsOn = 'window'
    return o
  }, [settings, reducedMotion])

  if (!settings.enabled) return null

  return <Particles id="bg-particles" className="particles-layer" options={options} />
}
