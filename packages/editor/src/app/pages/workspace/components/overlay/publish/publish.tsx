import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import '../_overlay.scss';
import { Backdrop, Drawer } from '../../../../../components';
import { Projects, Settings } from '../../../../../models';
import { hasProp } from '../../../../../utils';
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
  const publishData = Projects.useScorm();
  const initialErrorState = {
    name: '',
  };
  const [publishErrors, setPublishErrors] = useState({});

  const handleClose = () => {
    onClose();
  };

  const validateForm = (data) => {
    let isValid = true;
    const update = {};
    const errors = {
      name: '',
    };

    setPublishErrors(errors);
    return [isValid, update];
  };

  const handleChange = (data) => {
    validateForm(data);
    Projects.setScorm(data);
  };

  const handleSubmit = (ev: React.SyntheticEvent) => {
    ev.preventDefault();

    const [isValid, update] = validateForm(publishData);

    Projects.setScorm(update);

    if (!isValid) {
      return;
    }

    onSubmit();
  };

  useEffect(() => {
    setPublishErrors(initialErrorState);
  }, [isOpen]);

  return (
    <div ref={ref}>
      <AnimatePresence>
        {isOpen && (
          <div className={className}>
            <Backdrop
              className="glossary-form-overlay-backdrop"
              onClick={handleClose}
            />
            <Drawer isAnimated={isAnimated} isOpen={isOpen} slideFrom="right">
              <div className="owlui-offcanvas-header">
                <h4 className="owlui-offcanvas-title mb-0">Publish Course</h4>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                />
              </div>

              <div className="owlui-offcanvas-body content-form">
                <form
                  className="owlui-offcanvas-form"
                  onSubmit={handleSubmit}
                  name="publishCourse"
                >
                  <div className="accordion">
                    <CourseSettings
                      data={publishData}
                      onChange={handleChange}
                      errors={publishErrors}
                    />
                    <Reporting data={publishData} onChange={handleChange} />
                    <ExportOptions data={publishData} onChange={handleChange} />
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
                    <button type="submit" className="btn btn-success">
                      Publish
                    </button>
                  </footer>
                </form>
              </div>
            </Drawer>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const PublishForm = forwardRef(PublishFormElement);

export const PublishOverlay = ({ isOpen, ...props }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const appNode = document.getElementById('app');

    if (appNode && overlayRef.current) {
      appNode.appendChild(overlayRef.current);
    }

    return () => {
      if (containerRef.current && overlayRef.current) {
        containerRef.current.appendChild(overlayRef.current);
      }
    };
  }, [overlayRef, isOpen]);

  return (
    <div ref={containerRef}>
      <PublishForm ref={overlayRef} isOpen={isOpen} {...props} />
    </div>
  );
};

export default {
  PublishOverlay,
  PublishForm,
};
