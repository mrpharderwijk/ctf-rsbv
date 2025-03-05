'use client'

import Link from 'next/link'
import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from '@contentful/live-preview/react'

import { GridItem } from '@/components/atoms/layout/grid/components/grid-item/grid-item'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { ArticleDate } from '@/features/article/article-date/article-date'
import { CtfImage } from '@/features/contentful/components/contentful-image/contentful-image'
import { PageBlogPostFieldsFragment } from '@/lib/__generated/sdk'
import { PropsWithTestId } from '@/types'

type ArticleTileProps = PropsWithTestId<{
  article: PageBlogPostFieldsFragment
}>

export const ArticleTile = ({
  article,
  'data-testid': dataTestid,
}: ArticleTileProps) => {
  const { featuredImage, publishedDate, slug, title } =
    useContentfulLiveUpdates(article)
  const inspectorProps = useContentfulInspectorMode({
    entryId: article.sys.id,
  })

  return (
    <GridItem col-span={4} col-span-md={3}>
      <Link
        className="flex flex-row gap-x-6 md:flex md:flex-col md:gap-y-4"
        href={`/${slug}`}
        data-testid={dataTestid}
      >
        {featuredImage && (
          <div
            className="items-center w-1/2 md:w-full md:flex-initial"
            {...inspectorProps({ fieldId: 'featuredImage' })}
          >
            <CtfImage
              nextImageProps={{
                className: 'object-cover aspect-16/10 w-full rounded-2xl',
              }}
              {...featuredImage}
            />
          </div>
        )}

        <div className="flex flex-initial flex-col justify-start items-start w-1/2 md:w-full md:flex-auto gap-2">
          {title && (
            <Heading
              tag="h3"
              font-size="smd"
              line-height="2xl"
              font-weight="semibold"
              {...inspectorProps({ fieldId: 'title' })}
            >
              {title}
            </Heading>
          )}

          <div className="flex">
            {/* <ArticleAuthor article={article} /> */}
            <ArticleDate
              publishedDate={publishedDate}
              {...inspectorProps({ fieldId: 'publishedDate' })}
            />
          </div>
        </div>
      </Link>
    </GridItem>
  )
}
