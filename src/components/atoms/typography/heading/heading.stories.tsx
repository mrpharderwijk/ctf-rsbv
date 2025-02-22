import { Meta, type StoryObj } from '@storybook/react';

import { FlexBox } from '@/components/atoms/layout/flex-box/flex-box';
import { FlexBoxItem } from '@/components/atoms/layout/flex-box/flex-box-item';
import {
  Heading,
  type HeadingProps,
} from '@/components/atoms/typography/heading/heading';

export default {
  title: 'Components/Atoms/Typography/Heading',
  component: Heading,
} as Meta<typeof Heading>;

type Story = StoryObj<typeof Heading>;

const defaultText = 'The quick brown fox jumps over the lazy dog';

export const Overview: Story = {
  render: () => {
    const headingsArray = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

    return (
      <FlexBox flexDirection="col">
        <FlexBoxItem>
          {headingsArray.map((heading) => (
            <Heading key={heading} as={heading as HeadingProps['as']}>
              {defaultText}
            </Heading>
          ))}
        </FlexBoxItem>
      </FlexBox>
    );
  },
};

export const H1: Story = {
  args: {
    children: defaultText,
  },
  parameters: {
    source: `
<Heading>${defaultText}</Heading>
// or
<Heading as='h1'>${defaultText}</Heading>
    `,
    language: 'tsx',
    type: 'auto',
  },
};

export const H2: Story = {
  args: {
    as: 'h2',
    children: defaultText,
  },
  parameters: {
    source: `
<Heading as="h2">${defaultText}</Heading>
    `,
    language: 'tsx',
    type: 'auto',
  },
};

export const H3: Story = {
  args: {
    as: 'h3',
    children: defaultText,
  },
  parameters: {
    source: `
<Heading as="h3">${defaultText}</Heading>
    `,
    language: 'tsx',
    type: 'auto',
  },
};

export const H4: Story = {
  args: {
    as: 'h4',
    children: defaultText,
  },
  parameters: {
    source: `
<Heading as="h4">${defaultText}</Heading>
    `,
    language: 'tsx',
    type: 'auto',
  },
};

export const H5: Story = {
  args: {
    as: 'h5',
    children: defaultText,
  },
  parameters: {
    source: `
<Heading as="h5">${defaultText}</Heading>
    `,
    language: 'tsx',
    type: 'auto',
  },
};

export const H6: Story = {
  args: {
    as: 'h6',
    children: defaultText,
  },
  parameters: {
    source: `
<Heading as="h6">${defaultText}</Heading>
    `,
    language: 'tsx',
    type: 'auto',
  },
};
