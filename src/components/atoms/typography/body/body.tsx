import { cva, VariantProps } from 'class-variance-authority';
import { PropsWithChildren, ReactElement } from 'react';

import { Text } from '@/components/atoms/typography/text/text';
import { textClassNames } from '@/components/atoms/typography/text/text-class-names';
import { PropsWithTestId, TextElementTag } from '@/types';

type BodyProps = PropsWithChildren<
  PropsWithTestId<VariantProps<typeof textClassNames> & { tag?: TextElementTag }>
>;

export function Body({
  tag = 'p',
  children,
  'data-testid': testId,
  ...bodyProps
}: BodyProps): ReactElement {
  return (
    <Text tag={tag} data-testid={testId} {...bodyProps}>
      {children}
    </Text>
  );
}

// → Hero heading font size / line height combos:
// Small: 64px / 72px
// Medium: 72px / 80px
// Large: 80px / 96px

// → Hero body text font size / line height combos
// Small: 16px / 24px
// Medium: 20px / 28px
// Large: 24px / 32px

// → Button text font size / line height combos
// Small: 14px / 20px
// Medium: 16px / 24px
// Large: 18px / 28px

// → Label text font size
// Small: 10px / 16px
// Medium 12px / 16px
// Large: 14px / 16px

// → Space between hero text
// Small: 24px
// Medium: 32px
// Large: 40px
