import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { ui } from '@scrowl/ui';
import { AnimatePresence } from 'framer-motion';
import './_overlay.scss';
import { ResourceItem } from '../pane-details';
import { AssetBrowser } from './asset-browser';
import { Backdrop, Drawer } from '../../../../components';
import { Settings } from '../../../../models';
import { menu } from '../../../../services';
import { hasProp, Elem } from '../../../../utils';

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
  const inputRefTitle = useRef<HTMLInputElement>(null);
  let timerFocusTitle = useRef<ReturnType<typeof setTimeout>>();
  const initialFormState = {
    filename: false,
    title: false,
    description: false,
  };
  const [isDirty, setIsDirty] = useState(initialFormState);
  const [resource, setResource] = useState<ResourceItem>(resourceItem);
  const [formRollback, setFormRollback] = useState(resource);
  const initialErrorState = {
    filename: '',
    title: '',
  };
  const [formErrors, setFormErrors] = useState(initialErrorState);

  const handleClose = () => {
    onClose();
  };

  const validateForm = (data, forceCheck = false) => {
    let isValid = true;
    const update = {};
    const errors = {
      title: '',
      filename: '',
    };

    if ((isDirty.title || forceCheck) && hasProp(data, 'title')) {
      let { title } = data;

      if (title.length) {
        title = title.trim();
      }

      if (!title.length) {
        isValid = false;
        errors.title = 'Cannot be empty';
      }

      update['title'] = title;
    }

    if ((isDirty.filename || forceCheck) && hasProp(data, 'filename')) {
      let { filename } = data;

      if (!filename.length) {
        isValid = false;
        errors.filename = 'Attachment must be selected';
      }

      update['filename'] = filename;
    }

    setFormErrors(errors);
    return [isValid, update];
  };

  const handleFormUpdate = (ev) => {
    const [isValid, validationUpdate] = validateForm(resource);

    setFormRollback({
      ...resource,
      ...validationUpdate,
    });
  };

  const handleSubmit = (ev: React.FormEvent) => {
    Elem.stopEvent(ev);

    const [isValid, validationUpdate] = validateForm(resource, true);
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

    setIsDirty({
      ...isDirty,
      filename: true,
    });
    setResource(update);
    // validateForm(update);
  };

  const handleChangeResourceTitle = (
    ev: React.ChangeEvent<HTMLInputElement>
  ) => {
    const title = ev.currentTarget.value;
    const update = {
      ...resource,
      title,
    };

    setIsDirty({
      ...isDirty,
      title: true,
    });
    setResource(update);
    // validateForm(update);
  };

  const handleInputResourceTitle = (
    ev: React.KeyboardEvent<HTMLInputElement>
  ) => {
    switch (ev.key) {
      case 'Escape':
        const update = {
          ...resource,
          title: formRollback.title,
        };

        Elem.stopEvent(ev);
        setResource(update);
        ev.currentTarget.blur();
        break;
    }
  };

  const handleChangeResourceDescription = (
    ev: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setIsDirty({
      ...isDirty,
      description: true,
    });
    setResource({
      ...resource,
      description: ev.currentTarget.value,
    });
  };

  const handleInputResourceDescription = (
    ev: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    switch (ev.key) {
      case 'Enter':
        if (ev.ctrlKey || ev.metaKey) {
          handleSubmit(ev);
        }
        break;
      case 'Escape':
        const update = {
          ...resource,
          description: formRollback.description,
        };

        Elem.stopEvent(ev);
        setResource(update);
        ev.currentTarget.blur();
        break;
    }
  };

  useEffect(() => {
    if (
      resourceItem &&
      (resourceItem.filename !== resource.filename ||
        resourceItem.title !== resource.title ||
        resourceItem.description !== resource.description)
    ) {
      setResource(resourceItem);
      setFormRollback(
        resourceItem.isNew
          ? {
              ...resourceItem,
              filename: '',
              title: '',
              description: '',
            }
          : resourceItem
      );
      setIsDirty(initialFormState);
    }

    const setFocusOnTitle = () => {
      if (timerFocusTitle.current) {
        clearTimeout(timerFocusTitle.current);
      }

      timerFocusTitle.current = setTimeout(() => {
        if (inputRefTitle.current) {
          inputRefTitle.current.focus();
        }
      }, 250);
    };

    if (isOpen) {
      menu.API.disableProjectActions();
      setFocusOnTitle();
    } else {
      menu.API.enableProjectActions();
    }

    return () => {
      if (timerFocusTitle.current) {
        clearTimeout(timerFocusTitle.current);
      }
    };
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
              onClose={onClose}
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
                <form
                  className="owlui-offcanvas-form owlui-offcanvas-form--resource"
                  onSubmit={handleSubmit}
                >
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
                        disabled={true}
                        className={`owlui-form-control owlui-read-only${
                          formErrors.filename ? ' is-invalid' : ''
                        }`}
                        placeholder="File Attachment"
                        aria-label="File Attachment"
                        value={resource.filename}
                      />
                      <div className="owlui-input-group-append">
                        <ui.Button
                          variant="outline-primary"
                          onClick={handleAssetBrowse}
                        >
                          Browse
                        </ui.Button>
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
                      ref={inputRefTitle}
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
                      onKeyDown={handleInputResourceTitle}
                      // onBlur={handleFormUpdate}
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
                      onKeyDown={handleInputResourceDescription}
                      // onBlur={handleFormUpdate}
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
                    <button type="submit" className="btn btn-success">
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
      <ResourceForm ref={overlayRef} isOpen={isOpen} {...props} />
    </div>
  );
};

export default {
  ResourceOverlay,
  ResourceForm,
};
