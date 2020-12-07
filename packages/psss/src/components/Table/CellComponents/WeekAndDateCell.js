/*
 * Tupaia
 * Copyright (c) 2017 - 2020 Beyond Essential Systems Pty Ltd
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as COLORS from '../../../constants/colors';
import { getDisplayDatesByPeriod, getWeekNumberByPeriod } from '../../../utils';

const CountrySummaryTitle = styled.div`
  color: ${COLORS.TEXT_DARKGREY};
  font-weight: 400;
  font-size: 0.9375rem;
  padding-right: 0.625rem;
`;

export const WeekAndDateCell = ({ period }) => (
  <CountrySummaryTitle>
    <strong>W{getWeekNumberByPeriod(period)}</strong> {getDisplayDatesByPeriod(period)}
  </CountrySummaryTitle>
);

WeekAndDateCell.propTypes = {
  period: PropTypes.string.isRequired,
};
