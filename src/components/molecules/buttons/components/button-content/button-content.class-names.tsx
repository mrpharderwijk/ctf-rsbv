import { cva } from 'class-variance-authority'

export const buttonContentClassNames = cva(
  'relative flex flex-row items-center justify-center overflow-hidden',
  {
    variants: {
      variant: {
        primary: [
          'text-white',
          'bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700',
        ],
        'primary-link': ['text-white'],
        secondary: [
          'text-zinc-50 disabled:text-secondary-700',
          'bg-secondary-600 border-secondary-600 hover:bg-secondary-500 hover:border-secondary-500 active:bg-secondary-700 active:border-secondary-700 disabled:bg-secondary-200 disabled:border-secondary-200',
        ],
        tertiary: [
          'text-zinc-50 disabled:text-tertiary-700',
          'bg-tertiary-600 border-tertiary-600 hover:bg-tertiary-500 hover:border-tertiary-500 active:bg-tertiary-700 active:border-tertiary-700 disabled:bg-tertiary-200 disabled:border-tertiary-200',
        ],
        gray: [
          'bg-[#FF385C] hover:bg-[#FF385C] dark:bg-[#FF385C] dark:hover:bg-[#FF385C]',
        ],
        'gray-link': [],
        'gray-hover': [
          'bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-700',
        ],
        outline: ['text-text-black', 'border-2 bg-white border-black'],
      },

      size: {
        xs: ['text-xs font-semibold tracking-wide', 'px-2 py-1', 'rounded'],
        sm: ['text-sm font-semibold tracking-wide', 'px-2 py-1', 'rounded'],
        md: [
          'text-sm font-semibold tracking-wide',
          'px-2.5 py-1.5',
          'rounded-md',
        ],
        lg: ['text-sm font-semibold tracking-wide', 'px-3 py-2', 'rounded-md'],
        xl: ['text-sm font-semibold tracking-wide', 'px-3 py-2', 'rounded-md'],
      },

      noPadding: {
        true: ['p-0'],
      },
    },
  },
)
