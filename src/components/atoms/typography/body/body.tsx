import { VariantProps } from 'class-variance-authority'
import { PropsWithChildren, ReactElement } from 'react'

import { bodyClassNames } from '@/components/atoms/typography/body/body.class-names'
import { Text } from '@/components/atoms/typography/text/text'
import { textClassNames } from '@/components/atoms/typography/text/text.class-names'
import { PropsWithTestId, TextElementTag } from '@/types'

type BodyProps = PropsWithChildren<
  PropsWithTestId<
    VariantProps<typeof bodyClassNames> & {
      size?: VariantProps<typeof textClassNames>['font-size']
      'size-sm'?: VariantProps<typeof textClassNames>['font-size-sm']
      'size-md'?: VariantProps<typeof textClassNames>['font-size-md']
      'size-lg'?: VariantProps<typeof textClassNames>['font-size-lg']
      'size-xl'?: VariantProps<typeof textClassNames>['font-size-xl']
      color?: VariantProps<typeof textClassNames>['text-color']
      weight?: VariantProps<typeof textClassNames>['font-weight']
      'weight-sm'?: VariantProps<typeof textClassNames>['font-weight-sm']
      'weight-md'?: VariantProps<typeof textClassNames>['font-weight-md']
      'weight-lg'?: VariantProps<typeof textClassNames>['font-weight-lg']
      'weight-xl'?: VariantProps<typeof textClassNames>['font-weight-xl']
      tag?: TextElementTag
    }
  >
>

export function Body({
  tag = 'p',
  children,
  size = 'md',
  'size-sm': sizeSm,
  'size-md': sizeMd,
  'size-lg': sizeLg,
  'size-xl': sizeXl,
  color = 'black',
  'data-testid': testId,
  ...bodyProps
}: BodyProps): ReactElement {
  return (
    <Text
      tag={tag}
      font-size={size}
      font-size-sm={sizeSm}
      font-size-md={sizeMd}
      font-size-lg={sizeLg}
      font-size-xl={sizeXl}
      text-color={color}
      data-testid={testId}
      {...bodyProps}
    >
      {children}
    </Text>
  )
}

// → Hero heading font size / line height combos:
// Small: 64px / 72px
// Medium: 72px / 80px
// Large: 80px / 96px

// → Hero body text font size / line height combos
// Small: 16px / 24px
// Medium: 20px / 28px
// Large: 24px / 32px

// → Button text font size / line height combos
// Small: 14px / 20px
// Medium: 16px / 24px
// Large: 18px / 28px

// → Label text font size
// Small: 10px / 16px
// Medium 12px / 16px
// Large: 14px / 16px

// → Space between hero text
// Small: 24px
// Medium: 32px
// Large: 40px
