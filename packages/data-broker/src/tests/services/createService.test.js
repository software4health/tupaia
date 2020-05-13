/**
 * Tupaia
 * Copyright (c) 2017 - 2020 Beyond Essential Systems Pty Ltd
 */

import { expect } from 'chai';
import { TupaiaDataApi } from '@tupaia/data-api';

import { createService } from '../../services/createService';
import { DhisService } from '../../services/dhis';
import { TupaiaDataService } from '../../services/tupaia';

describe('createService()', () => {
  const models = {
    dataSource: {
      getTypes: () => ({}),
    },
  };

  it('throws an error for invalid service type', () => {
    expect(() => createService(models, 'invalidService')).to.throw(/invalid.*type/i);
  });

  it('dhis service', () => {
    const service = createService(models, 'dhis');

    expect(service).to.be.instanceOf(DhisService);
    expect(service).to.have.deep.property('models', models);
  });

  it('tupaia service', () => {
    const service = createService(models, 'tupaia');

    expect(service).to.be.instanceOf(TupaiaDataService);
    expect(service).to.have.deep.property('models', models);
    expect(service).to.have.deep.property('api');
    expect(service.api).to.be.instanceOf(TupaiaDataApi);
    expect(service.api).to.have.deep.property('models', models);
  });
});
