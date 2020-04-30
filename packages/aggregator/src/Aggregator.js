/**
 * Tupaia
 * Copyright (c) 2017 - 2020 Beyond Essential Systems Pty Ltd
 */

import {
  aggregateAnalytics,
  filterAnalytics,
  periodFromAnalytics,
  getPeriodForDataBroker,
} from './analytics';
import { AGGREGATION_TYPES } from './aggregationTypes';

export class Aggregator {
  static aggregationTypes = AGGREGATION_TYPES;

  constructor(dataBroker) {
    this.dataBroker = dataBroker;
  }

  close() {
    this.dataBroker.close();
  }

  // eslint-disable-next-line class-methods-use-this
  get aggregationTypes() {
    return Aggregator.aggregationTypes;
  }

  get dataSourceTypes() {
    return this.dataBroker.getDataSourceTypes();
  }

  processAnalytics = (analytics, aggregationOptions, requestedPeriod) => {
    const { aggregationType, aggregationConfig, measureCriteria } = aggregationOptions;
    const aggregatedAnalytics = aggregateAnalytics(analytics, aggregationType, {
      ...aggregationConfig,
      requestedPeriod,
    });
    return filterAnalytics(aggregatedAnalytics, measureCriteria);
  };

  async fetchAnalytics(codeInput, fetchOptions, aggregationOptions = {}) {
    const code = Array.isArray(codeInput) ? codeInput : [codeInput];
    const dataSourceSpec = { code, type: this.dataSourceTypes.DATA_ELEMENT };
    const { startDate, endDate, period, ...restOfFetchOptions } = fetchOptions;
    const periodForDataBroker = getPeriodForDataBroker(aggregationOptions.aggregationType, {
      startDate,
      endDate,
      period,
    });

    const { results, metadata } = await this.dataBroker.pull(dataSourceSpec, {
      ...restOfFetchOptions,
      ...periodForDataBroker,
    });

    return {
      results: this.processAnalytics(results, aggregationOptions, period),
      metadata,
      period: periodFromAnalytics(results, fetchOptions),
    };
  }

  async fetchEvents(code, fetchOptions) {
    const dataSourceSpec = { code, type: this.dataSourceTypes.DATA_GROUP };
    return this.dataBroker.pull(dataSourceSpec, fetchOptions);
  }

  async fetchDataElements(codes, fetchOptions) {
    const dataSourceSpec = { code: codes, type: this.dataSourceTypes.DATA_ELEMENT };
    return this.dataBroker.pullMetadata(dataSourceSpec, fetchOptions);
  }

  // TODO ultimately Aggregator should handle preaggregation internally - at that point this method
  // could be removed
  async pushAggregateData(data) {
    if (data.length === 0) return null;
    const codes = data.map(dataValue => dataValue.code);
    const dataSourceSpec = { code: codes, type: this.dataSourceTypes.DATA_ELEMENT };
    const { diagnostics } = await this.dataBroker.push(dataSourceSpec, data);
    return diagnostics;
  }

  // TODO ultimately Aggregator should handle preaggregation internally - at that point this method
  // could be removed
  async deleteAggregateDataValue(dataValue) {
    const dataSourceSpec = {
      code: dataValue.code,
      type: this.dataSourceTypes.DATA_ELEMENT,
    };
    return this.dataBroker.delete(dataSourceSpec, dataValue);
  }
}