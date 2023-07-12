/*
 * Tupaia
 * Copyright (c) 2017 - 2021 Beyond Essential Systems Pty Ltd
 */

/**
 *  See SurveysPage comments regarding RN-910
 */
export const convertNamesToIds = async (models, fields) => {
  const {
    countryNames,
    'permission_group.name': permissionGroupName,
    'survey_group.name': surveyGroupName,
  } = fields;

  const updatedFields = { ...fields };

  if (countryNames) {
    const countries = await models.country.find({ name: countryNames });
    if (countryNames.length !== countries.length) {
      throw new Error('One or more provided countries do not exist');
    }
    updatedFields.country_ids = countries.map(country => country.id);
  }
  if (permissionGroupName !== undefined) {
    if (permissionGroupName === null) {
      updatedFields.permission_group_id = null;
    } else {
      const permissionGroup = await models.permissionGroup.findOne({ name: permissionGroupName });
      if (!permissionGroup) {
        throw new Error('Permission Group not found');
      }
      updatedFields.permission_group_id = permissionGroup.id;
    }
  }
  if (surveyGroupName !== undefined) {
    if (surveyGroupName === null) {
      updatedFields.survey_group_id = null;
    } else {
      const surveyGroup = await models.surveyGroup.findOne({ name: surveyGroupName });
      if (!surveyGroup) {
        throw new Error('Survey Group not found');
      }
      updatedFields.survey_group_id = surveyGroup.id;
    }
  }

  return updatedFields;
};
