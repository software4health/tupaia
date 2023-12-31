import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { SmallAlert } from '@tupaia/ui-components';

import { EntityDetails, DashboardTitleContainer } from '../components';

const InfoAlert = styled(SmallAlert)`
  margin: auto;
`;

const Divider = styled.hr`
  border-top: 3px solid #d13333;
`;

export const NoReportPage = ({
  subDashboardName,
  isEntityDetailsRequired,
  PageContainer,
  ...configs
}) => {
  return (
    <PageContainer {...configs}>
      {isEntityDetailsRequired && <EntityDetails />}
      <DashboardTitleContainer>
        <Typography variant="h2">{subDashboardName}</Typography>
        <Divider />
      </DashboardTitleContainer>
      <InfoAlert severity="info" variant="standard">
        There are no reports available for this dashboard
      </InfoAlert>
    </PageContainer>
  );
};

NoReportPage.propTypes = {
  isEntityDetailsRequired: PropTypes.bool.isRequired,
  subDashboardName: PropTypes.string.isRequired,
  PageContainer: PropTypes.func.isRequired,
};
