import React from 'react';
import type { Preview } from '@storybook/react';
import { AppProviders } from '../src/AppProviders';
import ReactRouterDecorator from './ReactRouterDecorator';
import ReactHookFormDecorator from './ReactHookFormDecorator';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'Dark',
      values: [
        { name: 'Dark', value: '#262834' },
        { name: 'Light', value: '#ffffff' },
      ],
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    ReactRouterDecorator,
    ReactHookFormDecorator,
    Story => {
      return (
        <AppProviders>
          <Story />
        </AppProviders>
      );
    },
  ],
};

export default preview;
