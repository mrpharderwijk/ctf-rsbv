import { render } from '@testing-library/react'

import { ArticleTileGrid } from './article-tile-grid'

import { ArticleTile } from '@/features/article/article-tile-grid/components/article-tile/article-tile'
import { PageBlogPostFieldsFragment } from '@/lib/__generated/sdk'

jest.mock(
  '@/features/article/article-tile-grid/components/article-tile/article-tile',
  () => ({
    ArticleTile: jest.fn(),
  }),
)
const ArticleTileMock = jest.mocked(ArticleTile)

const articlesMock = [
  {
    sys: { id: '1' },
    title: 'Article 1',
    slug: 'article-1',
  },
  {
    sys: { id: '2' },
    title: 'Article 2',
    slug: 'article-2',
  },
] as PageBlogPostFieldsFragment[]

describe('ArticleTileGrid', () => {
  beforeEach(jest.clearAllMocks)

  it('renders the component with articles', () => {
    // Arrange & Act
    render(<ArticleTileGrid articles={articlesMock} />)

    // Assert
    expect(ArticleTileMock).toHaveBeenCalledTimes(2)
    expect(ArticleTileMock).toHaveBeenNthCalledWith(
      1,
      {
        article: articlesMock[0],
      },
      undefined,
    )
    expect(ArticleTileMock).toHaveBeenNthCalledWith(
      2,
      {
        article: articlesMock[1],
      },
      undefined,
    )
  })

  describe('renders null', () => {
    it.each([null, undefined])('when articles array is %p', (articles) => {
      // Arrange & Act
      const { container } = render(
        <ArticleTileGrid
          articles={
            articles as unknown as (PageBlogPostFieldsFragment | null)[]
          }
        />,
      )

      // Assert
      expect(container.firstChild).toBeNull()
      expect(ArticleTileMock).not.toHaveBeenCalled()
    })
  })

  it('skips null articles in the array', () => {
    // Arrange
    const articlesWithNull = [...articlesMock, null]

    // Act
    render(<ArticleTileGrid articles={articlesWithNull} />)

    // Assert
    expect(ArticleTileMock).toHaveBeenCalledTimes(2)
  })
})
