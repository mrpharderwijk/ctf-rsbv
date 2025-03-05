import { VariantProps } from 'class-variance-authority'
import { HTMLProps, ReactElement } from 'react'

import { containerClassNames } from '@/components/atoms/layout/container/container.class-names'
import { ElementTag, PropsWithTestId } from '@/types'
import { cn } from '@/utils/class-names'

type ContainerElementTag = ElementTag
type ContainerProps = PropsWithTestId<
  VariantProps<typeof containerClassNames> &
    HTMLProps<HTMLDivElement> &
    ContainerElementTag
>

export function Container({
  className,
  'data-testid': dataTestId,
  tag = 'div',
  padding = true,
  fullWidth,
  ...props
}: ContainerProps): ReactElement {
  const containerClassName = cn(
    containerClassNames({ padding, fullWidth, ...props }),
    className,
  )
  const Tag = tag

  return (
    <Tag data-testid={dataTestId} className={containerClassName} {...props} />
  )
}
