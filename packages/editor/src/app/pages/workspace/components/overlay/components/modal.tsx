import React, { useEffect, useRef, forwardRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Backdrop } from '.';
import { Error } from '../../../../../components';

const ModalElement = (
  { className, isOpen, onClose, title, children, ...props },
  ref
) => {
  const modalSize = props.modalSize ? props.modalSize : 'md';

  const handlePreventBubbling = (ev: React.MouseEvent) => {
    ev.bubbles = false;
    ev.stopPropagation();
    ev.preventDefault();
  };

  return (
    <div className={className} ref={ref}>
      <Error>
        <AnimatePresence>
          {isOpen && (
            <Backdrop className="modal-backdrop" onClick={onClose}>
              <div
                className="owlui-modal fade show support-high-contrast"
                onClick={handlePreventBubbling}
                style={{ display: 'block' }}
              >
                <div
                  className={`owlui-modal-dialog owlui-modal-dialog-centered ${modalSize}`}
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
              </div>
            </Backdrop>
          )}
        </AnimatePresence>
      </Error>
    </div>
  );
};

export const Modal = forwardRef(ModalElement);

export const ModalOverlay = ({ isOpen, ...props }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const appNode = document.getElementById('app');

    if (appNode && overlayRef.current) {
      appNode.appendChild(overlayRef.current);
    }
  }, [overlayRef, isOpen]);

  return <Modal ref={overlayRef} isOpen={isOpen} {...props} />;
};

export default {
  Modal,
  ModalOverlay,
};
