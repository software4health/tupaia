/*
 * Tupaia
 *  Copyright (c) 2017 - 2023 Beyond Essential Systems Pty Ltd
 */
import { useParams } from 'react-router-dom';
import { SurveyScreenComponentConfig } from '@tupaia/types';
import { useSurveyForm } from '../../Survey';

export const useEntityBaseFilters = (config: SurveyScreenComponentConfig) => {
  const { getAnswerByQuestionId } = useSurveyForm();
  const { countryCode } = useParams();

  const filters = { countryCode } as Record<string, string | string[]>;

  const filter = config?.entity?.filter;
  if (!filter) {
    return filters;
  }

  const { parentId, grandparentId, type } = filter;

  if (type) {
    filters.type = type;
  }

  if (parentId && parentId.questionId) {
    filters['parentId'] = getAnswerByQuestionId(parentId.questionId);
  }
  if (grandparentId && grandparentId.questionId) {
    filters['grandparentId'] = getAnswerByQuestionId(grandparentId.questionId);
  }
  return filters;
};

/*
 * Returns a function that filters entities based on configured attribute values and questions
 */
export const useAttributeFilter = (questionConfig: SurveyScreenComponentConfig) => {
  const { getAnswerByQuestionId } = useSurveyForm();
  const attributes = questionConfig.entity?.filter?.attributes;
  if (!attributes) {
    return null;
  }

  const filterValues = Object.entries(attributes).reduce((acc, [key, config]) => {
    // Get the answer from the configured question
    const filterValue = getAnswerByQuestionId(config.questionId);
    return filterValue ? { ...acc, [key]: filterValue } : acc;
  }, {});

  // No answer was selected for the question to filter, return all
  if (Object.keys(filterValues).length === 0) {
    return null;
  }

  return entity =>
    Object.entries(filterValues).every(([key, value]) => {
      const { attributes } = entity;
      return attributes[key] === value;
    });
};
