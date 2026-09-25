'use client'

/* eslint-disable jsx-a11y/anchor-has-content */
import Link from 'next/link'
import type { LinkProps } from 'next/link'
import { AnchorHTMLAttributes } from 'react'
import { useCurrentLocale } from './IntlProvider'
import { locales } from '@/i18n/config'

const CustomLink = ({ href, ...rest }: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const locale = useCurrentLocale()
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    const firstSegment = href.split('/')[1]
    const localizedHref = locales.includes(firstSegment as (typeof locales)[number])
      ? href
      : `/${locale}${href === '/' ? '' : href}`
    return <Link className="break-words" href={localizedHref} {...rest} />
  }

  if (isAnchorLink) {
    return <a className="break-words" href={href} {...rest} />
  }

  return (
    <a className="break-words" target="_blank" rel="noopener noreferrer" href={href} {...rest} />
  )
}

export default CustomLink
