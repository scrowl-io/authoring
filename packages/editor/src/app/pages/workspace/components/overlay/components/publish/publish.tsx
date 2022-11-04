import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import '../../_overlay.scss';
import { Backdrop, Drawer } from '../';
import { Settings } from '../../../../../../models';

const PublishFormElement = (
  { className, isOpen, onClose, onSubmit, term, ...props },
  ref
) => {
  const animationSettings = Settings.useAnimation();
  const isAnimated = !animationSettings.reducedAnimations;

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (ev: React.MouseEvent<Element, MouseEvent>) => {
    ev.preventDefault();
    onSubmit();
  };

  const handlePreventBubbling = (ev: React.MouseEvent) => {
    ev.bubbles = false;
    ev.stopPropagation();
    ev.preventDefault();
  };

  return (
    <div className={className} ref={ref}>
      <AnimatePresence>
        {isOpen && (
          <Backdrop
            className="glossary-form-overlay-backdrop"
            onClick={handleClose}
          >
            <Drawer
              isAnimated={isAnimated}
              isOpen={isOpen}
              onClick={handlePreventBubbling}
              slideFrom="right"
            >
              <div className="owlui-offcanvas-header">
                <h4 className="owlui-offcanvas-title mb-0">Publish Course</h4>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                />
              </div>

              <div className="owlui-offcanvas-body content-form">
                <form className="owlui-offcanvas-form">
                  <footer className="d-flex justify-content-end my-3">
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-success"
                      onClick={handleSubmit}
                    >
                      Publish
                    </button>
                  </footer>
                </form>
              </div>
            </Drawer>
          </Backdrop>
        )}
      </AnimatePresence>
    </div>
  );
};

export const PublishForm = forwardRef(PublishFormElement);

export const PublishOverlay = ({ isOpen, ...props }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const appNode = document.getElementById('app');

    if (appNode && overlayRef.current) {
      appNode.appendChild(overlayRef.current);
    }
  }, [overlayRef, isOpen]);

  return <PublishForm ref={overlayRef} isOpen={isOpen} {...props} />;
};

export default {
  PublishOverlay,
  PublishForm,
};
