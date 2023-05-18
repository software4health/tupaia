/*
 * Tupaia
 * Copyright (c) 2017 - 2023 Beyond Essential Systems Pty Ltd
 */

import moment from 'moment';
import { useTheme } from '@material-ui/core/styles';
import { GRANULARITY_CONFIG } from '@tupaia/utils';
import { DataProps, ChartType, ViewContent, VizPeriodGranularity } from '../types';

export const isMobile = () => process.env.REACT_APP_APP_TYPE === 'mobile';

// Timestamps returned from the back-end correspond to UTC time
// @ts-ignore
export const formatTimestampForChart = (
  timestamp: number,
  granularity: VizPeriodGranularity,
  periodTickFormat: any,
) => moment.utc(timestamp).format(periodTickFormat || GRANULARITY_CONFIG[granularity].chartFormat);

export const getIsTimeSeries = (data: DataProps[]) => data && data.length > 0 && data[0]?.timestamp;

export const isDataKey = (key: string) =>
  !(['name', 'timestamp'].includes(key) || key.substr(-9) === '_metadata');

export const getContrastTextColor = () => {
  const theme = useTheme();
  return theme.palette.type === 'light' ? theme.palette.text.secondary : 'white';
};

export const getIsChartData = ({
  chartType,
  data,
}: {
  chartType: ChartType;
  data: DataProps[];
}): boolean => {
  // If all segments of a pie chart are "0", display the no data message
  if (chartType === ChartType.Pie && data && data.every(segment => segment.value === 0)) {
    return false;
  }

  return data && data.length > 0;
};

export const getNoDataString = (viewContent: ViewContent) => {
  const { noDataMessage, source, startDate, endDate } = viewContent;
  if (noDataMessage) {
    return noDataMessage;
  }

  if (source === 'mSupply') {
    return 'Requires mSupply';
  }

  if (startDate && endDate) {
    return `No data for ${startDate} to ${endDate}`;
  }

  return 'No data for selected dates';
};
