import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { Container } from '@/components/atoms/container/container';
import { Divider } from '@/components/atoms/divider/divider';
import { ArticleHero } from '@/features/article/article-hero/article-hero';
import { ArticleTileGrid } from '@/features/article/article-tile-grid/article-tile-grid';
import { defaultLocale, locales } from '@/features/i18n/utils/config';
import { initTranslations } from '@/features/i18n/utils/init-translations';
import { PageBlogPostOrder } from '@/lib/__generated/sdk';
import { client, previewClient } from '@/lib/client';

interface LandingPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: LandingPageProps): Promise<Metadata> {
  const { isEnabled: preview } = await draftMode();
  const gqlClient = preview ? previewClient : client;
  const landingPageData = await gqlClient.pageLanding({ locale: params.locale, preview });
  const page = landingPageData.pageLandingCollection?.items[0];

  const languages = Object.fromEntries(
    locales.map(locale => [locale, locale === defaultLocale ? '/' : `/${locale}`]),
  );
  const metadata: Metadata = {
    alternates: {
      canonical: '/',
      languages: languages,
    },
  };
  if (page?.seoFields) {
    metadata.title = page.seoFields.pageTitle;
    metadata.description = page.seoFields.pageDescription;
    metadata.robots = {
      follow: !page.seoFields.nofollow,
      index: !page.seoFields.noindex,
    };
  }

  return metadata;
}

export default async function Page({ params: { locale } }: LandingPageProps) {
  const { isEnabled: preview } = await draftMode();
  const { t, resources } = await initTranslations({ locale });
  const gqlClient = preview ? previewClient : client;

  const landingPageData = await gqlClient.pageLanding({ locale, preview });
  const page = landingPageData.pageLandingCollection?.items[0];

  if (!page) {
    notFound();
  }

  const blogPostsData = await gqlClient.pageBlogPostCollection({
    limit: 6,
    locale,
    order: PageBlogPostOrder.PublishedDateDesc,
    where: {
      slug_not: page?.featuredBlogPost?.slug,
    },
    preview,
  });
  const posts = blogPostsData.pageBlogPostCollection?.items;

  if (!page?.featuredBlogPost || !posts) {
    return;
  }

  return (
    <>
      <section>
        <Container>
          <ArticleHero article={page.featuredBlogPost} />
        </Container>
      </section>

      <Container>
        <Divider />
      </Container>

      {/* Tutorial: contentful-and-the-starter-template.md */}
      {/* Uncomment the line below to make the Greeting field available to render */}
      {/*<Container>*/}
      {/*  <div className="my-5 bg-colorTextLightest p-5 text-colorBlueLightest">{page.greeting}</div>*/}
      {/*</Container>*/}

      <section>
        <Container className="my-8 md:mb-10 lg:mb-16">
          <h2 className="mb-4 md:mb-6">{t('landingPage.latestArticles')}</h2>
          <ArticleTileGrid articles={posts.slice(0,4)} />
        </Container>
      </section>
    </>
  );
}
