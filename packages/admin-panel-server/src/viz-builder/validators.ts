/**
 * Tupaia
 * Copyright (c) 2017 - 2021 Beyond Essential Systems Pty Ltd
 */
import { yup } from '@tupaia/utils';
import { configValidator } from './reportConfigValidator';

export const baseVisualisationValidator = yup.object().shape({
  presentation: yup.object().required(),
  data: yup.object().required(),
});

export const baseVisualisationDataValidator = yup.object().shape({
  fetch: yup.object().required(),
});

export const draftReportValidator = yup.object().shape({
  code: yup.string().required('Requires "code" for the visualisation'),
  config: configValidator,
});

export const legacyReportValidator = yup.object().shape({
  code: yup.string().required('Requires "code" for the visualisation'),
  dataBuilder: yup.string().required(),
  config: yup.object().required(),
  dataServices: yup.array().of(yup.object().shape({ isDataRegional: yup.boolean() })),
});