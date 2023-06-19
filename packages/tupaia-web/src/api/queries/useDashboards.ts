/*
 * Tupaia
 *  Copyright (c) 2017 - 2023 Beyond Essential Systems Pty Ltd
 */
import { useQuery } from 'react-query';
import camelcaseKeys from 'camelcase-keys';
import { Dashboard } from '@tupaia/types';
import { get } from '../api';

type DashboardRecord = Dashboard & {
  items: { childId: string }[];
};

type DashboardsResponse = DashboardRecord[];
export const useDashboards = (projectCode?: string, entityCode?: string) => {
  return useQuery(
    ['dashboards', projectCode, entityCode],
    async (): Promise<DashboardsResponse> => {
      const response = await get('dashboards', {
        params: { organisationUnitCode: entityCode, projectCode },
      });
      return camelcaseKeys(response, { deep: true });
    },
    { enabled: !!entityCode && !!projectCode },
  );
};
