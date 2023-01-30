import React, { useEffect, useState } from 'react';
import { Modal, ThemeProvider } from 'react-bootstrap';
import { ui } from '@scrowl/ui';
// import { translateError } from '../../services/error-message';

import * as _css from './_modal.scss';
import utils, { CssMapProps } from '../../utils';

const css = utils.css.removeMapPrefix(_css);

export const ErrorModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalErrorId, setModalErrorId] = useState('');
  const [modalError, setModalError] = useState('');
  const [modalErrorStack, setModalErrorStack] = useState('');
  // const [modalError, setModalError] = useState({
  //   id: '',
  //   message: '',
  //   stack: '',
  // });

  const themePrefixes: CssMapProps = {};

  // below is not working: see _modal.scss for actual styling
  themePrefixes['modal-open'] = 'owlui-modal-open';
  themePrefixes['modal-modal-backdrop'] = 'owlui-modal-backdrop';
  themePrefixes['modal-fade'] = 'owlui-fade';
  themePrefixes['modal-dialog-centered'] = 'owlui-dialog-centered';

  themePrefixes['modal-dialog'] = 'owlui-modal-dialog';
  themePrefixes['modal-body'] = 'owlui-modal-body';
  themePrefixes['modal-header'] = 'owlui-modal-header';
  // themePrefixes['modal-footer'] = 'owlui-modal-footer';
  themePrefixes['modal-content'] = 'owlui-modal-content';
  themePrefixes['modal-title'] = 'owlui-modal-title';

  const toggleModal = () => {
    // should reset the error state when closing
    setModalErrorId('');
    setModalError('');
    setModalErrorStack('');

    setShowModal(!showModal);
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleCatchError = (ev) => {
      const errorEvent = ev.detail;
      setModalErrorId('500');
      setModalError(errorEvent.message);
      setModalErrorStack(errorEvent.stack.substring(0, 350));

      setShowModal(true);
    };

    const handleCatchScormError = (ev) => {
      const errorEvent = ev.detail;

      // SCORM 2004 gives error 403 when getValue tries to read a value that has not been set, while SCORM 1.2 does not consider this an error, so the error code returned by GetLastError() is 0. Do not display the modal for these errors
      if (
        errorEvent.id !== 0 &&
        errorEvent.id !== '0' &&
        errorEvent.id !== '403'
      ) {
        setModalErrorId(errorEvent.id);
        setModalError(errorEvent.message);
        setModalErrorStack(errorEvent.stack);

        setShowModal(true);
      }
    };

    document.addEventListener('scormError', handleCatchScormError);
    document.addEventListener('playerError', handleCatchError);
  }, [showModal]);

  useEffect(() => {
    const handleConnectionError = (errorObject) => {
      setModalErrorId(errorObject.detail.id);
      setModalError(errorObject.detail.message);
      setModalErrorStack(errorObject.detail.stack);

      setShowModal(true);
    };
    document.addEventListener('APIError', handleConnectionError);
    document.addEventListener('connectionError', handleConnectionError);
  }, []);

  if (showModal) {
    return (
      <ThemeProvider prefixes={themePrefixes}>
        {/* <Modal className={css.modalContainer}> */}
        <div className={css.darkBackground} onClick={toggleModal} />
        <div className={css.modalContainer}>
          <Modal.Dialog className={css.modalDialog}>
            <Modal.Header>
              <h1>Error</h1>
              <span className={css.closeButton} onClick={toggleModal}>
                <ui.Icon display="sharp" icon="close" />
              </span>
            </Modal.Header>
            <Modal.Body>
              <h5>Error: {modalError}</h5>
              <p>Error ID: {modalErrorId}</p>
              <p>Error Description: {modalErrorStack}</p>
            </Modal.Body>
            <Modal.Footer className={css.footer}>
              <ui.Button onClick={toggleModal}>Cancel</ui.Button>

              <ui.Button onClick={toggleModal}>Submit</ui.Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>

        {/* </Modal> */}
      </ThemeProvider>
    );
  } else {
    return null;
  }
};

export default {
  ErrorModal,
};
