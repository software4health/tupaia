/*
 * Tupaia
 * Copyright (c) 2017 - 2020 Beyond Essential Systems Pty Ltd
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MuiContainer from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { ImportModal } from '../importExport';
import { CreateButton as SingleCreateButton, BulkCreateButton } from '../editor';

const HeaderButtonContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  column-gap: 5px;
`;

const HeaderMain = styled.header`
  background-color: ${props => props.theme.palette.primary.main};
  color: white;
`;

const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 190px;
  padding-bottom: 1.25rem;
`;

export const Header = ({
  title,
  importConfig,
  createConfig,
  exportConfig,
  ExportModalComponent,
  LinksComponent,
}) => {
  const CreateButton =
    createConfig && createConfig.bulkCreate ? BulkCreateButton : SingleCreateButton;

  return (
    <HeaderMain>
      <MuiContainer maxWidth="xl">
        <HeaderInner>
          <Typography variant="h1">{title}</Typography>
          <HeaderButtonContainer>
            {importConfig && <ImportModal {...importConfig} />}
            {createConfig && <CreateButton {...createConfig} />}
            {ExportModalComponent && <ExportModalComponent {...exportConfig} />}
            {LinksComponent && <LinksComponent />}
          </HeaderButtonContainer>
        </HeaderInner>
      </MuiContainer>
    </HeaderMain>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  importConfig: PropTypes.object,
  createConfig: PropTypes.object,
  exportConfig: PropTypes.object,
  ExportModalComponent: PropTypes.elementType,
  LinksComponent: PropTypes.elementType,
};

Header.defaultProps = {
  importConfig: null,
  createConfig: null,
  exportConfig: {},
  ExportModalComponent: null,
  LinksComponent: null,
};
