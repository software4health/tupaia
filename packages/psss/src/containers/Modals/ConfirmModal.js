/*
 * Tupaia
 * Copyright (c) 2017 - 2021 Beyond Essential Systems Pty Ltd
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReportProblem from '@material-ui/icons/ReportProblem';
import Typography from '@material-ui/core/Typography';
import {
  Button,
  OutlinedButton,
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogContent,
  LoadingContainer,
  Alert,
} from '@tupaia/ui-components';

const DescriptionText = styled(Typography)`
  font-size: 1rem;
  margin-top: 1rem;
`;

const ConfirmIcon = styled(ReportProblem)`
  font-size: 2.5rem;
  margin-bottom: 0.3rem;
  color: ${props => props.theme.palette.primary.main};
`;

const PositionedAlert = styled(Alert)`
  margin-top: 1rem;
`;

export const ConfirmModal = ({
  isOpen,
  handleClose,
  isLoading,
  title,
  mainText,
  error,
  description,
  actionText,
  loadingText,
  handleAction,
}) => {
  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <DialogHeader onClose={handleClose} title={title} />
      <LoadingContainer isLoading={isLoading}>
        <DialogContent>
          <ConfirmIcon />
          <Typography variant="h6" gutterBottom>
            {mainText}
          </Typography>
          {description && <DescriptionText>{description}</DescriptionText>}
          {error && (
            <PositionedAlert severity="error" variant="standard">
              {error}
            </PositionedAlert>
          )}
        </DialogContent>
      </LoadingContainer>
      <DialogFooter>
        <OutlinedButton onClick={handleClose} disabled={isLoading}>
          Cancel
        </OutlinedButton>
        <Button isLoading={isLoading} loadingText={loadingText} onClick={handleAction}>
          {actionText}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  mainText: PropTypes.string.isRequired,
  description: PropTypes.string,
  error: PropTypes.string,
  actionText: PropTypes.string.isRequired,
  loadingText: PropTypes.string.isRequired,
  handleAction: PropTypes.func.isRequired,
};

ConfirmModal.defaultProps = {
  description: null,
  error: null,
};
