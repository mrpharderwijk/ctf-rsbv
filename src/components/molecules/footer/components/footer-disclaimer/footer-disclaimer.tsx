import { PropsWithChildren, ReactElement } from 'react'

import { Box } from '@/components/atoms/layout/box/box'
import { Body } from '@/components/atoms/typography/body/body'
import { Heading } from '@/components/atoms/typography/heading/heading'

type FooterDisclaimerProps = PropsWithChildren<{
  title?: string
}>

export function FooterDisclaimer({
  children,
  title,
}: FooterDisclaimerProps): ReactElement {
  return (
    <Box
      border-b="px"
      border-b-md="px"
      borderColor="gray-light"
      display="flex"
      flexDirection="col"
      padding-b={6}
      padding-b-xl={12}
    >
      <Box display="flex" flexDirection="col" max-w="2xl" gap-y={3}>
        {!!title && (
          <Heading tag="h4" like="h6">
            {title}
          </Heading>
        )}
        <Body size="sm">{children}</Body>
      </Box>
    </Box>
  )
}
