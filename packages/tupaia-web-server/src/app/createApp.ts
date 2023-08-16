/**
 * Tupaia
 * Copyright (c) 2017 - 2023 Beyond Essential Systems Pty Ltd
 */

import { Request } from 'express';
import { TupaiaDatabase } from '@tupaia/database';
import {
  OrchestratorApiBuilder,
  handleWith,
  attachSessionIfAvailable,
  SessionSwitchingAuthHandler,
  forwardRequest,
} from '@tupaia/server-boilerplate';
import { TupaiaWebSessionModel } from '../models';
import {
  DashboardsRoute,
  DashboardsRequest,
  EntitiesRoute,
  EntitiesRequest,
  EntityAncestorsRoute,
  EntityAncestorsRequest,
  ReportRoute,
  ReportRequest,
  LegacyDashboardReportRoute,
  LegacyDashboardReportRequest,
  LegacyMapOverlayReportRoute,
  LegacyMapOverlayReportRequest,
  MapOverlaysRoute,
  MapOverlaysRequest,
  UserRoute,
  UserRequest,
  ProjectRoute,
  ProjectRequest,
  CountryAccessListRoute,
  CountryAccessListRequest,
  RequestCountryAccessRoute,
  EntitySearchRoute,
  EntitySearchRequest,
  RequestCountryAccessRequest,
  EntityRoute,
  EntityRequest,
} from '../routes';

const {
  WEB_CONFIG_API_URL = 'http://localhost:8000/api/v1',
  CENTRAL_API_URL = 'http://localhost:8090/v2',
} = process.env;

const authHandlerProvider = (req: Request) => new SessionSwitchingAuthHandler(req);

export function createApp() {
  const app = new OrchestratorApiBuilder(new TupaiaDatabase(), 'tupaia-web')
    .useSessionModel(TupaiaWebSessionModel)
    .useAttachSession(attachSessionIfAvailable)
    .attachApiClientToContext(authHandlerProvider)
    .get<ReportRequest>('report/:reportCode', handleWith(ReportRoute))
    .get<LegacyDashboardReportRequest>(
      'legacyDashboardReport/:reportCode',
      handleWith(LegacyDashboardReportRoute),
    )
    .get<LegacyMapOverlayReportRequest>(
      'legacyMapOverlayReport/:mapOverlayCode',
      handleWith(LegacyMapOverlayReportRoute),
    )
    .get<MapOverlaysRequest>('mapOverlays/:projectCode/:entityCode', handleWith(MapOverlaysRoute))
    .get<ProjectRequest>('project/:projectCode', handleWith(ProjectRoute))
    .get<UserRequest>('getUser', handleWith(UserRoute))
    .get<DashboardsRequest>('dashboards/:projectCode/:entityCode', handleWith(DashboardsRoute))
    .get<CountryAccessListRequest>('countryAccessList', handleWith(CountryAccessListRoute))
    .post<RequestCountryAccessRequest>(
      'requestCountryAccess',
      handleWith(RequestCountryAccessRoute),
    )
    .get<EntityRequest>('entity/:projectCode/:entityCode', handleWith(EntityRoute))
    .get<EntitiesRequest>('entities/:projectCode/:rootEntityCode', handleWith(EntitiesRoute))
    .get<EntitySearchRequest>('entitySearch/:projectCode', handleWith(EntitySearchRoute))
    .get<EntityAncestorsRequest>(
      'entityAncestors/:projectCode/:rootEntityCode',
      handleWith(EntityAncestorsRoute),
    )
    .use('downloadFiles', forwardRequest(CENTRAL_API_URL, { authHandlerProvider }))
    // Forward everything else to webConfigApi
    .use('*', forwardRequest(WEB_CONFIG_API_URL, { authHandlerProvider }))
    .build();

  return app;
}