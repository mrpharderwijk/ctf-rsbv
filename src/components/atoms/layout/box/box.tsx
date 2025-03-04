import { type VariantProps } from 'class-variance-authority'
import { PropsWithChildren, ReactElement, Ref } from 'react'

import { boxClassnames } from './box.class-names'

import { ElementTag, PropsWithTestId } from '@/types'
import { cn } from '@/utils/class-names'

export type BoxProps = VariantProps<typeof boxClassnames> &
  PropsWithChildren<
    PropsWithTestId<
      | ElementTag
      | {
          tag?: 'ul' | 'li'
        }
    > & { ref?: Ref<HTMLDivElement> }
  >

export function Box({
  tag = 'div',
  children,
  'data-testid': testId,
  ...boxProps
}: BoxProps): ReactElement {
  const Tag = tag

  return (
    <Tag data-testid={testId} className={cn(boxClassnames({ ...boxProps }))}>
      {children}
    </Tag>
  )
}
