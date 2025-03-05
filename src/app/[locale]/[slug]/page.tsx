import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { Container } from '@/components/atoms/layout/container/container'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { ArticleContent } from '@/features/article/article-content/article-content'
import { ArticleHero } from '@/features/article/article-hero/article-hero'
import { ArticleTileGrid } from '@/features/article/article-tile-grid/article-tile-grid'
import { defaultLocale, locales } from '@/features/i18n/utils/config'
import { initTranslations } from '@/features/i18n/utils/init-translations'
import { client, previewClient } from '@/lib/client'
import { NextPageParams, NextPageProps } from '@/types/next-page-props'

type GenerateMetaDataProps = {
  params: NextPageParams<{ slug: string }>
}

export async function generateMetadata({
  params,
}: GenerateMetaDataProps): Promise<Metadata> {
  const { locale, slug } = await params
  const { isEnabled: preview } = await draftMode()
  const gqlClient = preview ? previewClient : client

  const { pageBlogPostCollection } = await gqlClient.pageBlogPost({
    locale,
    slug,
    preview,
  })
  const blogPost = pageBlogPostCollection?.items[0]

  const languages = Object.fromEntries(
    locales.map((locale) => [
      locale,
      locale === defaultLocale ? `/${slug}` : `/${locale}/${slug}`,
    ]),
  )
  const metadata: Metadata = {
    alternates: {
      canonical: slug,
      languages,
    },
  }

  if (blogPost?.seoFields) {
    metadata.title = blogPost.seoFields.pageTitle
    metadata.description = blogPost.seoFields.pageDescription
    metadata.robots = {
      follow: !blogPost.seoFields.nofollow,
      index: !blogPost.seoFields.noindex,
    }
  }

  return metadata
}

export async function generateStaticParams({
  params,
}: {
  params: { locale: string }
}): Promise<{ locale: string; slug: string }[]> {
  const { locale } = params
  const gqlClient = client
  const { pageBlogPostCollection } = await gqlClient.pageBlogPostCollection({
    locale,
    limit: 100,
  })

  if (!pageBlogPostCollection?.items) {
    throw new Error('No blog posts found')
  }

  return pageBlogPostCollection.items
    .filter((blogPost): blogPost is NonNullable<typeof blogPost> =>
      Boolean(blogPost?.slug),
    )
    .map((blogPost) => ({
      locale,
      slug: blogPost.slug!,
    }))
}

type BlogPageProps = NextPageProps<{ slug: string }>

export default async function Page({ params }: BlogPageProps) {
  const { locale, slug } = await params
  const { isEnabled: preview } = await draftMode()
  const gqlClient = preview ? previewClient : client
  const { t } = await initTranslations({ locale })
  const { pageBlogPostCollection } = await gqlClient.pageBlogPost({
    locale,
    slug,
    preview,
  })
  const { pageLandingCollection } = await gqlClient.pageLanding({
    locale,
    preview,
  })
  const landingPage = pageLandingCollection?.items[0]
  const blogPost = pageBlogPostCollection?.items[0]
  const relatedPosts = blogPost?.relatedBlogPostsCollection?.items
  const isFeatured = Boolean(
    blogPost?.slug && landingPage?.featuredBlogPost?.slug === blogPost.slug,
  )

  if (!blogPost) {
    notFound()
  }

  return (
    <article>
      <Container>
        <ArticleHero
          article={blogPost}
          isFeatured={isFeatured}
          isReversedLayout={true}
        />
      </Container>
      <Container className="mt-8 max-w-4xl">
        <ArticleContent article={blogPost} />
      </Container>
      {relatedPosts && (
        <Container className="mt-8 max-w-5xl">
          <Heading tag="h2">{t('article.relatedArticles')}</Heading>
          <ArticleTileGrid articles={relatedPosts} />
        </Container>
      )}
    </article>
  )
}
