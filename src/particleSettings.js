// Defaults, palettes and the settings -> tsParticles options translation.
// Everything the Playground sliders control lives here.

export const DEFAULT_PARTICLES = {
  enabled: true,
  count: 60,
  speed: 1.2,
  size: 3,
  linkDistance: 140,
  links: true,
  mode: 'grab', // grab | repulse | bubble | attract | none
  palette: 'brand',
}

export const PALETTES = {
  brand: { label: 'Brand', colors: ['#22d3ee', '#6366f1', '#f59e0b'] },
  // Every palette needs to stay visible on both the dark and the light background.
  neon: { label: 'Neon', colors: ['#f472b6', '#22d3ee', '#8b5cf6', '#f59e0b'] },
  sunset: { label: 'Sunset', colors: ['#fb923c', '#f43f5e', '#c084fc'] },
  ocean: { label: 'Ocean', colors: ['#0ea5e9', '#2563eb', '#14b8a6'] },
}

export const MODES = [
  { value: 'grab', label: 'Grab' },
  { value: 'repulse', label: 'Repulse' },
  { value: 'bubble', label: 'Bubble' },
  { value: 'attract', label: 'Attract' },
  { value: 'none', label: 'Off' },
]

export function buildOptions(s, reducedMotion) {
  const colors = (PALETTES[s.palette] || PALETTES.brand).colors
  const linkColor = colors[0]
  const onHover =
    s.mode === 'none'
      ? { enable: false }
      : { enable: true, mode: s.mode }

  return {
    fullScreen: { enable: false },
    background: { color: 'transparent' },
    fpsLimit: 60,
    detectRetina: true,
    particles: {
      number: { value: s.count, density: { enable: false } },
      // tsParticles v4 moved particle colors into `paint`.
      paint: { fill: { enable: true, color: { value: colors } } },
      opacity: { value: { min: 0.35, max: 0.9 } },
      size: { value: { min: Math.max(1, s.size * 0.5), max: s.size * 1.5 } },
      links: {
        enable: s.links,
        distance: s.linkDistance,
        color: linkColor,
        opacity: 0.25,
        width: 1,
      },
      move: {
        enable: !reducedMotion,
        speed: s.speed,
        outModes: { default: 'bounce' },
      },
    },
    interactivity: {
      events: { onHover, resize: { enable: true } },
      modes: {
        grab: { distance: 180, links: { opacity: 0.7 } },
        repulse: { distance: 120, duration: 0.4 },
        bubble: { distance: 160, size: s.size * 2.5, duration: 0.4, opacity: 1 },
        attract: { distance: 200, duration: 0.4, speed: 1 },
      },
    },
  }
}
