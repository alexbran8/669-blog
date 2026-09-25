'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useIntl } from 'react-intl'
import { locales } from '@/i18n/config'
import { useCurrentLocale } from './IntlProvider'

export default function LocaleSwitcher() {
  const pathname = usePathname()
  const currentLocale = useCurrentLocale()
  const intl = useIntl()

  const localizedPath = (locale: string) => {
    const segments = pathname.split('/')
    if (locales.includes(segments[1] as (typeof locales)[number])) segments[1] = locale
    else segments.splice(1, 0, locale)
    return segments.join('/') || `/${locale}`
  }

  return (
    <div
      className="flex items-center gap-1"
      aria-label={intl.formatMessage({ id: 'nav.language' })}
    >
      {locales.map((locale) => (
        <Link
          key={locale}
          href={localizedPath(locale)}
          hrefLang={locale}
          className={`rounded px-1.5 py-1 text-xs font-semibold uppercase ${
            locale === currentLocale
              ? 'bg-primary-500 text-white'
              : 'text-gray-600 hover:text-primary-500 dark:text-gray-300'
          }`}
        >
          {locale}
        </Link>
      ))}
    </div>
  )
}
