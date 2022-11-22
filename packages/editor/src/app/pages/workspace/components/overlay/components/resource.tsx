import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { Button } from '@owlui/lib';
import { AnimatePresence } from 'framer-motion';
import '../_overlay.scss';
import { ResourceItem } from '../../pane-details';
import { Backdrop, Drawer, AssetBrowser } from '.';
import { Settings } from '../../../../../models';
import { menu } from '../../../../../services';
import { hasProp } from '../../../../../utils';

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
  const [isDirty, setIsDirty] = useState(false);
  const [resource, setResource] = useState<ResourceItem>(resourceItem);
  const initialErrorState = {
    filename: '',
    title: '',
  };
  const [formErrors, setFormErrors] = useState(initialErrorState);

  const handleClose = () => {
    onClose();
  };

  const validateForm = (data) => {
    let isValid = true;
    const update = {};
    const errors = {
      title: '',
      filename: '',
    };

    if (hasProp(data, 'title')) {
      let { title } = data;

      if (title.length) {
        title = title.trim();
      }

      if (!title.length) {
        isValid = false;
        errors.title = 'Cannot be empty';
      }

      update['title'] = title;
      setIsDirty(true);
    }

    if (hasProp(data, 'filename')) {
      let { filename } = data;

      if (!filename.length) {
        isValid = false;
        errors.filename = 'Attachment must be selected';
      }

      update['filename'] = filename;
      setIsDirty(true);
    }

    setFormErrors(errors);
    return [isValid, update];
  };

  const handleSubmit = (ev: React.MouseEvent<Element, MouseEvent>) => {
    ev.preventDefault();

    const [isValid, validationUpdate] = validateForm(resource);
    const update = {
      ...resource,
      ...validationUpdate,
    };

    setResource(update);

    if (!isValid) {
      return;
    }

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
    let update;

    if (resource.filename === resource.title) {
      update = {
        ...resource,
        ...asset,
      };
    } else {
      update = {
        ...resource,
        ...asset,
        title: resource.title,
      };
    }

    setResource(update);
    validateForm(update);
  };

  const handleChangeResourceTitle = (
    ev: React.ChangeEvent<HTMLInputElement>
  ) => {
    const title = ev.currentTarget.value;
    const update = {
      ...resource,
      title,
    };

    setResource(update);
    validateForm(update);
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
                  <div className="mb-2">
                    <div
                      className={`owlui-input-group${
                        formErrors.filename ? ' is-invalid' : ''
                      }`}
                    >
                      <input
                        type="text"
                        name="filename"
                        readOnly={true}
                        className={`owlui-form-control owlui-read-only${
                          formErrors.filename ? ' is-invalid' : ''
                        }`}
                        placeholder="File Attachment"
                        aria-label="File Attachment"
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
                    {formErrors.filename && (
                      <div className="invalid-feedback">
                        {formErrors.filename}
                      </div>
                    )}
                  </div>

                  <div className="mb-2">
                    <label htmlFor="resource-title" className="form-label">
                      Title
                    </label>
                    <input
                      id="resource-title"
                      type="text"
                      name="title"
                      className={`owlui-form-control${
                        formErrors.title ? ' is-invalid' : ''
                      }`}
                      placeholder="Title"
                      aria-label="Title"
                      value={resource.title}
                      onChange={handleChangeResourceTitle}
                    />
                    {formErrors.title && (
                      <div className="invalid-feedback">{formErrors.title}</div>
                    )}
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
                      name="description"
                      className="owlui-form-control form-control-lg"
                      placeholder="Describe the Resource"
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
