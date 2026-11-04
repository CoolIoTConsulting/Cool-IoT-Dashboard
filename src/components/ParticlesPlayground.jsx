import { useState } from 'react'
import { DEFAULT_PARTICLES, MODES, PALETTES } from '../particleSettings'

function Slider({ label, value, min, max, step = 1, onChange }) {
  return (
    <label className="slider">
      <span>
        {label} <b>{value}</b>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  )
}

// Collapsed by default so it never competes with the Contact form.
// The particles keep running with the saved settings either way; the sliders
// change the live background behind the whole dashboard.
export default function ParticlesPlayground({ settings, setSettings }) {
  const [open, setOpen] = useState(false)
  const update = (key) => (value) => setSettings((s) => ({ ...s, [key]: value }))

  return (
    <section className="tile tile-play" aria-labelledby="play-title">
      <h2 id="play-title" className="play-heading">
        <button
          className="play-toggle"
          aria-expanded={open}
          aria-controls="play-panel"
          onClick={() => setOpen((o) => !o)}
        >
          <span>
            <span className="eyebrow">Just for fun</span>
            <span className="play-title">Particles Playground</span>
          </span>
          <svg className="chevron" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </h2>

      <div id="play-panel" className={`play-panel ${open ? 'open' : ''}`}>
        <div className="play-inner">
          <p className="muted small">Tweak the background. Your settings are remembered on this device.</p>

          <label className="toggle">
            <input
              type="checkbox"
              checked={settings.enabled}
              onChange={(e) => update('enabled')(e.target.checked)}
            />
            Particles on
          </label>

          <div className="controls" aria-disabled={!settings.enabled}>
            <Slider label="Count" min={10} max={200} value={settings.count} onChange={update('count')} />
            <Slider label="Speed" min={0.2} max={6} step={0.2} value={settings.speed} onChange={update('speed')} />
            <Slider label="Size" min={1} max={10} value={settings.size} onChange={update('size')} />
            <Slider
              label="Link distance"
              min={40}
              max={300}
              step={10}
              value={settings.linkDistance}
              onChange={update('linkDistance')}
            />

            <label className="toggle">
              <input
                type="checkbox"
                checked={settings.links}
                onChange={(e) => update('links')(e.target.checked)}
              />
              Draw links
            </label>

            <div className="row">
              <label className="select">
                Mouse effect
                <select value={settings.mode} onChange={(e) => update('mode')(e.target.value)}>
                  {MODES.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="select">
                Palette
                <select value={PALETTES[settings.palette] ? settings.palette : 'brand'} onChange={(e) => update('palette')(e.target.value)}>
                  {Object.entries(PALETTES).map(([key, p]) => (
                    <option key={key} value={key}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <button className="btn btn-ghost" onClick={() => setSettings(DEFAULT_PARTICLES)}>
            Reset to defaults
          </button>
        </div>
      </div>
    </section>
  )
}
