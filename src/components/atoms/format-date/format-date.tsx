'use client'

import { useCurrentLocale } from 'next-i18n-router/client'
import { ReactElement } from 'react'

import { defaultLocale, locales } from '@/features/i18n/utils/config'

interface FormatDateProps {
  date: number | Date | undefined
  locale?: string
}

export const formatDateFunc = ({
  date,
  locale,
}: FormatDateProps): string | null => {
  return locale && date
    ? new Intl.DateTimeFormat(locale, {
        dateStyle: 'long',
      }).format(new Date(date))
    : null
}

export function FormatDate({ date }: FormatDateProps): ReactElement | null {
  const locale = useCurrentLocale({
    defaultLocale,
    locales,
  })
  const dateLabel = formatDateFunc({ date, locale })

  return dateLabel ? <>{dateLabel}</> : null
}
