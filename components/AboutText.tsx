'use client'

import { FormattedMessage } from 'react-intl'

export default function AboutText() {
  return (
    <p>
      <FormattedMessage
        id="about.description"
        defaultMessage="Do the best you can in terms of cycling and bike mechanics!"
      />
    </p>
  )
}
