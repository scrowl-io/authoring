import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { Button } from '@owlui/lib';
import { AnimatePresence } from 'framer-motion';
import '../_overlay.scss';
import { ResourceItem } from '../../pane-details';
import { Backdrop, Drawer, AssetBrowser } from '.';
import { Settings } from '../../../../../models';
import { menu } from '../../../../../services';

export interface ResourceFormProps
  extends Omit<React.AllHTMLAttributes<HTMLDivElement>, 'onSubmit'> {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (resource: ResourceItem) => void;
  resourceItem: ResourceItem;
}

const ResourceFormElement = (
  {
    className,
    isOpen,
    onClose,
    onSubmit,
    resourceItem,
    ...props
  }: ResourceFormProps,
  ref
) => {
  const animationSettings = Settings.useAnimation();
  const isAnimated = !animationSettings.reducedAnimations;
  const modalTitle = resourceItem.isNew ? 'Add New' : 'Edit';
  const [isOpenAssetBrowser, setIsOpenAssetBrowser] = useState(false);
  const [resource, setResource] = useState<ResourceItem>(resourceItem);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (ev: React.MouseEvent<Element, MouseEvent>) => {
    ev.preventDefault();
    onSubmit(resource);
  };

  const handleAssetBrowse = () => {
    setIsOpenAssetBrowser(true);
  };

  const handleAssetClose = () => {
    setIsOpenAssetBrowser(false);
  };

  const handleAssetSelected = (asset) => {
    setIsOpenAssetBrowser(false);

    if (resource.filename === resource.title) {
      setResource({
        ...resource,
        ...asset,
      });
    } else {
      setResource({
        ...resource,
        ...asset,
        title: resource.title,
      });
    }
  };

  const handleChangeResourceTitle = (
    ev: React.ChangeEvent<HTMLInputElement>
  ) => {
    setResource({
      ...resource,
      title: ev.currentTarget.value,
    });
  };

  const handleChangeResourceDescription = (
    ev: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setResource({
      ...resource,
      description: ev.currentTarget.value,
    });
  };

  useEffect(() => {
    if (isOpen) {
      menu.API.disableProjectActions();
    } else {
      menu.API.enableProjectActions();
    }
  }, [isOpen]);

  useEffect(() => {
    setResource(resourceItem);
  }, [resourceItem, isOpen]);

  return (
    <div ref={ref}>
      <AnimatePresence>
        {isOpen && (
          <div className={className}>
            <Backdrop
              className="resource-form-overlay-backdrop"
              onClick={handleClose}
            />
            <Drawer
              isAnimated={isAnimated}
              isOpen={isOpen}
              style={{ zIndex: isOpenAssetBrowser ? 1040 : 1045 }}
            >
              <div className="owlui-offcanvas-header">
                <h4 className="owlui-offcanvas-title mb-0">
                  {modalTitle} Resource
                </h4>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                />
              </div>

              <div className="owlui-offcanvas-body content-form">
                <form className="owlui-offcanvas-form owlui-offcanvas-form--resource">
                  <div className="owlui-input-group mb-2">
                    <input
                      type="text"
                      readOnly={true}
                      className="owlui-form-control owlui-read-only"
                      placeholder="File attachment"
                      aria-label="File attachment"
                      value={resource.filename}
                    />
                    <div className="owlui-input-group-append">
                      <Button
                        variant="outline-primary"
                        onClick={handleAssetBrowse}
                      >
                        Browse
                      </Button>
                    </div>
                  </div>

                  <div className="mb-2">
                    <label htmlFor="resource-title" className="form-label">
                      Title
                    </label>
                    <input
                      id="resouce-title"
                      type="text"
                      className="owlui-form-control"
                      placeholder="Title"
                      aria-label="Title"
                      value={resource.title}
                      onChange={handleChangeResourceTitle}
                    />
                  </div>

                  <div className="mb-2 owlui-offcanvas-form__textarea">
                    <label
                      htmlFor="resource-description"
                      className="form-label"
                    >
                      Description
                    </label>
                    <textarea
                      id="resource-description"
                      className="owlui-form-control form-control-lg"
                      placeholder="Describe the resource"
                      style={{ resize: 'none' }}
                      value={resource.description}
                      onChange={handleChangeResourceDescription}
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
            <AssetBrowser
              className="resource-asset-browser"
              isOpen={isOpenAssetBrowser}
              onClose={handleAssetClose}
              onSelected={handleAssetSelected}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ResourceForm = forwardRef(ResourceFormElement);

export const ResourceOverlay = ({ isOpen, ...props }: ResourceFormProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const appNode = document.getElementById('app');

    if (appNode && overlayRef.current) {
      appNode.appendChild(overlayRef.current);
    }
  }, [overlayRef, isOpen]);

  return <ResourceForm ref={overlayRef} isOpen={isOpen} {...props} />;
};

export default {
  ResourceOverlay,
  ResourceForm,
};
