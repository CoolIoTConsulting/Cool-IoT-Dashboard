import { useMemo, useState } from 'react'
import entries from '../data/kb.json'

const CATEGORIES = ['All', ...new Set(entries.map((e) => e.category))]

export default function KnowledgeBase() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return entries.filter(
      (e) =>
        (category === 'All' || e.category === category) &&
        (!q || e.q.toLowerCase().includes(q) || e.a.toLowerCase().includes(q)),
    )
  }, [query, category])

  return (
    <section className="tile tile-kb" aria-labelledby="kb-title">
      <p className="eyebrow">Know-how</p>
      <h2 id="kb-title">Knowledge Base</h2>

      <input
        className="search"
        type="search"
        placeholder="Search answers..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search the knowledge base"
      />

      <div className="chips" role="group" aria-label="Filter by category">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`chip ${c === category ? 'chip-active' : ''}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="kb-list">
        {visible.length === 0 && <p className="muted">No matches. Try different words, or ask us!</p>}
        {visible.map((e) => (
          <details key={e.id} className="kb-item">
            <summary>
              <span>{e.q}</span>
              <span className="kb-tag">{e.category}</span>
            </summary>
            <p>{e.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
