import { VariantProps } from 'class-variance-authority'
import { PropsWithChildren, ReactElement } from 'react'

import { bodyClassNames } from '@/components/atoms/typography/body/body.class-names'
import { Text } from '@/components/atoms/typography/text/text'
import { textClassNames } from '@/components/atoms/typography/text/text-class-names'
import { PropsWithTestId, TextElementTag } from '@/types'

type BodyProps = PropsWithChildren<
  PropsWithTestId<
    VariantProps<typeof bodyClassNames> & {
      size?: VariantProps<typeof textClassNames>['fontSize']
      'size-sm'?: VariantProps<typeof textClassNames>['fontSize-sm']
      'size-md'?: VariantProps<typeof textClassNames>['fontSize-md']
      'size-lg'?: VariantProps<typeof textClassNames>['fontSize-lg']
      'size-xl'?: VariantProps<typeof textClassNames>['fontSize-xl']
      color?: VariantProps<typeof textClassNames>['textColor']
      weight?: VariantProps<typeof textClassNames>['fontWeight']
      'weight-sm'?: VariantProps<typeof textClassNames>['fontWeight-sm']
      'weight-md'?: VariantProps<typeof textClassNames>['fontWeight-md']
      'weight-lg'?: VariantProps<typeof textClassNames>['fontWeight-lg']
      'weight-xl'?: VariantProps<typeof textClassNames>['fontWeight-xl']
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
      fontSize={size}
      fontSize-sm={sizeSm}
      fontSize-md={sizeMd}
      fontSize-lg={sizeLg}
      fontSize-xl={sizeXl}
      textColor={color}
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
