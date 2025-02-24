import { PropsWithChildren, ReactElement } from 'react'

import { Box } from '@/components/atoms/layout/box/box'
import { Heading } from '@/components/atoms/typography/heading/heading'

type FooterListProps = PropsWithChildren<{
  title?: string
}>

export function FooterList({ children, title }: FooterListProps): ReactElement {
  return (
    <Box
      border-b="px"
      border-b-xl="none"
      borderColor="gray-light"
      display="flex"
      flexDirection="col"
      gap-y={4}
      padding-b={6}
    >
      {!!title && (
        <Heading tag="h4" like="h6">
          {title}
        </Heading>
      )}
      <ul className="grid grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-x-3 xl:grid-cols-1">
        {children}
      </ul>
    </Box>
  )
}
