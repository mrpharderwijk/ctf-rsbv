import { HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { ArticleTile } from '@/features/article/article-tile-grid/components/article-tile/article-tile';
import { PageBlogPostFieldsFragment } from '@/lib/__generated/sdk';

interface ArticleTileGridProps extends HTMLProps<HTMLDivElement> {
  articles?: Array<PageBlogPostFieldsFragment | null>;
}

export const ArticleTileGrid = ({ articles, className, ...props }: ArticleTileGridProps) => {
  return articles && articles.length > 0 ? (
    <div
      className={twMerge(
        'grid gap-x-6 gap-y-6 grid-cols-[repeat(4,1fr)] md:grid-cols-[repeat(6,1fr)] lg:grid-cols-[repeat(12,1fr)]',
        className,
      )}
      {...props}
    >
      {articles.map((article, index) => {
        return article ? <ArticleTile key={index} article={article} /> : null;
      })}
    </div>
  ) : null;
};
