import { ReactElement } from 'react'

import { ArticleTile } from '@/features/article/article-tile-grid/components/article-tile/article-tile'
import { PageBlogPostFieldsFragment } from '@/lib/__generated/sdk'
import { PropsWithTestId } from '@/types'

type ArticleTileGridProps = PropsWithTestId<{
  articles?: Array<PageBlogPostFieldsFragment | null>
}>

export const ArticleTileGrid = ({
  articles,
  'data-testid': dataTestid,
}: ArticleTileGridProps): ReactElement | null => {
  if (!articles || !articles.length) {
    return null
  }
  return (
    <div
      className="grid gap-x-6 gap-y-6 grid-cols-[repeat(4,1fr)] md:grid-cols-[repeat(6,1fr)] lg:grid-cols-[repeat(12,1fr)]"
      data-testid={dataTestid}
    >
      {articles.map((article, index) => {
        return article ? <ArticleTile key={index} article={article} /> : null
      })}
    </div>
  )
}
