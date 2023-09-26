/*
 * Tupaia
 *  Copyright (c) 2017 - 2023 Beyond Essential Systems Pty Ltd
 */

import React from 'react';
import {
  FormControlLabel,
  FormControlLabelProps,
  TextField,
  TextFieldProps,
} from '@material-ui/core';
import styled from 'styled-components';

const Label = styled(FormControlLabel)`
  align-items: flex-start;
  margin: 0;
  .MuiFormControlLabel-label {
    font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
  }
  .MuiInput-root {
    font-size: 0.875rem;
  }
`;

interface TextInputProps
  extends Pick<FormControlLabelProps, 'label' | 'name' | 'onChange' | 'value'> {
  id?: string;
  ref?: React.Ref<HTMLInputElement>;
  textInputProps?: TextFieldProps;
}
export const TextInput = ({
  value,
  label,
  name,
  onChange,
  id,
  ref,
  textInputProps,
}: TextInputProps) => (
  <Label
    label={label}
    name={name}
    inputRef={ref}
    labelPlacement={'top'}
    onChange={onChange}
    value={value}
    control={<TextField id={id} {...textInputProps} fullWidth />}
  />
);
