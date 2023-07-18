import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiSubset from 'chai-subset';
import deepEqualInAnyOrder from 'deep-equal-in-any-order';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import winston from 'winston';

import { getIsProductionEnvironment } from '@tupaia/utils';
import { getModels, resetTestData } from './testUtilities';
import * as SendEmail from '../utilities/sendEmail';
import { clearAllTestData } from '@tupaia/database';

// These setup tasks need to be performed before any test, so we
// do them in this file outside of any describe block.

before(async () => {
  const isProductionEnvironment = getIsProductionEnvironment();
  if (isProductionEnvironment) {
    // Don't test on production
    throw new Error('Never run the test suite on the production server, it messes with data!');
  }

  sinon.stub(SendEmail, 'sendEmail');

  await resetTestData();

  chai.use(chaiSubset);
  chai.use(deepEqualInAnyOrder);
  chai.use(sinonChai);
  // `chaiAsPromised` must be used after other plugins to promisify them
  chai.use(chaiAsPromised);

  // Silence winston logs
  winston.configure({
    transports: [new winston.transports.Console({ silent: true })],
  });
});

after(async () => {
  const models = getModels();
  SendEmail.sendEmail.restore();
  await clearAllTestData(models.database);
  await models.database.closeConnections();
});
