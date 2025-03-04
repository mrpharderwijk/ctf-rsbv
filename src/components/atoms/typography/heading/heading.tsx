import { HTMLAttributes, PropsWithChildren, ReactElement } from 'react'

import { Text, TextProps } from '@/components/atoms/typography/text/text'
import { PropsWithTestId } from '@/types'

type HeadingElementTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type HeadingProps = PropsWithChildren<
  PropsWithTestId<
    {
      tag?: HeadingElementTag
      like?: HeadingElementTag
    } & HTMLAttributes<HTMLHeadingElement> &
      TextProps
  >
>

const headingTextPropsMap = {
  h1: {
    'font-size': 'xl',
  },
  h2: {
    'font-size': 'lg',
    'font-weight': 'medium',
  },
  h3: {
    'font-size': 'base',
  },
  h4: {
    'font-size': 'smd',
    'font-size-md': 'lg',
    'font-size-lg': 'xl',
    'font-weight': 'medium',
  },
  h5: {
    'font-size': 'sm',
    'font-weight': 'semibold',
  },
  h6: {
    'font-size': 'xs',
    'font-weight': 'semibold',
  },
}

export function Heading({
  children,
  like,
  tag = 'h1',
  ...headingProps
}: HeadingProps): ReactElement {
  const textProps = {
    tag,
    ...(!!like && (headingTextPropsMap[like] as TextProps)),
    ...headingProps,
  }

  return <Text {...textProps}>{children}</Text>
}
