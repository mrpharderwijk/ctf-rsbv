import { StorybookConfig } from '@storybook/experimental-nextjs-vite';

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/react-docgen-typescript",
  ],
  framework: {
    name: "@storybook/experimental-nextjs-vite",
    options: {},
  },
  staticDirs: [
    "../public"
  ]
};
export default config;
