import Link from 'next/link'
import { InspectorModeTags } from 'node_modules/@contentful/live-preview/dist/inspectorMode/types'
import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from '@contentful/live-preview/react'
import { render } from '@testing-library/react'

import { ArticleTile } from './article-tile'

import { FormatDate } from '@/components/atoms/format-date/format-date'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'
import { CtfImage } from '@/features/contentful/components/contentful-image/contentful-image'
import { PageBlogPostFieldsFragment } from '@/lib/__generated/sdk'

jest.mock('next/link', () => ({
  __esModule: true,
  default: jest.fn(({ children }) => <div>{children}</div>),
}))
const LinkMock = jest.mocked(Link)

jest.mock('@contentful/live-preview/react', () => ({
  useContentfulInspectorMode: jest.fn(),
  useContentfulLiveUpdates: jest.fn(),
}))
const useContentfulInspectorModeMock = jest
  .mocked(useContentfulInspectorMode)
  .mockReturnValue(() => ({}) as InspectorModeTags)
const useContentfulLiveUpdatesMock = jest
  .mocked(useContentfulLiveUpdates)
  .mockImplementation((article) => article)

jest.mock('@/features/contentful/components/contentful-image/contentful-image')
const CtfImageMock = jest.mocked(CtfImage).mockImplementation(jest.fn())

jest.mock('@/components/atoms/typography/heading/heading')
const HeadingMock = jest
  .mocked(Heading)
  .mockImplementation(jest.fn(({ children }) => <div>{children}</div>))

jest.mock('@/components/atoms/typography/body/body')
const BodyMock = jest
  .mocked(Body)
  .mockImplementation(jest.fn(({ children }) => <div>{children}</div>))

jest.mock('@/components/atoms/format-date/format-date', () => ({
  FormatDate: jest.fn(),
}))
const FormatDateMock = jest.mocked(FormatDate)

describe('ArticleTile', () => {
  const articleMock: PageBlogPostFieldsFragment = {
    sys: { id: '1' },
    title: 'Test Article',
    slug: 'test-article',
    publishedDate: '2023-01-01',
    featuredImage: {
      url: 'test-image.jpg',
      title: 'Test Image',
      width: 800,
      height: 600,
    },
  } as PageBlogPostFieldsFragment

  it('renders the article with all properties', () => {
    // Arrange & Act
    render(<ArticleTile article={articleMock} />)

    // Assert
    expect(useContentfulLiveUpdatesMock).toHaveBeenCalledTimes(1)
    expect(useContentfulLiveUpdatesMock).toHaveBeenCalledWith(articleMock)

    expect(useContentfulInspectorModeMock).toHaveBeenCalledTimes(1)
    expect(useContentfulInspectorModeMock).toHaveBeenCalledWith({
      entryId: articleMock.sys.id,
    })

    expect(LinkMock).toHaveBeenCalledTimes(1)
    expect(LinkMock).toHaveBeenCalledWith(
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
          className: expect.any(String),
        },
      },
      undefined,
    )

    expect(HeadingMock).toHaveBeenCalledTimes(1)
    expect(HeadingMock).toHaveBeenCalledWith(
      {
        tag: 'h3',
        like: 'h5',
        children: 'Test Article',
      },
      undefined,
    )

    expect(BodyMock).toHaveBeenCalledTimes(1)
    expect(BodyMock).toHaveBeenCalledWith(
      {
        color: 'gray',
        size: 'sm',
        fontWeight: 'light',
        children: expect.anything(),
      },
      undefined,
    )

    expect(FormatDateMock).toHaveBeenCalledTimes(1)
    expect(FormatDateMock).toHaveBeenCalledWith(
      { date: '2023-01-01' },
      undefined,
    )
  })

  it('renders without featured image when not provided', () => {
    // Arrange
    const articleWithoutImage = {
      ...articleMock,
      featuredImage: null,
    }

    // Act
    render(<ArticleTile article={articleWithoutImage} />)

    // Assert
    expect(CtfImageMock).not.toHaveBeenCalled()
  })

  it('renders without title when not provided', () => {
    // Arrange
    const articleWithoutTitle = {
      ...articleMock,
      title: null,
    }

    // Act
    render(<ArticleTile article={articleWithoutTitle} />)

    // Assert
    expect(HeadingMock).not.toHaveBeenCalled()
  })
})
