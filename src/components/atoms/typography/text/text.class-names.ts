import { cva } from 'class-variance-authority'

import {
  fontSizeVariants,
  fontWeightVariants,
  letterSpacingVariants,
  lineClampVariants,
  lineHeightVariants,
  textAlignVariants,
  textDecorationVariants,
  textIndentVariants,
  textOverflowVariants,
  textTransformVariants,
  textWrapVariants,
  verticalAlignVariants,
  whiteSpaceVariants,
} from '@/utils/variants'
import { textColorVariants } from '@/utils/variants/typography/text-color'

export const textClassNames = cva('', {
  variants: {
    ...fontSizeVariants,
    ...fontWeightVariants,
    ...letterSpacingVariants,
    ...lineClampVariants,
    ...lineHeightVariants,
    ...textAlignVariants,
    ...textColorVariants,
    ...textDecorationVariants,
    ...textIndentVariants,
    ...textOverflowVariants,
    ...textTransformVariants,
    ...textWrapVariants,
    ...verticalAlignVariants,
    ...whiteSpaceVariants,
  },
})
