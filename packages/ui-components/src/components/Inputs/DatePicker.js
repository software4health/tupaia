/*
 * Tupaia
 * Copyright (c) 2017 - 2020 Beyond Essential Systems Pty Ltd
 */

import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import DateFnsUtils from '@date-io/date-fns';
import PropTypes from 'prop-types';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { KeyboardDatePicker as MuiDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { TextField } from './TextField';
import { DAY_MONTH_YEAR_DATE_FORMAT } from '../../constants';

const StyledDatePicker = styled(MuiDatePicker)`
  .MuiInputBase-input {
    padding-left: 0;
    color: ${props => props.theme.palette.text.tertiary};
  }

  .MuiButtonBase-root.MuiIconButton-root {
    top: -1px;
    color: ${props => props.theme.palette.text.tertiary};
    padding: 0.5rem;
  }
`;

export const DatePicker = props => {
  const [value, setValue] = useState(new Date());

  const handleChange = useCallback(
    date => {
      setValue(date);
    },
    [setValue],
  );

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <StyledDatePicker
        value={value}
        format={DAY_MONTH_YEAR_DATE_FORMAT}
        keyboardIcon={<CalendarTodayIcon />}
        InputAdornmentProps={{ position: 'start' }}
        onChange={handleChange}
        animateYearScrolling
        TextFieldComponent={TextField}
        {...props}
      />
    </MuiPickersUtilsProvider>
  );
};

DatePicker.propTypes = {
  label: PropTypes.string.isRequired,
};
