import { useState } from 'react'
import { FORM, SITE } from '../config'

const EMPTY = { first: '', last: '', phone: '', email: '', subject: '', message: '', botcheck: '' }

async function sendForm(values) {
  const res = await fetch(FORM.endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: FORM.accessKey,
      subject: FORM.subjectPrefix + (values.subject || 'New message'),
      from_name: `${values.first} ${values.last}`.trim(),
      name: `${values.first} ${values.last}`.trim(),
      email: values.email,
      phone: values.phone,
      message: values.message,
      botcheck: values.botcheck, // honeypot: real people leave this empty
    }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || data.success === false) {
    throw new Error(data.message || 'Something went wrong')
  }
}

export default function ContactCard() {
  const [values, setValues] = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')
  const notConfigured = !FORM.accessKey

  const set = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }))

  async function onSubmit(e) {
    e.preventDefault()
    if (notConfigured) {
      setStatus('error')
      setError('The form is not connected yet. Please use the website contact page below.')
      return
    }
    setStatus('sending')
    setError('')
    try {
      await sendForm(values)
      setStatus('sent')
      setValues(EMPTY)
    } catch (err) {
      setStatus('error')
      setError(`${err.message}. You can also reach us through the website contact page.`)
    }
  }

  return (
    <section className="tile tile-contact" aria-labelledby="contact-title">
      <div className="tile-glow" aria-hidden="true" />
      <header className="contact-head">
        <p className="eyebrow">Say hello</p>
        <h2 id="contact-title">Contact Us</h2>
        <p className="muted">
          Questions about your smart home? We offer free consultations and are happy to chat! Send us a
          message today to discuss your project, ask questions, or request a quote. We will get back to you as soon as possible.
        </p>
        <div className="quick-actions">
          {SITE.email && (
            <a className="btn btn-ghost" href={`mailto:${SITE.email}`}>
              Email us
            </a>
          )}
        </div>
      </header>

      {status === 'sent' ? (
        <div className="success" role="status">
          <span className="success-emoji" aria-hidden="true">🎉</span>
          <h3>Message sent!</h3>
          <p className="muted">Thanks for reaching out. We will be in touch soon.</p>
          <button className="btn btn-ghost" onClick={() => setStatus('idle')}>
            Send another
          </button>
        </div>
      ) : (
        <form className="form" onSubmit={onSubmit}>
          <label>
            First name
            <input required value={values.first} onChange={set('first')} autoComplete="given-name" />
          </label>
          <label>
            Last name
            <input required value={values.last} onChange={set('last')} autoComplete="family-name" />
          </label>
          <label>
            <span>
              Phone <span className="optional">(optional)</span>
            </span>
            <input type="tel" value={values.phone} onChange={set('phone')} autoComplete="tel" />
          </label>
          <label>
            Email
            <input required type="email" value={values.email} onChange={set('email')} autoComplete="email" />
          </label>
          <label className="span-2">
            Subject
            <input required value={values.subject} onChange={set('subject')} />
          </label>
          <label className="span-2">
            Your message
            <textarea required rows={4} value={values.message} onChange={set('message')} />
          </label>

          {/* Honeypot spam trap: hidden from people, bots fill it in. */}
          <input
            className="honeypot"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={values.botcheck}
            onChange={set('botcheck')}
          />

          <div className="span-2 form-foot">
            <button className="btn btn-primary btn-lg" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send message'}
            </button>
            {status === 'error' && (
              <p className="error" role="alert">
                {error}
              </p>
            )}
          </div>
        </form>
      )}
    </section>
  )
}
