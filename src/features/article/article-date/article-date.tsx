import { ReactElement } from 'react'

import { FormatDate } from '@/components/atoms/format-date/format-date'
import { Body } from '@/components/atoms/typography/body/body'

type ArticleDateProps = {
  publishedDate?: Date | number
}

export function ArticleDate({
  publishedDate,
}: ArticleDateProps): ReactElement | null {
  if (!publishedDate) {
    return null
  }

  return (
    <Body color="gray" size="sm" font-weight="normal">
      <time>
        <FormatDate date={publishedDate} />
      </time>
    </Body>
  )
}
