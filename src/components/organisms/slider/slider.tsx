'use client'

import { PropsWithChildren, ReactElement } from 'react'

import { Box } from '@/components/atoms/layout/box/box'
import { PropsWithTestId } from '@/types'

type SliderProps = PropsWithChildren<PropsWithTestId>

export function Slider({
  children,
  'data-testid': dataTestId,
}: SliderProps): ReactElement {
  return (
    <Box
      bg-color="gray-lightest"
      display="flex"
      flex-direction="col"
      align-items="start"
      justify-content="center"
      width="full"
      overflow-x="hidden"
      data-testid={dataTestId}
    >
      <Box
        display="flex"
        overflow-x="scroll"
        snap="x"
        snap-type="mandatory"
        width="full"
        gap={6}
        padding-x={6}
        padding-x-md={10}
        padding-x-xl={20}
      >
        {children}
      </Box>
    </Box>
  )
}
