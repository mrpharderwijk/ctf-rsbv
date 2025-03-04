import { ReactElement } from 'react'

import { Grid } from '@/components/atoms/layout/grid/grid'
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
    <Grid
      data-testid={dataTestid}
      gap={6}
      grid-cols={4}
      grid-cols-md={6}
      grid-cols-lg={12}
    >
      {articles.map((article, index) => {
        return article ? <ArticleTile key={index} article={article} /> : null
      })}
    </Grid>
  )
}
