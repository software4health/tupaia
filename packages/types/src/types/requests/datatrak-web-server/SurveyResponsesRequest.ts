/**
 * Tupaia
 * Copyright (c) 2017 - 2023 Beyond Essential Systems Pty Ltd
 */

import { SurveyResponse as SurveyResponseT, Country, Entity, Survey } from '../../models';

export type Params = Record<string, never>;

type SurveyResponse = {
  assessorName: SurveyResponseT['assessor_name'];
  countryName: Country['name'];
  countryCode: Country['code'];
  dataTime: Date;
  entityName: Entity['name'];
  id: SurveyResponseT['id'];
  surveyName: Survey['name'];
  surveyProjectId: Survey['project_id'];
  surveyCode: Survey['code'];
};

export type ResBody = SurveyResponse[];
export type ReqBody = Record<string, never>;
export interface ReqQuery {
  fields?: string[];
  userId: string;
  pageSize?: number;
  sort?: string[];
  projectId?: string;
}
