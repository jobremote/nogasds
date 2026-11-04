import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['storybook-addon-pseudo-states'],
  framework: '@storybook/react-vite',
};

export default config;
