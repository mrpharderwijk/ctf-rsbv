import { cva } from 'class-variance-authority'

export const containerClassNames = cva('mx-auto', {
  variants: {
    padding: {
      true: 'px-6 md:px-10 lg:px-10 xl:px-20',
      false: undefined,
    },
    fullWidth: {
      true: 'w-full',
      false: 'max-w[2520px] w-full',
    },
  },
  defaultVariants: {
    fullWidth: false,
  },
})
