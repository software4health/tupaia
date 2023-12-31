/*
 * Tupaia
 * Copyright (c) 2017 - 2020 Beyond Essential Systems Pty Ltd
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import MuiBox from '@material-ui/core/Box';
import { FileUploadField } from '../../src/components';

export default {
  title: 'Inputs/FileUploadField',
  component: FileUploadField,
};

const Container = styled(MuiBox)`
  max-width: 1200px;
  padding: 1rem;
`;

export const Simple = () => {
  const [fileName, setFileName] = useState('No File chosen');
  return (
    <Container>
      <FileUploadField
        onChange={(event, newName) => {
          setFileName(newName);
        }}
        name="file-upload"
        fileName={fileName}
        label="File Upload"
      />
    </Container>
  );
};

export const SimpleWithTooltip = () => {
  const [fileName, setFileName] = useState('No File chosen');
  return (
    <Container>
      <FileUploadField
        onChange={(event, newName) => {
          setFileName(newName);
        }}
        name="file-upload"
        fileName={fileName}
        label="File Upload"
        tooltip=".png and .jpg files only"
      />
    </Container>
  );
};

export const Multiple = () => {
  const [fileName, setFileName] = useState('No File chosen');
  return (
    <Container>
      <FileUploadField
        onChange={(event, newName) => {
          setFileName(newName);
        }}
        name="file-upload"
        fileName={fileName}
        multiple
      />
    </Container>
  );
};

export const WithLabel = () => {
  const [fileName, setFileName] = useState('No File chosen');
  return (
    <Container>
      <FileUploadField
        onChange={(event, newName) => {
          setFileName(newName);
        }}
        name="file-upload"
        fileName={fileName}
        label="Profile Image"
        helperText="Select an image to use as your profile pic"
      />
    </Container>
  );
};

export const WithMaxFileSize = () => {
  const [fileName, setFileName] = useState('No File chosen');
  return (
    <Container>
      <FileUploadField
        onChange={(event, newName) => {
          setFileName(newName);
        }}
        name="file-upload"
        fileName={fileName}
        label="File Upload"
        maxSizeInBytes={1024 * 10} /* 10 KB */
      />
    </Container>
  );
};