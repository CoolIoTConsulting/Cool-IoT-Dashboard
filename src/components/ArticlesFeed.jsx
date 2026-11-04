import { useEffect, useState } from 'react'
import { ARTICLES } from '../config'

// WordPress returns titles/excerpts as HTML strings (with entities like &#8217;).
// DOMParser turns them into plain text without running anything.
function plainText(html = '') {
  return new DOMParser().parseFromString(html, 'text/html').body.textContent.trim()
}

// Only allow normal web links (guards against odd values like javascript:).
function safeUrl(url) {
  return typeof url === 'string' && /^https?:\/\//i.test(url) ? url : null
}

function toArticle(post) {
  const media = post._embedded?.['wp:featuredmedia']?.[0]
  const thumb = media?.media_details?.sizes?.medium?.source_url || media?.source_url
  const excerpt = plainText(post.excerpt?.rendered)
  return {
    id: post.id,
    title: plainText(post.title?.rendered) || 'Untitled',
    url: safeUrl(post.link),
    thumb: safeUrl(thumb),
    excerpt: excerpt.length > 110 ? excerpt.slice(0, 107).trimEnd() + '...' : excerpt,
    date: post.date
      ? new Date(post.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
      : '',
  }
}

export default function ArticlesFeed() {
  const [state, setState] = useState({ status: 'loading', posts: [] })

  useEffect(() => {
    const controller = new AbortController()
    const params = new URLSearchParams({
      per_page: String(ARTICLES.count),
      _embed: 'wp:featuredmedia',
      _fields: 'id,link,date,title,excerpt,_links,_embedded',
    })

    fetch(`${ARTICLES.feedUrl}?${params}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (!Array.isArray(data)) throw new Error('Unexpected response')
        setState({ status: 'ready', posts: data.map(toArticle).filter((a) => a.url) })
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setState({ status: 'error', posts: [] })
      })

    return () => controller.abort()
  }, [])

  return (
    <section className="tile tile-articles" aria-labelledby="articles-title">
      <p className="eyebrow">Fresh reads</p>
      <h2 id="articles-title">Latest Articles</h2>

      {state.status === 'loading' && (
        <div className="articles" aria-busy="true">
          {[0, 1, 2].map((i) => (
            <div key={i} className="article skeleton" />
          ))}
        </div>
      )}

      {state.status === 'ready' && state.posts.length > 0 && (
        <div className="articles">
          {state.posts.map((a) => (
            <a key={a.id} className="article" href={a.url} target="_blank" rel="noreferrer">
              {a.thumb && <img src={a.thumb} alt="" loading="lazy" />}
              <span className="article-body">
                <span className="article-title">{a.title}</span>
                {a.date && <span className="article-meta">{a.date}</span>}
                {a.excerpt && <span className="article-excerpt">{a.excerpt}</span>}
              </span>
            </a>
          ))}
        </div>
      )}

      {(state.status === 'error' || (state.status === 'ready' && state.posts.length === 0)) && (
        <p className="muted small">
          {state.status === 'error'
            ? 'We could not load the latest articles right now.'
            : 'No articles published yet.'}
        </p>
      )}

      <a className="more-link" href={ARTICLES.pageUrl} target="_blank" rel="noreferrer">
        Browse all articles &rarr;
      </a>
    </section>
  )
}
