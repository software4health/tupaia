/**
 * Tupaia
 * Copyright (c) 2017 - 2020 Beyond Essential Systems Pty Ltd
 */

import { Request } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';
import { AccessPolicy } from '@tupaia/access-policy';
import { Authenticator } from '@tupaia/auth';
import { TupaiaDatabase, ModelRegistry } from '@tupaia/database';

export interface ReportsRequest<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = ReportsRequestBody,
  ReqQuery = Query
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  accessPolicy: AccessPolicy;
  authenticator: Authenticator;
  database: TupaiaDatabase;
  models: ModelRegistry;
}

interface ReportsRequestBody {
  emailAddress: string;
  password: string;
}
