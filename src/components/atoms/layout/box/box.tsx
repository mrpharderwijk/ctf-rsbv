import { type VariantProps } from 'class-variance-authority'
import { PropsWithChildren, ReactElement } from 'react'

import { boxClassnames } from './box.class-names'

import { ElementTag, PropsWithTestId } from '@/types'
import { cn } from '@/utils/class-names'

type BoxStylesProps = VariantProps<typeof boxClassnames> &
  PropsWithChildren<PropsWithTestId<ElementTag>>

export type BoxProps = BoxStylesProps

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
