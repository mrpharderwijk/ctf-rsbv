import { type VariantProps } from 'class-variance-authority'
import { ReactElement } from 'react'

import { loaderClassNames, loaderVariants } from './loader-class-names'

import { cn } from '@/utils/class-names'

export type LoaderProps = VariantProps<typeof loaderClassNames>

export function Loader({ size }: LoaderProps): ReactElement {
  return (
    <div className={cn(loaderClassNames({ size }))} aria-label="Loading..." />
  )
}

// Export for Storybook
Loader.sizes = Object.keys(loaderVariants.size) as Array<LoaderProps['size']>
