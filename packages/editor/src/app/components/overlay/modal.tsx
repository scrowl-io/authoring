import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import * as css from './_overlay.scss';
import { ModalProps } from './overlay.types';
import { Backdrop } from './backdrop';
import { Error } from '..';
import { menu } from '../../services';

export const Modal = ({
  className,
  isOpen,
  onClose,
  title,
  children,
  ...props
}: ModalProps) => {
  let classes = css.overlayContainer;
  const modalSize = props.modalSize ? props.modalSize : 'md';
  const animation = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  if (className) {
    classes += ` ${className}`;
  }

  useEffect(() => {
    if (isOpen) {
      menu.API.disableProjectActions();
    } else {
      menu.API.enableProjectActions();
    }
  }, [isOpen]);

  return (
    <div>
      <AnimatePresence>
        {isOpen && (
          <div className={classes}>
            <Backdrop onClick={onClose}></Backdrop>
            <motion.div
              className="overlay-content support-high-contrast"
              style={{ display: 'block' }}
              variants={animation}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div
                className={`owlui-modal-dialog owlui-modal-dialog-centered modal-${modalSize}`}
              >
                <div className="owlui-modal-content">
                  {title && (
                    <div className="owlui-offcanvas-header">
                      <h5 className="owlui-offcanvas-title mb-0">
                        {typeof title === 'string' ? title : ''}
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={onClose}
                      />
                    </div>
                  )}
                  <div className="owlui-offcanvas-body">
                    <Error>
                      <form className="owlui-offcanvas-form">{children}</form>
                    </Error>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default {
  Modal,
};
