import { render, screen } from '@testing-library/react'

import { Box, BoxProps } from './box'

describe('Box', () => {
  it('renders the component', () => {
    const { container } = render(<Box>Hello World!</Box>)

    expect(screen.getByText('Hello World!')).toBeInTheDocument()
    expect(container).toContainHTML('<div class="relative">Hello World!</div>')
  })

  describe('as prop', () => {
    it.each([
      'span',
      'article',
      'main',
      'div',
      'section',
      'aside',
      'header',
      'footer',
    ] as BoxProps['tag'][])('renders the component as a %s tag', (tag) => {
      const { container } = render(
        <Box tag={tag} position="absolute">
          Hello World!
        </Box>,
      )

      expect(container).toContainHTML(
        `<${tag} class="absolute">Hello World!</${tag}>`,
      )
    })
  })

  describe('display prop', () => {
    it.each([
      {
        display: 'block',
        displaySm: 'block',
        displayMd: 'block',
        displayLg: 'block',
        className: 'block sm:block md:block lg:block',
      },
      {
        display: 'inline',
        displaySm: 'inline',
        displayMd: 'inline',
        displayLg: 'inline',
        className: 'inline sm:inline md:inline lg:inline',
      },
      {
        display: 'flex',
        displaySm: 'flex',
        displayMd: 'flex',
        displayLg: 'flex',
        className: 'flex sm:flex md:flex lg:flex',
      },
      {
        display: 'grid',
        displaySm: 'grid',
        displayMd: 'grid',
        displayLg: 'grid',
        className: 'grid sm:grid md:grid lg:grid',
      },
      {
        display: 'inlineBlock',
        displaySm: 'inlineBlock',
        displayMd: 'inlineBlock',
        displayLg: 'inlineBlock',
        className:
          'inline-block sm:inline-block md:inline-block lg:inline-block',
      },
      {
        display: 'inlineFlex',
        displaySm: 'inlineFlex',
        displayMd: 'inlineFlex',
        displayLg: 'inlineFlex',
        className: 'inline-flex sm:inline-flex md:inline-flex lg:inline-flex',
      },
      {
        display: 'inlineGrid',
        displaySm: 'inlineGrid',
        displayMd: 'inlineGrid',
        displayLg: 'inlineGrid',
        className: 'inline-grid sm:inline-grid md:inline-grid lg:inline-grid',
      },
    ] as {
      display: BoxProps['display']
      displaySm: BoxProps['display-sm']
      displayMd: BoxProps['display-md']
      displayLg: BoxProps['display-lg']
      className: string
    }[])(
      'renders the component with the $display display prop',
      ({ display, displaySm, displayMd, displayLg, className }) => {
        const { container } = render(
          <Box
            display={display}
            display-sm={displaySm}
            display-md={displayMd}
            display-lg={displayLg}
          >
            Hello World!
          </Box>,
        )

        expect(container).toContainHTML(
          `<div class="${className} relative">Hello World!</div>`,
        )
      },
    )
  })

  describe('flexDirection prop', () => {
    it.each([
      {
        flexDirection: 'row',
        flexDirectionSm: 'row',
        flexDirectionMd: 'row',
        flexDirectionLg: 'row',
        className: 'flex-row sm:flex-row md:flex-row lg:flex-row',
      },
      {
        flexDirection: 'col',
        flexDirectionSm: 'col',
        flexDirectionMd: 'col',
        flexDirectionLg: 'col',
        className: 'flex-col sm:flex-col md:flex-col lg:flex-col',
      },
      {
        flexDirection: 'colReverse',
        flexDirectionSm: 'colReverse',
        flexDirectionMd: 'colReverse',
        flexDirectionLg: 'colReverse',
        className:
          'flex-col-reverse sm:flex-col-reverse md:flex-col-reverse lg:flex-col-reverse',
      },
    ] as {
      flexDirection: BoxProps['flexDirection']
      flexDirectionSm: BoxProps['flexDirection-sm']
      flexDirectionMd: BoxProps['flexDirection-md']
      flexDirectionLg: BoxProps['flexDirection-lg']
      className: string
    }[])(
      'renders the component with the $flexDirection prop',
      ({
        flexDirection,
        flexDirectionSm,
        flexDirectionMd,
        flexDirectionLg,
        className,
      }) => {
        const { container } = render(
          <Box
            flexDirection={flexDirection}
            flexDirection-sm={flexDirectionSm}
            flexDirection-md={flexDirectionMd}
            flexDirection-lg={flexDirectionLg}
          >
            Hello World!
          </Box>,
        )

        expect(container).toContainHTML(
          `<div class="${className} relative">Hello World!</div>`,
        )
      },
    )
  })
})
