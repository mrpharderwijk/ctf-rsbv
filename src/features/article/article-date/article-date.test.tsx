import { render } from '@testing-library/react'

import { ArticleDate } from './article-date'

import { FormatDate } from '@/components/atoms/format-date/format-date'
import { Body } from '@/components/atoms/typography/body/body'

jest.mock('@/components/atoms/format-date/format-date', () => ({
  FormatDate: jest.fn(() => <div>Mocked FormatDate</div>),
}))
const FormatDateMock = jest.mocked(FormatDate)

jest.mock('@/components/atoms/typography/body/body', () => ({
  Body: jest.fn(({ children }) => <>{children}</>),
}))
const BodyMock = jest.mocked(Body)

describe('ArticleDate', () => {
  const dateMock = new Date('2023-01-01')

  const testCases = [
    {
      description: 'renders component',
      date: dateMock,
    },
    {
      description: 'renders with a number date',
      date: Date.now(),
    },
    {
      description: 'renders with no date',
      date: undefined,
    },
  ]

  it.each(testCases)('$description', ({ date }) => {
    // Arrange & Act
    render(<ArticleDate publishedDate={date} />)

    // Assert
    if (date) {
      expect(BodyMock).toHaveBeenCalledTimes(1)
      expect(BodyMock).toHaveBeenCalledWith(
        {
          children: expect.anything(),
          color: 'gray',
          'font-weight': 'normal',
          size: 'sm',
        },
        undefined,
      )

      expect(FormatDateMock).toHaveBeenCalledTimes(1)
      expect(FormatDateMock).toHaveBeenCalledWith(
        {
          date,
        },
        undefined,
      )
    } else {
      expect(BodyMock).not.toHaveBeenCalled()
      expect(FormatDateMock).not.toHaveBeenCalled()
    }
  })
})
