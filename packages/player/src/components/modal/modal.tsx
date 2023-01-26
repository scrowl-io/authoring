// @ts-ignore
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Modal, ThemeProvider } from 'react-bootstrap';
import { ui } from '@scrowl/ui';
// import { translateError } from '../../services/error-message';

import * as _css from './_modal.scss';
import utils, { CssMapProps } from '../../utils';

// @ts-ignore
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
    }
    if (!showModal) {
      document.body.style.overflow = 'unset';
    }
  }, [showModal]);

  useEffect(() => {
    const handleErrorCatch = (ev) => {
      console.log('inside app root error handler');
      console.log(ev);
      const errorEvent = ev.detail;
      setModalErrorId('500');
      setModalError(errorEvent.message);
      setModalErrorStack(errorEvent.stack.substring(0, 350));

      setShowModal(true);
    };

    document.addEventListener('playerError', handleErrorCatch);
  }, [showModal]);

  useEffect(() => {
    const handleErrorCatchScorm = (ev) => {
      console.log('inside scorm error handler');
      console.log(ev);
      const errorEvent = ev.detail;

      setModalErrorId(errorEvent.id);
      setModalError(errorEvent.message);
      setModalErrorStack(errorEvent.stack);

      setShowModal(true);
    };

    document.addEventListener('scormError', handleErrorCatchScorm);
  }, [showModal]);

  useLayoutEffect(() => {
    const handleOnline = (errorObject) => {
      setModalErrorId(errorObject.detail.id);
      setModalError(errorObject.detail.message);
      setModalErrorStack(errorObject.detail.stack);

      setShowModal(true);
    };
    document.addEventListener('connectionError', handleOnline);
  }, []);

  useLayoutEffect(() => {
    const handleAPIError = (errorObject) => {
      setModalErrorId(errorObject.detail.id);
      setModalError(errorObject.detail.message);
      setModalErrorStack(errorObject.detail.stack);

      setShowModal(true);
    };
    document.addEventListener('APIError', handleAPIError);
  }, []);

  return (
    showModal && (
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
    )
  );
};

export default {
  ErrorModal,
};
