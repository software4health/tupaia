/**
 * Tupaia
 * Copyright (c) 2017 - 2020 Beyond Essential Systems Pty Ltd
 */

import { GETHandler } from '../GETHandler';
import { assertAnyPermissions, assertBESAdminAccess } from '../../permissions';
import {
  assertDashboardReportsPermissions,
  createDashboardReportDBFilter,
} from './assertDashboardReportsPermissions';
/**
 * Handles endpoints:
 * - /dashboardReports
 * - /dashboardReports/:dashboardReportId
 */
export class GETDashboardReports extends GETHandler {
  permissionsFilteredInternally = true;

  async findSingleRecord(dashboardReportId, options) {
    const dashboardReport = await super.findSingleRecord(dashboardReportId, options);

    const dashboardReportChecker = accessPolicy =>
      assertDashboardReportsPermissions(accessPolicy, this.models, dashboardReportId);

    await this.assertPermissions(
      assertAnyPermissions([assertBESAdminAccess, dashboardReportChecker]),
    );

    return dashboardReport;
  }

  async findRecords(criteria, options) {
    const dbConditions = await createDashboardReportDBFilter(
      this.accessPolicy,
      this.models,
      criteria,
    );
    const dashboardReports = await super.findRecords(dbConditions, options);

    return dashboardReports;
  }
}
