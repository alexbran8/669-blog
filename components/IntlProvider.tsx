'use client'

import { useEffect } from 'react'
import { IntlProvider as ReactIntlProvider } from 'react-intl'
import { usePathname } from 'next/navigation'
import { defaultLocale, isLocale } from '@/i18n/config'
import en from '@/i18n/messages/en.json'
import es from '@/i18n/messages/es.json'

const messages = { en, es }

export function useCurrentLocale() {
  const pathname = usePathname()
  const segment = pathname.split('/')[1]
  return isLocale(segment) ? segment : defaultLocale
}

export default function IntlProvider({ children }: { children: React.ReactNode }) {
  const locale = useCurrentLocale()

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return (
    <ReactIntlProvider locale={locale} defaultLocale={defaultLocale} messages={messages[locale]}>
      {children}
    </ReactIntlProvider>
  )
}
