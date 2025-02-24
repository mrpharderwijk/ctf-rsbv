import { VariantProps } from 'class-variance-authority'
import { PropsWithChildren, ReactElement } from 'react'

import { Box } from '@/components/atoms/layout/box/box'
import { flexBoxItemClassNames } from '@/components/atoms/layout/flex-box/flex-box-item/flex-box-item.class-names'

export type FlexBoxItemProps = PropsWithChildren<
  VariantProps<typeof flexBoxItemClassNames>
>

export function FlexBoxItem({
  children,
  ...props
}: FlexBoxItemProps): ReactElement {
  return <Box {...props}>{children}</Box>
}
