import { render } from '@testing-library/react'

import { FooterCopyright } from './footer-copyright'

import { Box } from '@/components/atoms/layout/box/box'
import { Body } from '@/components/atoms/typography/body/body'

jest.mock('@/components/atoms/layout/box/box', () => ({
  Box: jest.fn(({ children }) => <>{children}</>),
}))
const BoxMock = jest.mocked(Box)

jest.mock('@/components/atoms/typography/body/body')
const BodyMock = jest.mocked(Body)

describe('FooterCopyright', () => {
  beforeEach(jest.clearAllMocks)

  it('renders the component', () => {
    // Arrange
    const currentYear = new Date().getFullYear()

    // Act
    render(<FooterCopyright />)

    // Assert
    expect(BoxMock).toHaveBeenCalledTimes(4)
    expect(BoxMock).toHaveBeenNthCalledWith(
      1,
      {
        display: 'flex',
        flexDirection: 'col',
        'flexDirection-lg': 'rowReverse',
        'alignItems-lg': 'center',
        'justifyContent-md': 'center',
        'justifyContent-lg': 'between',
        'padding-b': 6,
        'gap-y': 3,
        children: expect.any(Array),
      },
      undefined,
    )

    expect(BoxMock).toHaveBeenNthCalledWith(
      2,
      {
        display: 'flex',
        justifyContent: 'start',
        'display-md': 'inlineFlex',
        'justifyContent-md': 'center',
        children: expect.any(Object),
      },
      undefined,
    )

    expect(BoxMock).toHaveBeenNthCalledWith(
      3,
      {
        display: 'flex',
        justifyContent: 'start',
        'display-md': 'inlineFlex',
        'justifyContent-md': 'center',
        children: expect.any(Object),
      },
      undefined,
    )

    expect(BoxMock).toHaveBeenNthCalledWith(
      4,
      {
        display: 'inlineFlex',
        flexDirection: 'col',
        'flexDirection-lg': 'row',
        alignItems: 'start',
        'alignItems-md': 'center',
        justifyContent: 'center',
        gap: '0.5',
        children: expect.any(Array),
      },
      undefined,
    )

    expect(BodyMock).toHaveBeenCalledTimes(1)
    expect(BodyMock).toHaveBeenCalledWith(
      {
        tag: 'label',
        size: 'sm',
        children: ['© ', currentYear, ' Whatever, All Rights Reserved'],
      },
      undefined,
    )
  })
})
