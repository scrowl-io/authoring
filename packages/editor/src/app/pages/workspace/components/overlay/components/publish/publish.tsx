import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import '../../_overlay.scss';
import { Backdrop, Drawer } from '../';
import { Settings } from '../../../../../../models';
import { CourseSettings } from './course-settings';
import { Reporting } from './reporting';
import { ExportOptions } from './export-options';
import { Overview } from './overview';

const PublishFormElement = (
  { className, isOpen, onClose, onSubmit, term, ...props },
  ref
) => {
  const animationSettings = Settings.useAnimation();
  const isAnimated = !animationSettings.reducedAnimations;
  const initialState = {
    name: '',
    description: '',
    authors: '',
    organization: '',
    reportStatus: 'Passed/Incomplete',
    lmsIdentifier: '',
    outputFormat: 'scorm_2004',
    optomizeMedia: 'recommended',
  };
  const [publishData, setPublishData] = useState(initialState);

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

  const handleUpdatePublishData = (data) => {
    setPublishData({
      ...publishData,
      ...data,
    });
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
                  <div className="accordion">
                    <CourseSettings
                      data={publishData}
                      onChange={handleUpdatePublishData}
                    />
                    <Reporting
                      data={publishData}
                      onChange={handleUpdatePublishData}
                    />
                    <ExportOptions
                      data={publishData}
                      onChange={handleUpdatePublishData}
                    />
                    <Overview />
                  </div>
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
