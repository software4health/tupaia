/*
 * Tupaia
 * Copyright (c) 2017 - 2020 Beyond Essential Systems Pty Ltd
 */
import React from 'react';
import { render as renderReactApp } from 'react-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { EnvBanner } from '@tupaia/ui-components';
import App from './App';
import { AppProviders } from './AppProviders';
import { store } from './store/store';

const render = () => {
  return renderReactApp(
    <AppProviders store={store}>
      <ReactQueryDevtools />
      <EnvBanner />
      <App />
    </AppProviders>,
    document.getElementById('root'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./App').default;
    render(NextApp);
  });
}
