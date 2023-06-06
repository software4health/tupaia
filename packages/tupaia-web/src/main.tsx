/**
 * Tupaia
 * Copyright (c) 2017 - 2023 Beyond Essential Systems Pty Ltd
 */
import React from 'react';
import { render as renderReactApp } from 'react-dom';
import App from './App';
import { AppProviders } from './AppProviders';

renderReactApp(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById('root'),
);
