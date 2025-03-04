import Link from 'next/link'
import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from '@contentful/live-preview/react'
import { render } from '@testing-library/react'

import { ArticleHero } from './article-hero'

import { Heading } from '@/components/atoms/typography/heading/heading'
import { ArticleDate } from '@/features/article/article-date/article-date'
import { CtfImage } from '@/features/contentful/components/contentful-image/contentful-image'
import { PageBlogPostFieldsFragment } from '@/lib/__generated/sdk'

// Mock the translation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: jest.fn(({ children }) => children),
}))
const LinkMock = jest.mocked(Link)

jest.mock('@/features/contentful/components/contentful-image/contentful-image')
const CtfImageMock = jest.mocked(CtfImage)

jest.mock('@/components/atoms/typography/heading/heading')
const HeadingMock = jest
  .mocked(Heading)
  .mockImplementation(jest.fn(({ children }) => <div>{children}</div>))

jest.mock('@/features/article/article-date/article-date', () => ({
  ArticleDate: jest.fn(),
}))
const ArticleDateMock = jest.mocked(ArticleDate)

jest.mock('@contentful/live-preview/react', () => ({
  useContentfulInspectorMode: jest.fn().mockReturnValue(() => ({})),
  useContentfulLiveUpdates: jest.fn((article) => article),
}))
const useContentfulInspectorModeMock = jest.mocked(useContentfulInspectorMode)
const useContentfulLiveUpdatesMock = jest.mocked(useContentfulLiveUpdates)

const articleMock = {
  sys: {
    id: '123',
  },
  title: 'Test Article',
  slug: 'test-article',
  publishedDate: '2024-01-01',
  featuredImage: {
    url: 'test-image.jpg',
    title: 'Test Image',
    width: 800,
    height: 600,
  },
} as PageBlogPostFieldsFragment

describe('ArticleHero', () => {
  beforeEach(jest.clearAllMocks)

  it('renders article hero with all content', () => {
    // Arrange & Act
    render(<ArticleHero article={articleMock} />)

    // Assert
    expect(useContentfulInspectorModeMock).toHaveBeenCalledTimes(1)
    expect(useContentfulLiveUpdatesMock).toHaveBeenCalledWith(articleMock)

    expect(useContentfulInspectorModeMock).toHaveBeenCalledTimes(1)
    expect(useContentfulInspectorModeMock).toHaveBeenCalledWith({
      entryId: articleMock.sys.id,
    })

    expect(LinkMock).toHaveBeenCalledTimes(3)
    expect(LinkMock).toHaveBeenNthCalledWith(
      1,
      {
        href: '/test-article',
        children: expect.anything(),
      },
      undefined,
    )
    expect(LinkMock).toHaveBeenNthCalledWith(
      2,
      {
        href: '/test-article',
        children: expect.anything(),
      },
      undefined,
    )
    expect(LinkMock).toHaveBeenNthCalledWith(
      3,
      {
        href: '/test-article',
        className: expect.any(String),
        children: expect.anything(),
      },
      undefined,
    )

    expect(CtfImageMock).toHaveBeenCalledTimes(1)
    expect(CtfImageMock).toHaveBeenCalledWith(
      {
        url: 'test-image.jpg',
        title: 'Test Image',
        width: 800,
        height: 600,
        nextImageProps: {
          className: 'w-full',
          priority: true,
          sizes: undefined,
        },
      },
      undefined,
    )

    expect(ArticleDateMock).toHaveBeenCalledTimes(1)
    expect(ArticleDateMock).toHaveBeenCalledWith(
      {
        publishedDate: '2024-01-01',
      },
      undefined,
    )

    expect(HeadingMock).toHaveBeenCalledTimes(1)
    expect(HeadingMock).toHaveBeenCalledWith(
      {
        tag: 'h3',
        children: expect.anything(),
        'font-size': 'base',
        'font-size-md': 'lg',
        'font-weight': 'semibold',
      },
      undefined,
    )
  })

  it('renders without featured image', () => {
    // Arrange
    const articleWithoutImage = {
      ...articleMock,
      featuredImage: null,
    }

    // Act
    render(<ArticleHero article={articleWithoutImage} />)

    // Assert
    expect(useContentfulInspectorModeMock).toHaveBeenCalledTimes(1)
    expect(useContentfulLiveUpdatesMock).toHaveBeenCalledWith(
      articleWithoutImage,
    )

    expect(CtfImageMock).not.toHaveBeenCalled()
  })
})
