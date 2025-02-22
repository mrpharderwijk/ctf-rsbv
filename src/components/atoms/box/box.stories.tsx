import { Meta, StoryObj } from '@storybook/react';

import { BorderBox } from '@/storybook/components/border-box';
import { MarginBox } from '@/storybook/components/margin-box';
import { PaddingBox } from '@/storybook/components/padding-box';
import { Rectangle } from '@/storybook/components/rectangle';

import { Box } from './box';

export default {
  title: 'Components/Atoms/Layout/Box',
  component: Box,
} as Meta<typeof Box>;

type Story = StoryObj<typeof Box>;

export const Margin: Story = {
  render: () => (
    <MarginBox position="relative" float="left" bgColor="yellow-100">
      <Box as="aside" margin={4} position="relative">
        <BorderBox zIndex={30} />
        <Rectangle position="absolute" spread zIndex={10} />
        <span className="z-10 relative">Hello, World!</span>
      </Box>
    </MarginBox>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Box as="aside" margin={4} position="relative">
  Hello World!
</Box>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const Padding: Story = {
  args: {
    // Add default props here
    as: 'section',
    padding: 4,
    children: (
      <>
        <PaddingBox />
        <Rectangle>
          <span className="relative">Hello, World!</span>
        </Rectangle>
      </>
    ),
  },
  parameters: {
    docs: {
      source: {
        code: `
<Box as="section" padding={4}>
  Hello World!
</Box>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};
