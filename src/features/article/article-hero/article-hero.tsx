'use client';

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from '@contentful/live-preview/react';
import Image from "next/image";
import Link from 'next/link';
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";

import { FormatDate } from "@/components/atoms/format-date/format-date";
import { Body } from "@/components/atoms/typography/body/body";
import { Heading } from "@/components/atoms/typography/heading/heading";
import { CtfImage } from "@/features/contentful/components/contentful-image/contentful-image";
import { PageBlogPostFieldsFragment } from "@/lib/__generated/sdk";

type ArticleHeroProps = {
  article: PageBlogPostFieldsFragment;
  isFeatured?: boolean;
  isReversedLayout?: boolean;
  locale?: string;
}

export function ArticleHero({
  article
}: ArticleHeroProps): ReactElement {
  const { t } = useTranslation();
  const inspectorProps = useContentfulInspectorMode({ entryId: article.sys.id });
  const { title, publishedDate, slug } = useContentfulLiveUpdates(article);

  return (
    <div className="grid gap-x-1.5 gap-y-6 grid-cols-[repeat(12,1fr)] md:grid-cols-[repeat(6,1fr)] md:gap-x-6 lg:grid-cols-[repeat(12,1fr)]">
      <div className="overflow-hidden rounded-xl col-start-1 -col-end-1 md:col-start-4 md:-col-end-1 md:row-start-1 lg:col-start-6 lg:-col-end-1">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg" {...inspectorProps({ fieldId: 'featuredImage' })}>
          {article.featuredImage && (
            <Link href={`/${slug}`}>
              <CtfImage
                nextImageProps={{ className: 'w-full', priority: true, sizes: undefined }}
                {...article.featuredImage}
            />
            </Link>
          )}
          {/* <Image
            src="https://news.airbnb.com/wp-content/uploads/sites/4/2025/02/01-Anitta-OOA-Hero-image-Airbnb-Credit-Eduardo-Bravin.jpg"
            alt="Carnival celebration"
            fill
            className="object-cover h-full w-full block"
            priority
          /> */}
        </div>
      </div>

      <div className="col-start-1 -col-end-1 flex flex-col justify-center gap-6 md:col-start-1 md:col-end-4 md:pr-12 lg:col-start-1 lg:col-end-6">
        <div className="flex flex-col gap-1">
          <Body textColor="gray" fontSize="sm" fontWeight='light' {...inspectorProps({ fieldId: 'publishedDate' })}>
            <time><FormatDate date={publishedDate} /></time>
          </Body>

          <Heading tag="h3" {...inspectorProps({ fieldId: 'title' })}>
            <Link href={`/${slug}`}>
              <span className="wordbreak-words">{title}</span>
            </Link>
          </Heading>
        </div>
        <footer>
          <Link href={`/${slug}`} className="inline-block bg-[#FF385C] hover:bg-[#E00B41] text-white px-4 py-2.5 rounded-lg cursor-pointer">
            Read more
          </Link>
        </footer>
      </div>
    </div>
  );
}
