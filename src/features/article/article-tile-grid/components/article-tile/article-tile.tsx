'use client';

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from '@contentful/live-preview/react';
import Link from 'next/link';
import { HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { FormatDate } from '@/components/atoms/format-date/format-date';
import { Body } from '@/components/atoms/typography/body/body';
import { Heading } from '@/components/atoms/typography/heading/heading';
import { Text } from '@/components/atoms/typography/text/text';
import { CtfImage } from '@/features/contentful/components/contentful-image/contentful-image';
import { PageBlogPostFieldsFragment } from '@/lib/__generated/sdk';

interface ArticleTileProps extends HTMLProps<HTMLDivElement> {
  article: PageBlogPostFieldsFragment;
}

export const ArticleTile = ({ article }: ArticleTileProps) => {
  const { featuredImage, publishedDate, slug, title } = useContentfulLiveUpdates(article);
  const inspectorProps = useContentfulInspectorMode({ entryId: article.sys.id });

  return (
    <Link className="flex flex-row gap-x-6 col-span-4 md:flex md:flex-col md:col-span-3 md:gap-y-4" href={`/${slug}`}>
      {featuredImage && (
        <div className="items-center w-1/2 md:w-full md:flex-initial" {...inspectorProps({ fieldId: 'featuredImage' })}>
          <CtfImage
            nextImageProps={{ className: 'object-cover aspect-16/10 w-full rounded-2xl' }}
            {...featuredImage}
          />
        </div>
      )}
      <div className="flex flex-initial flex-col justify-start items-start w-1/2 md:w-full md:flex-auto gap-2">
        {title && (
          <Heading tag="h3" like="h5" {...inspectorProps({ fieldId: 'title' })}>
            {title}
          </Heading>
        )}

        <div className="flex">
          {/* <ArticleAuthor article={article} /> */}
          <Body textColor="gray" fontSize="sm" fontWeight='light' {...inspectorProps({ fieldId: 'publishedDate' })}>
            <time><FormatDate date={publishedDate} /></time>
          </Body>
        </div>
      </div>
    </Link>
  );
};
