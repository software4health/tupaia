/**
 * Tupaia Config Server
 * Copyright (c) 2019 Beyond Essential Systems Pty Ltd
 */

/* eslint-disable class-methods-use-this */

import moment from 'moment';
import { DataBuilder } from '/apiV1/dataBuilders/DataBuilder';
import { DataPerPeriodBuilder } from 'apiV1/dataBuilders/DataPerPeriodBuilder';
import { groupEventsByPeriod } from '@tupaia/dhis-api';

/**
 * @abstract
 */

class DataByValueBuilder extends DataBuilder {
  async buildData(results) {
    const { dataElement, valuesOfInterest, isPercentage } = this.config;
    const returnData = {};
    let totalEvents = 0;
    results.forEach(({ dataValues }) => {
      if (!dataValues[dataElement]) {
        return;
      }
      if (valuesOfInterest && !valuesOfInterest.includes(value)) {
        // not interested in this value, ignore it
        return;
      }
      const value = dataValues[dataElement].value;
      if (!returnData[value]) {
        returnData[value] = 0;
      }
      returnData[value] += 1;
      totalEvents++;
    });

    // Turn to percentage
    if (isPercentage) {
      Object.keys(returnData).forEach(key => {
        returnData[key] /= totalEvents;
      });
    }
    return [returnData];
  }
}

export class CountEventsPerPeriodByDataValueBuilder extends DataPerPeriodBuilder {
  async fetchResults() {
    return this.fetchEvents({ dataValueFormat: 'object' });
  }

  groupResultsByPeriod = groupEventsByPeriod;

  getBaseBuilderClass = () => DataByValueBuilder;
}

export const countEventsPerPeriodByDataValue = async (
  { dataBuilderConfig, query, entity },
  aggregator,
  dhisApi,
) => {
  const builder = new CountEventsPerPeriodByDataValueBuilder(
    aggregator,
    dhisApi,
    dataBuilderConfig,
    query,
    entity,
  );
  return builder.build();
};