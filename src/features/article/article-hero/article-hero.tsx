'use client'

import Link from 'next/link'
import { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from '@contentful/live-preview/react'

import { Box } from '@/components/atoms/layout/box/box'
import { GridItem } from '@/components/atoms/layout/grid/components/grid-item/grid-item'
import { Grid } from '@/components/atoms/layout/grid/grid'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { ArticleDate } from '@/features/article/article-date/article-date'
import { CtfImage } from '@/features/contentful/components/contentful-image/contentful-image'
import { PageBlogPostFieldsFragment } from '@/lib/__generated/sdk'
import { PropsWithTestId } from '@/types'

type ArticleHeroProps = PropsWithTestId<{
  article: PageBlogPostFieldsFragment
  isFeatured?: boolean
  isReversedLayout?: boolean
  locale?: string
}>

export function ArticleHero({
  article,
  'data-testid': dataTestid,
}: ArticleHeroProps): ReactElement {
  const { t } = useTranslation()
  const inspectorProps = useContentfulInspectorMode({
    entryId: article.sys.id,
  })
  const { title, publishedDate, slug } = useContentfulLiveUpdates(article)

  return (
    <Box border-b={1} border-color="gray-light">
      <Grid
        data-testid={dataTestid}
        gap-x="1.5"
        gap-x-md={6}
        gap-y={6}
        grid-cols={12}
        grid-cols-md={6}
        grid-cols-lg={12}
        padding-b={12}
        padding-b-md={20}
      >
        <GridItem
          col-start={1}
          col-start-md={4}
          col-start-lg={6}
          col-end="-1"
          row-start-md="-1"
        >
          <Box overflow="hidden" border-radius="xl">
            <div
              className="relative aspect-[4/3] overflow-hidden rounded-lg"
              {...inspectorProps({ fieldId: 'featuredImage' })}
            >
              {article.featuredImage && (
                <Link href={`/${slug}`}>
                  <CtfImage
                    nextImageProps={{
                      className: 'w-full',
                      priority: true,
                      sizes: undefined,
                    }}
                    {...article.featuredImage}
                  />
                </Link>
              )}
            </div>
          </Box>
        </GridItem>

        <GridItem
          col-start={1}
          col-end-md={4}
          col-end-lg={6}
          col-end="-1"
          padding-r-md={1}
          display="flex"
          flex-direction="col"
          justify-content="center"
          gap={6}
        >
          <div className="flex flex-col gap-1">
            <ArticleDate
              publishedDate={publishedDate}
              {...inspectorProps({ fieldId: 'publishedDate' })}
            />

            <Heading
              tag="h3"
              font-size="base"
              font-weight="semibold"
              font-size-md="lg"
              {...inspectorProps({ fieldId: 'title' })}
            >
              <Link href={`/${slug}`}>
                <span className="wordbreak-words">{title}</span>
              </Link>
            </Heading>
          </div>
          <footer>
            <Link
              href={`/${slug}`}
              className="inline-block bg-[#FF385C] hover:bg-[#E00B41] text-white px-4 py-2.5 rounded-lg cursor-pointer"
            >
              Read more
            </Link>
          </footer>
        </GridItem>
      </Grid>
    </Box>
  )
}
