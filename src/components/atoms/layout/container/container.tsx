import { HTMLProps, ReactElement } from 'react'

import { cn } from '@/utils/class-names'

export function Container({
  className,
  ...props
}: HTMLProps<HTMLDivElement>): ReactElement {
  return (
    <div
      className={cn(
        'max-w[2520px] mx-auto w-full px-6 md:px-10 lg:px-20',
        className,
      )}
      {...props}
    />
  )
}
