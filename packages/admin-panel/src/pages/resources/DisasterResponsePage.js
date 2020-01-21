/**
 * Tupaia MediTrak
 * Copyright (c) 2017 Beyond Essential Systems Pty Ltd
 */

import React from 'react';
import { ResourcePage } from './ResourcePage';

const id = {
  Header: 'id',
  source: 'id',
  editable: false,
};

const type = {
  Header: 'Type',
  source: 'type',
  editable: false,
};

const description = {
  Header: 'Description',
  source: 'description',
};

const name = {
  Header: 'Name',
  source: 'name',
};

const countryCode = {
  Header: 'Country',
  source: 'country',
};

const point = {
  Header: 'Point',
  source: 'point',
  filterable: false,
};

const bounds = {
  Header: 'Bounds',
  source: 'bounds',
  filterable: false,
};

const DISASTER_FIELDS = [id, type, description, name, countryCode, point, bounds];

const IMPORT_CONFIG = {
  title: 'Import Disaster',
  instruction: 'Please test on development server',
  actionConfig: {
    importEndpoint: 'disaster',
  },
};

export const DisasterResponsePage = () => (
  <ResourcePage
    title="Disasters"
    endpoint="disaster"
    columns={DISASTER_FIELDS}
    importConfig={IMPORT_CONFIG}
  />
);
