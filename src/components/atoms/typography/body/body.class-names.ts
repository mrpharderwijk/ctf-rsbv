import { cva } from 'class-variance-authority'

import { fontWeightVariants } from '@/utils/variants'

export const bodyClassNames = cva('', {
  variants: {
    ...fontWeightVariants,
  },
})
