/*
 * Tupaia
 *  Copyright (c) 2017 - 2021 Beyond Essential Systems Pty Ltd
 */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Button, Dialog, DialogFooter, DialogHeader } from '@tupaia/ui-components';
import { DashboardMetadataForm } from '../Dashboard';
import { MapOverlayMetadataForm } from '../MapOverlay';
import { DASHBOARD_ITEM_OR_MAP_OVERLAY_PARAM } from '../../constants';

export const Body = styled.div`
  padding: 30px 20px;
  background-color: #f9f9f9;
`;

export const EditModal = () => {
  const { dashboardItemOrMapOverlay } = useParams();

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  let MetadataForm = null;
  if (dashboardItemOrMapOverlay === DASHBOARD_ITEM_OR_MAP_OVERLAY_PARAM.DASHBOARD_ITEM) {
    MetadataForm = DashboardMetadataForm;
  } else if (dashboardItemOrMapOverlay === DASHBOARD_ITEM_OR_MAP_OVERLAY_PARAM.MAP_OVERLAY) {
    MetadataForm = MapOverlayMetadataForm;
  } else {
    throw new Error(`Unknown viz type ${dashboardItemOrMapOverlay}`);
  }

  return (
    <>
      <Dialog onClose={handleClose} open={isOpen}>
        <MetadataForm
          onSubmit={handleClose}
          Header={() => <DialogHeader onClose={handleClose} title="Edit Details" />}
          Body={Body}
          Footer={() => (
            <DialogFooter>
              <Button onClick={handleClose} variant="outlined">
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          )}
        />
      </Dialog>
      <Button onClick={handleOpen} variant="outlined">
        Edit
      </Button>
    </>
  );
};
