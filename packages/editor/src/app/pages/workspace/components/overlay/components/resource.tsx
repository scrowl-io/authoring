import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { Button } from '@owlui/lib';
import { AnimatePresence } from 'framer-motion';
import '../_overlay.scss';
import { Backdrop, Drawer, AssetBrowser } from '.';
import { Settings } from '../../../../../models';

const ResourceFormElement = (
  { isOpen, onClose, onSubmit, resource, ...props },
  ref
) => {
  const animationSettings = Settings.useAnimation();
  const isAnimated = !animationSettings.reducedAnimations;
  const isNew = resource === undefined || resource.id === -1;
  const title = isNew ? 'Add New' : 'Edit';
  const [resourceTitle, setResourceTitle] = useState(
    isNew ? '' : resource.title
  );
  const [resourceDescription, setResourceDescription] = useState(
    isNew ? '' : resource.description
  );
  const [isOpenAssetBrowser, setIsOpenAssetBrowser] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (ev: React.MouseEvent<Element, MouseEvent>) => {
    ev.preventDefault();

    onSubmit({
      title: resourceTitle,
      description: resourceDescription,
      id: isNew ? -1 : resource.id,
    });
  };

  const handleAssetBrowse = () => {
    setIsOpenAssetBrowser(true);
  };

  const handleAssetClose = () => {
    setIsOpenAssetBrowser(false);
    console.log('asset browse closed');
  };

  const handleAssetSelected = (data) => {
    setIsOpenAssetBrowser(false);
    console.log('asset browse selected');
  };

  useEffect(() => {
    if (resourceTitle !== resource.title) {
      setResourceTitle(resource.title);
      setResourceDescription(resource.description);
    }
  }, [resource, isOpen]);

  return (
    <div ref={ref}>
      <Drawer isAnimated={isAnimated} isOpen={isOpen}>
        <div className="owlui-offcanvas-header">
          <h4 className="owlui-offcanvas-title mb-0">{title} Resource</h4>
          <button type="button" className="btn-close" onClick={handleClose} />
        </div>

        <div className="owlui-offcanvas-body content-form">
          <form className="owlui-offcanvas-form">
            <div className="owlui-input-group mb-2">
              <input
                type="text"
                readOnly={true}
                className="owlui-form-control owlui-read-only"
                placeholder="File attachment"
                aria-label="File attachment"
                value={resourceTitle}
              />
              <div className="owlui-input-group-append">
                <Button variant="outline-primary" onClick={handleAssetBrowse}>
                  Browse
                </Button>
              </div>
            </div>

            <div className="mb-2 owlui-offcanvas-form__textarea">
              <label htmlFor="resource-description" className="form-label">
                Description
              </label>
              <textarea
                id="resource-description"
                className="owlui-form-control form-control-lg"
                placeholder="Describe the resource"
                style={{ resize: 'none' }}
                value={resourceDescription}
                onChange={(e) => {
                  setResourceDescription(e.target.value);
                }}
              />
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
                Save
              </button>
            </footer>
          </form>
        </div>
      </Drawer>
      {isOpen ? (
        <Backdrop
          className="glossary-overlay-backdrop"
          isAnimated={isAnimated}
          onClick={onClose}
          {...props}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export const ResourceForm = forwardRef(ResourceFormElement);

export const ResourceOverlay = (props) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const appNode = document.getElementById('app');

    if (appNode && overlayRef.current) {
      appNode.appendChild(overlayRef.current);
    }
  }, [overlayRef]);

  return (
    <AnimatePresence>
      <ResourceForm ref={overlayRef} {...props} />
    </AnimatePresence>
  );
};

export default {
  ResourceOverlay,
  ResourceForm,
};
