import SocialIcon from './SocialIcons'
import { SITE, SOCIALS } from '../config'

export default function SocialsCard() {
  const links = [{ label: 'cooliot.org', url: SITE.websiteUrl, icon: 'website' }, ...SOCIALS]

  return (
    <section className="tile tile-links" aria-labelledby="links-title">
      <p className="eyebrow">Find us</p>
      <h2 id="links-title">Stay Connected</h2>

      <ul className="social-list">
        {links.map((s) => (
          <li key={s.label}>
            <a className="social" href={s.url} target="_blank" rel="noreferrer">
              <span className="social-icon">
                <SocialIcon name={s.icon} />
              </span>
              <span className="social-label">{s.label}</span>
              <span className="social-arrow" aria-hidden="true">&rarr;</span>
            </a>
          </li>
        ))}
      </ul>

      <p className="muted small">{SITE.location}</p>
    </section>
  )
}
