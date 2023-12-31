/**
 * Tupaia MediTrak
 * Copyright (c) 2018 Beyond Essential Systems Pty Ltd
 */

import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImportIcon from '@material-ui/icons/Publish';
import {
  Button,
  Dialog,
  DialogFooter,
  DialogHeader,
  FileUploadField,
  LightOutlinedButton,
  OutlinedButton,
} from '@tupaia/ui-components';
import { ModalContentProvider, InputField } from '../widgets';
import { useApi } from '../utilities/ApiProvider';
import { DATA_CHANGE_REQUEST, DATA_CHANGE_SUCCESS, DATA_CHANGE_ERROR } from '../table/constants';
import { checkVisibilityCriteriaAreMet, labelToId } from '../utilities';

const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  TIMEOUT: 'timeout',
  SUCCESS: 'success',
  ERROR: 'error',
};

const defaultFinishedMessage = () => <span>Your import has been successfully processed.</span>;

export const ImportModalComponent = React.memo(
  ({
    title,
    subtitle,
    queryParameters,
    actionConfig,
    changeRequest,
    changeSuccess,
    changeError,
    getFinishedMessage,
    confirmButtonText,
    cancelButtonText,
    uploadButtonText,
    noFileMessage,
  }) => {
    const api = useApi();
    const [status, setStatus] = useState(STATUS.IDLE);
    const [finishedMessage, setFinishedMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [values, setValues] = useState({});
    const [files, setFiles] = useState([]);
    const [fileName, setFileName] = useState(noFileMessage);

    const handleOpen = () => setIsOpen(true);

    const handleValueChange = (key, val) => {
      setValues(prevState => ({
        ...prevState,
        [key]: val,
      }));
    };

    const handleDismiss = () => {
      setStatus(STATUS.IDLE);
      setErrorMessage(null);
      setFinishedMessage(null);
      setFiles([]);
      setFileName(noFileMessage);
    };

    const handleClose = () => {
      setStatus(STATUS.IDLE);
      setErrorMessage(null);
      setFinishedMessage(null);
      setIsOpen(false);
      setValues({});
      setFiles([]);
      setFileName(noFileMessage);
    };

    const handleSubmit = async event => {
      event.preventDefault();
      setErrorMessage(null);
      setFinishedMessage(null);
      setStatus(STATUS.LOADING);
      changeRequest();

      const recordType = actionConfig.importEndpoint;
      const endpoint = `import/${recordType}`;

      try {
        const { body: response } = await api.upload(endpoint, recordType, files, {
          ...values,
          ...actionConfig.extraQueryParameters,
        });
        if (response.emailTimeoutHit) {
          setStatus(STATUS.TIMEOUT);
          setFinishedMessage(
            'Import is taking a while, and will continue in the background. You will be emailed when the import process completes.',
          );
        } else {
          setStatus(STATUS.SUCCESS);
          setFinishedMessage(getFinishedMessage(response));
        }
        changeSuccess();
      } catch (error) {
        setStatus(STATUS.ERROR);
        setFinishedMessage(null);
        setErrorMessage(error.message);
        changeError();
      }
    };

    // Print a more descriptive network timeout error
    // TODO: Remove this after https://github.com/beyondessential/tupaia-backlog/issues/1009 is fixed
    const fileErrorMessage =
      errorMessage === 'Network request timed out'
        ? 'Request timed out, but may have still succeeded. Please wait 2 minutes and check to see if the data has changed'
        : errorMessage;

    const renderButtons = useCallback(() => {
      switch (status) {
        case STATUS.TIMEOUT:
        case STATUS.SUCCESS:
          return <Button onClick={handleClose}>Done</Button>;
        case STATUS.ERROR:
          return (
            <>
              <OutlinedButton onClick={handleDismiss}>Dismiss</OutlinedButton>
              <Button disabled>{confirmButtonText}</Button>
            </>
          );
        default:
          return (
            <>
              <OutlinedButton id="form-button-cancel" onClick={handleClose}>
                {cancelButtonText}
              </OutlinedButton>
              <Button
                id="form-button-import"
                type="submit"
                disabled={files.length === 0}
                isLoading={status === STATUS.LOADING}
                onClick={handleSubmit}
              >
                {confirmButtonText}
              </Button>
            </>
          );
      }
    }, [status, files, handleDismiss, handleClose, handleSubmit]);

    return (
      <>
        <Dialog onClose={handleClose} open={isOpen} disableBackdropClick>
          <form>
            <DialogHeader
              onClose={handleClose}
              title={fileErrorMessage ? 'Error' : title}
              color={fileErrorMessage ? 'error' : 'textPrimary'}
            />
            <ModalContentProvider
              errorMessage={fileErrorMessage}
              isLoading={status === STATUS.LOADING}
            >
              {finishedMessage ? (
                <>{finishedMessage}</>
              ) : (
                <>
                  <p>{subtitle}</p>
                  {queryParameters
                    .filter(({ visibilityCriteria }) =>
                      checkVisibilityCriteriaAreMet(visibilityCriteria, values),
                    )
                    .map(queryParameter => {
                      const { parameterKey, ...restOfProps } = queryParameter;
                      return (
                        <InputField
                          key={parameterKey}
                          inputKey={parameterKey}
                          value={values[parameterKey]}
                          {...restOfProps}
                          onChange={handleValueChange}
                          id={`field-${labelToId(parameterKey)}`}
                        />
                      );
                    })}
                  <FileUploadField
                    onChange={({ target }, newName) => {
                      setFileName(newName);
                      setFiles(Array.from(target.files));
                    }}
                    name="file-upload"
                    fileName={fileName}
                    multiple={actionConfig.multiple}
                    textOnButton={uploadButtonText}
                  />
                </>
              )}
            </ModalContentProvider>
            <DialogFooter>{renderButtons()}</DialogFooter>
          </form>
        </Dialog>
        <LightOutlinedButton
          id="page-import-button"
          startIcon={<ImportIcon />}
          onClick={handleOpen}
        >
          {confirmButtonText}
        </LightOutlinedButton>
      </>
    );
  },
);

ImportModalComponent.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  translate: PropTypes.func,
  queryParameters: PropTypes.array,
  actionConfig: PropTypes.object,
  changeRequest: PropTypes.func.isRequired,
  changeSuccess: PropTypes.func.isRequired,
  changeError: PropTypes.func.isRequired,
  getFinishedMessage: PropTypes.func,
  confirmButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  uploadButtonText: PropTypes.string,
  noFileMessage: PropTypes.string,
};

ImportModalComponent.defaultProps = {
  translate: text => text,
  title: null,
  queryParameters: [],
  actionConfig: {},
  subtitle: '',
  getFinishedMessage: defaultFinishedMessage, // response => react element
  confirmButtonText: 'Import',
  cancelButtonText: 'Cancel',
  uploadButtonText: 'Choose file',
  noFileMessage: 'No file chosen',
};

const mapDispatchToProps = dispatch => ({
  changeRequest: () => dispatch({ type: DATA_CHANGE_REQUEST }),
  changeSuccess: () => dispatch({ type: DATA_CHANGE_SUCCESS }),
  changeError: () => dispatch({ type: DATA_CHANGE_ERROR }),
});

export const ImportModal = connect(null, mapDispatchToProps)(ImportModalComponent);
