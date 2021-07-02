/*
 * Tupaia
 * Copyright (c) 2017 - 2020 Beyond Essential Systems Pty Ltd
 *
 */
import { useQuery } from 'react-query';
import { get } from '../api';

export const useDashboardReportData = ({
  entityCode,
  reportCode,
  itemCode,
  dashboardCode,
  legacy,
  startDate,
  endDate,
}) => {
  const params = {
    startDate,
    endDate,
    itemCode,
    dashboardCode,
    legacy,
    type: 'dashboard',
  };

  return useQuery(
    ['dashboardReport', entityCode, reportCode, params],
    () =>
      get(`report/${entityCode}/${reportCode}`, {
        params,
      }),
    { staleTime: 60 * 60 * 1000, refetchOnWindowFocus: false, keepPreviousData: true },
  );
};
