'use client'

import { FormEvent, useState } from 'react'
import { useIntl } from 'react-intl'

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error' | 'unconfigured'

export default function ContactForm() {
  const intl = useIntl()
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formElement = event.currentTarget
    const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID

    if (!formId) {
      setStatus('unconfigured')
      return
    }

    setStatus('sending')

    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        body: new FormData(formElement),
        headers: { Accept: 'application/json' },
      })

      if (!response.ok) throw new Error('Contact form submission failed')

      formElement.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const fieldClass =
    'w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100'

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-gray-200 py-16 dark:border-gray-700"
      aria-labelledby="contact-title"
    >
      <div className="mx-auto max-w-2xl">
        <h2 id="contact-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
          {intl.formatMessage({ id: 'contact.title' })}
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          {intl.formatMessage({ id: 'contact.description' })}
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block font-medium">
                {intl.formatMessage({ id: 'contact.name' })}
              </span>
              <input className={fieldClass} type="text" name="name" autoComplete="name" required />
            </label>
            <label className="block">
              <span className="mb-2 block font-medium">
                {intl.formatMessage({ id: 'contact.email' })}
              </span>
              <input
                className={fieldClass}
                type="email"
                name="email"
                autoComplete="email"
                required
              />
            </label>
          </div>
          <label className="block">
            <span className="mb-2 block font-medium">
              {intl.formatMessage({ id: 'contact.subject' })}
            </span>
            <input className={fieldClass} type="text" name="subject" required />
          </label>
          <label className="block">
            <span className="mb-2 block font-medium">
              {intl.formatMessage({ id: 'contact.message' })}
            </span>
            <textarea className={fieldClass} name="message" rows={6} required />
          </label>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="rounded-lg bg-primary-500 px-6 py-3 font-semibold text-white transition hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-wait disabled:opacity-60 dark:focus:ring-offset-gray-950"
          >
            {intl.formatMessage({
              id: status === 'sending' ? 'contact.sending' : 'contact.send',
            })}
          </button>
          <div aria-live="polite" className="min-h-6 text-sm">
            {status === 'success' && (
              <p className="text-green-600 dark:text-green-400">
                {intl.formatMessage({ id: 'contact.success' })}
              </p>
            )}
            {status === 'error' && (
              <p className="text-red-600 dark:text-red-400">
                {intl.formatMessage({ id: 'contact.error' })}
              </p>
            )}
            {status === 'unconfigured' && (
              <p className="text-red-600 dark:text-red-400">
                {intl.formatMessage({ id: 'contact.unconfigured' })}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
