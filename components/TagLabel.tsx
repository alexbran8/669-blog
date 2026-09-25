'use client'

import { slug } from 'github-slugger'
import { useIntl } from 'react-intl'

export default function TagLabel({ text }: { text: string }) {
  const intl = useIntl()
  return <>{intl.formatMessage({ id: `tag.${slug(text)}`, defaultMessage: text })}</>
}
