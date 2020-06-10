/**
 * Tupaia Config Server
 * Copyright (c) 2019 Beyond Essential Systems Pty Ltd
 */

import { DataPerOrgUnitBuilder } from './DataPerOrgUnitBuilder';
import { CountEventsBuilder } from '/apiV1/dataBuilders/generic/count/countEvents';

export class CountEventsPerOrgUnitBuilder extends DataPerOrgUnitBuilder {
  getBaseBuilderClass = () => CountEventsBuilder;

  async fetchResultsAndPeriod() {
    const dataElementCodes = Object.keys(this.config.dataValues);
    return {
      results: this.fetchEvents({ dataElementCodes, useDeprecatedApi: false }),
      period: null,
    };
  }
}

export const countEventsPerOrgUnit = async (
  aggregator,
  dhisApi,
  query,
  measureBuilderConfig,
  entity,
) => {
  const builder = new CountEventsPerOrgUnitBuilder(
    aggregator,
    dhisApi,
    measureBuilderConfig,
    query,
    entity,
  );
  return builder.build();
};
