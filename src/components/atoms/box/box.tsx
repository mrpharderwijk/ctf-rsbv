import { type VariantProps } from 'class-variance-authority';
import { PropsWithChildren, ReactElement } from 'react';

import { ElementTag, PropsWithTestId } from '@/types';
import { cn } from '@/utils/class-names';

import { boxClassnames } from './box-class-names';

type BoxStylesProps = VariantProps<typeof boxClassnames> &
  PropsWithChildren<PropsWithTestId<ElementTag>>;

export type BoxProps = BoxStylesProps;

export function Box({
  as = 'div',
  children,
  'data-testid': testId,
  ...boxProps
}: BoxProps): ReactElement {
  const Tag = as;

  return (
    <Tag data-testid={testId} className={cn(boxClassnames({ ...boxProps }))}>
      {children}
    </Tag>
  );
}
