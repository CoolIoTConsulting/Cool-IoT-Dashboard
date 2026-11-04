// ============================================================
//  ONE PLACE TO EDIT: links, contact settings and form service
// ============================================================

export const SITE = {
  name: 'Cool IoT Consulting',
  tagline: 'Your Home. Your Data. Your Control.',
  location: 'Cool, CA',
  // Where the "Book a free consultation" button goes.
  websiteUrl: 'https://cooliot.org',
  contactPageUrl: 'https://cooliot.org/contact-us/',
  // Optional: set an address to show a one-tap "Email us" button.
  // Leave as '' to hide the button.
  email: '',
}

// `icon` must be one of: youtube, github, instagram, nextdoor
// (to add another network, add its icon in src/components/SocialIcons.jsx).
export const SOCIALS = [
  { label: 'YouTube', icon: 'youtube', url: 'https://www.youtube.com/@CoolIotConsulting' },
  { label: 'GitHub', icon: 'github', url: 'https://github.com/CoolIoTConsulting' },
  { label: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/cooliotconsulting/' },
  { label: 'Nextdoor', icon: 'nextdoor', url: 'https://nextdoor.com/pages/cool-iot-consulting-cool-ca' },
]

// ------------------------------------------------------------
//  Latest Articles feed (reads your WordPress site's built-in REST API)
//
//  Test it by opening the feedUrl below in a browser with ?per_page=2 added:
//  you should see JSON. If the feed ever fails to load, the tile quietly
//  shows a "Browse all articles" link instead of breaking the page.
// ------------------------------------------------------------
export const ARTICLES = {
  feedUrl: 'https://cooliot.org/wp-json/wp/v2/posts',
  pageUrl: 'https://cooliot.org/articles/',
  count: 4,
}

// ------------------------------------------------------------
//  Contact form delivery (no backend needed)
//
//  This app uses Web3Forms (https://web3forms.com): free, no account
//  password, you just enter your email and they send you an "access key".
//  Submissions are emailed straight to you.
//
//  The access key is designed to be public, so it is safe to commit it.
//  Paste yours below. Until you do, the form shows a friendly
//  "not set up yet" message and offers the website contact page instead.
//
//  Want a different service (Formspree, Getform, ...)? Change FORM.endpoint
//  and adjust the payload in ContactCard.jsx -> sendForm().
// ------------------------------------------------------------
export const FORM = {
  endpoint: 'https://api.web3forms.com/submit',
  accessKey: '',
  subjectPrefix: 'Cool IoT Dashboard: ',
}
