import { siGithub, siInstagram, siYoutube } from 'simple-icons'
import LogoIcon from './LogoIcon'

// Brand icons come bundled from the `simple-icons` npm package (no external
// requests). GitHub's brand color is near-black, so it follows the theme text
// color instead and stays visible in dark mode.
const BRAND = {
  youtube: { path: siYoutube.path, color: '#FF0000' },
  github: { path: siGithub.path, color: 'currentColor' },
  instagram: { path: siInstagram.path, color: '#E4405F' },
}

export default function SocialIcon({ name }) {
  if (name === 'nextdoor') {
    // The packaged Nextdoor mark is only a wordmark (unreadable at icon size),
    // so use a simple house glyph in Nextdoor green instead.
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#00B246" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
      </svg>
    )
  }

  if (name === 'website') {
    // Cool IoT icon logo for the main website link.
    return <LogoIcon size={26} />
  }

  const icon = BRAND[name]
  if (!icon) return null
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill={icon.color} aria-hidden="true">
      <path d={icon.path} />
    </svg>
  )
}
