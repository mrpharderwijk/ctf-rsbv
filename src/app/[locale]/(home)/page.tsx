import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { Box } from '@/components/atoms/layout/box/box'
import { Container } from '@/components/atoms/layout/container/container'
import { GridItem } from '@/components/atoms/layout/grid/components/grid-item/grid-item'
import { Grid } from '@/components/atoms/layout/grid/grid'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { ArticleHero } from '@/features/article/article-hero/article-hero'
import { ArticleTileGrid } from '@/features/article/article-tile-grid/article-tile-grid'
import { defaultLocale, locales } from '@/features/i18n/utils/config'
import { initTranslations } from '@/features/i18n/utils/init-translations'
import { SocialSection } from '@/features/social-section/social-section'
import { PageBlogPostOrder } from '@/lib/__generated/sdk'
import { client, previewClient } from '@/lib/client'
import { NextPageProps } from '@/types/next-page-props'

export type LandingPageProps = NextPageProps<unknown>

export async function generateMetadata({
  params,
}: LandingPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const { isEnabled: preview } = await draftMode()
  const gqlClient = preview ? previewClient : client
  const landingPageData = await gqlClient.pageLanding({
    locale: resolvedParams.locale,
    preview,
  })
  const page = landingPageData.pageLandingCollection?.items[0]

  const languages = Object.fromEntries(
    locales.map((locale) => [
      locale,
      locale === defaultLocale ? '/' : `/${locale}`,
    ]),
  )
  const metadata: Metadata = {
    alternates: {
      canonical: '/',
      languages: languages,
    },
  }
  if (page?.seoFields) {
    metadata.title = page.seoFields.pageTitle
    metadata.description = page.seoFields.pageDescription
    metadata.robots = {
      follow: !page.seoFields.nofollow,
      index: !page.seoFields.noindex,
    }
  }

  return metadata
}

export default async function Page({ params }: NextPageProps<unknown>) {
  const { locale } = await params
  const { isEnabled: preview } = await draftMode()
  const { t } = await initTranslations({ locale })
  const gqlClient = preview ? previewClient : client

  const landingPageData = await gqlClient.pageLanding({ locale, preview })
  const page = landingPageData.pageLandingCollection?.items[0]

  if (!page) {
    notFound()
  }

  const blogPostsData = await gqlClient.pageBlogPostCollection({
    limit: 6,
    locale,
    order: PageBlogPostOrder.PublishedDateDesc,
    where: {
      slug_not: page?.featuredBlogPost?.slug,
    },
    preview,
  })
  const posts = blogPostsData.pageBlogPostCollection?.items

  if (!page?.featuredBlogPost || !posts) {
    return
  }

  return (
    <>
      <Container tag="section" id="homepage-hero">
        <ArticleHero article={page.featuredBlogPost} />
      </Container>

      {/* Tutorial: contentful-and-the-starter-template.md */}
      {/* Uncomment the line below to make the Greeting field available to render */}
      {/*<Container>*/}
      {/*  <div className="my-5 bg-colorTextLightest p-5 text-colorBlueLightest">{page.greeting}</div>*/}
      {/*</Container>*/}

      <Container
        tag="section"
        id="latest-articles"
        className="flex flex-col gap-6"
      >
        <Heading tag="h2" font-size="base" font-weight="bold" line-height="3xl">
          {t('landingPage.latestArticles')}
        </Heading>
        <ArticleTileGrid articles={posts.slice(0, 4)} />
      </Container>

      <Container
        tag="section"
        id="social-content"
        className="flex flex-col gap-6"
      >
        <SocialSection />
      </Container>

      <Container tag="section" id="content-slider" padding={false}>
        <Box
          bg-color="gray-lightest"
          display="flex"
          flex-direction="col"
          padding-x={6}
          padding-x-md={10}
          padding-x-xl={20}
          padding-y={12}
          padding-y-lg={20}
        >
          <Grid grid-cols={4} grid-cols-md={6} gap={6}>
            <GridItem
              display="grid"
              grid-cols="subgrid"
              col-span={4}
              col-span-md={6}
              gap={4}
            >
              <GridItem col-start={1} col-end="-1">
                <Heading
                  tag="h2"
                  font-size="lg"
                  font-size-xl="xl"
                  font-weight="semibold"
                >
                  The latest Airbnb Icons
                </Heading>
              </GridItem>
              <GridItem col-span={4} col-start-md={1} col-end-md={5}>
                <Body font-size="sm" font-size-md="alt">
                  Explore the latest extraordinary experiences hosted by the
                  greatest names in music, film, television, art, sports, and
                  more.
                </Body>
              </GridItem>
            </GridItem>
          </Grid>
        </Box>

        <Box
          bg-color="gray-lightest"
          display="flex"
          flex-direction="col"
          align-items="start"
          justify-content="center"
          width="full"
          overflow-x="hidden"
        >
          <div className="flex overflow-x-scroll snap-x snap-mandatory w-full gap-6 [&>*]:w-[18.75rem] p-6">
            <div className="flex flex-shrink-0 w-full snap-center justify-center items-center bg-color-red-light h-80">
              <span>slide 1</span>
            </div>
            <div className="flex flex-shrink-0 w-full snap-center justify-center items-center bg-color-red-light h-80">
              <span>slide 2</span>
            </div>
            <div className="flex flex-shrink-0 w-full snap-center justify-center items-center bg-color-red-light h-80">
              <span>slide 3</span>
            </div>
            <div className="flex flex-shrink-0 w-full snap-center justify-center items-center bg-color-red-light h-80">
              <span>slide 4</span>
            </div>
            <div className="flex flex-shrink-0 w-full snap-center justify-center items-center bg-color-red-light h-80">
              <span>slide 5</span>
            </div>
          </div>
        </Box>
      </Container>
    </>
  )
}
