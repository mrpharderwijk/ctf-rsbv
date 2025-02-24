'use client'

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from '@contentful/live-preview/react'

import { CtfRichText } from '@/features/contentful/components/contentful-rich-text/contentful-rich-text'
import { PageBlogPostFieldsFragment } from '@/lib/__generated/sdk'

interface ArticleContentProps {
  article: PageBlogPostFieldsFragment
}
export const ArticleContent = ({ article }: ArticleContentProps) => {
  const { content } = useContentfulLiveUpdates(article)
  const inspectorProps = useContentfulInspectorMode({
    entryId: article.sys.id,
  })

  return (
    <div {...inspectorProps({ fieldId: 'content' })}>
      <CtfRichText json={content?.json} links={content?.links} />
    </div>
  )
}
