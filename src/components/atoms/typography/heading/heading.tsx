import { HTMLAttributes, PropsWithChildren, ReactElement } from 'react'

import { Text, TextProps } from '@/components/atoms/typography/text/text'
import { PropsWithTestId } from '@/types'

type HeadingElementTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type HeadingProps = PropsWithChildren<
  PropsWithTestId<{
    tag?: HeadingElementTag
    like?: HeadingElementTag
  }> &
    HTMLAttributes<HTMLHeadingElement>
>

const headingTextPropsMap = {
  h1: {
    fontSize: 'base',
    'fontSize-md': 'lg',
    'fontSize-lg': 'xl',
    fontWeight: 'medium',
  },
  h2: {
    fontSize: 'base',
    'fontSize-md': 'lg',
    'fontSize-lg': 'xl',
    fontWeight: 'medium',
  },
  h3: {
    fontSize: 'base',
    'fontSize-md': 'lg',
    'fontSize-lg': 'xl',
    fontWeight: 'medium',
  },
  h4: {
    fontSize: 'base',
    'fontSize-md': 'lg',
    'fontSize-lg': 'xl',
    fontWeight: 'medium',
  },
  h5: {
    fontSize: 'smd',
    lineHeight: '2xl',
    'fontSize-md': 'md',
    'lineHeight-md': '3xl',
    'fontSize-lg': 'smd',
    'lineHeight-lg': 'xs',
    'fontSize-xl': 'md',
    'lineHeight-xl': '3xl',
    fontWeight: 'semibold',
  },
  h6: {
    fontSize: 'md',
    'fontSize-md': 'lg',
    'fontSize-lg': 'xl',
    fontWeight: 'medium',
  },
}

export function Heading({
  children,
  like,
  tag = 'h1',
  ...headingProps
}: HeadingProps): ReactElement {
  const headingLike = like ?? tag
  const textProps = {
    tag,
    ...(headingTextPropsMap[headingLike] as TextProps),
    ...headingProps,
  }

  return <Text {...textProps}>{children}</Text>
}
