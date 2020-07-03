/**
 * Tupaia
 * Copyright (c) 2017 - 2020 Beyond Essential Systems Pty Ltd
 */

import '@testing-library/cypress/add-commands';

import snapshot from '@cypress/snapshot';
import { escapeRegex } from './utilities';

snapshot.register();

Cypress.Commands.add('closestByTestId', { prevSubject: 'element' }, (subject, testId) =>
  cy.wrap(subject).closest(`[data-testid="${testId}"]`),
);

Cypress.Commands.add('findByInputName', { prevSubject: 'element' }, (subject, inputName) =>
  cy.wrap(subject).find(`input[name="${inputName}"]`),
);

Cypress.Commands.add(
  'findByTextI',
  { prevSubject: ['element', 'optional'] },
  (subject, searchText, options) =>
    cy.wrap(subject).findByText(new RegExp(escapeRegex(searchText), 'i'), options),
);
