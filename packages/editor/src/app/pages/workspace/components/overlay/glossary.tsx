import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import './_overlay.scss';
import { Backdrop, Drawer } from '../../../../components';
import { Settings } from '../../../../models';
import { menu } from '../../../../services';
import { hasProp } from '../../../../utils';

const GlossaryFormElement = (
  { className, isOpen, onClose, onSubmit, term, ...props },
  ref
) => {
  const animationSettings = Settings.useAnimation();
  const isAnimated = !animationSettings.reducedAnimations;
  const isNewTerm = term === undefined || term.id === -1;
  const title = isNewTerm ? 'Add' : 'Edit';
  const [isDirty, setIsDirty] = useState(false);
  const initialFormTerm = {
    word: '',
    definition: '',
  };
  const [formTerm, setFormTerm] = useState(isNewTerm ? initialFormTerm : term);
  const initialErrorState = {
    word: '',
    definition: '',
  };
  const [formErrors, setFormErrors] = useState(initialErrorState);

  const handleClose = () => {
    onClose();
  };

  const validateForm = (data) => {
    let isValid = true;
    const update = {};
    const errors = {
      word: '',
      definition: '',
    };

    if (hasProp(data, 'word')) {
      let { word } = data;

      if (word.length) {
        word = word.trim();
      }

      if (!word.length) {
        isValid = false;
        errors.word = 'Cannot be empty';
      }

      update['word'] = word;
      setIsDirty(true);
    }

    if (hasProp(data, 'definition')) {
      let { definition } = data;

      if (definition.length) {
        definition = definition.trim();
      }

      if (!definition.length) {
        isValid = false;
        errors.definition = 'Cannot be empty';
      }

      update['definition'] = definition;
      setIsDirty(true);
    }

    setFormErrors(errors);
    return [isValid, update];
  };

  const handleSubmit = (ev: React.MouseEvent<Element, MouseEvent>) => {
    ev.preventDefault();

    const [isValid, validationUpdate] = validateForm(formTerm);
    const update = {
      ...formTerm,
      ...validationUpdate,
    };

    setFormTerm(update);

    if (!isValid) {
      return;
    }

    onSubmit({
      ...update,
      id: isNewTerm ? -1 : term.id,
    });
  };

  const handleWordChange = (ev: React.FormEvent<HTMLInputElement>) => {
    const word = ev.currentTarget.value;
    const update = {
      ...formTerm,
      word,
    };

    setFormTerm(update);
    validateForm(update);
  };

  const handleDefinitionChange = (ev: React.FormEvent<HTMLTextAreaElement>) => {
    const definition = ev.currentTarget.value;
    const update = {
      ...formTerm,
      definition,
    };

    setFormTerm(update);
    validateForm(update);
  };

  useEffect(() => {
    if (
      term &&
      (formTerm.word !== term.word || formTerm.definition !== term.definition)
    ) {
      setFormTerm(term);
    }

    if (isOpen) {
      menu.API.disableProjectActions();
    } else {
      menu.API.enableProjectActions();
      setFormErrors(initialErrorState);
    }
  }, [term, isOpen]);

  return (
    <div ref={ref}>
      <AnimatePresence>
        {isOpen && (
          <div className={className}>
            <Backdrop
              className="glossary-form-overlay-backdrop"
              onClick={handleClose}
            />
            <Drawer isAnimated={isAnimated} isOpen={isOpen}>
              <div className="owlui-offcanvas-header">
                <h4 className="owlui-offcanvas-title mb-0">
                  {title} Glossary Term
                </h4>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                />
              </div>

              <div className="owlui-offcanvas-body content-form">
                <form className="owlui-offcanvas-form">
                  <div className="mb-2">
                    <label htmlFor="term-word" className="form-label">
                      Term
                    </label>
                    <input
                      id="term-word"
                      name="word"
                      autoFocus
                      type="text"
                      className={`owlui-form-control${
                        isDirty && formErrors.word ? ' is-invalid' : ''
                      }`}
                      placeholder="Enter Term"
                      value={formTerm.word}
                      onChange={handleWordChange}
                    />
                    {formErrors.word && (
                      <div className="invalid-feedback">{formErrors.word}</div>
                    )}
                  </div>

                  <div className="mb-2 owlui-offcanvas-form__textarea">
                    <label htmlFor="glossary-definition" className="form-label">
                      Definition
                    </label>
                    <textarea
                      id="glossary-definition"
                      name="definition"
                      className={`owlui-form-control${
                        isDirty && formErrors.definition ? ' is-invalid' : ''
                      }`}
                      placeholder="Define the Term"
                      style={{ resize: 'none' }}
                      value={formTerm.definition}
                      onChange={handleDefinitionChange}
                    />
                    {formErrors.definition && (
                      <div className="invalid-feedback">
                        {formErrors.definition}
                      </div>
                    )}
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
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const GlossaryForm = forwardRef(GlossaryFormElement);

export const GlossaryOverlay = ({ isOpen, ...props }) => {
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
      <GlossaryForm ref={overlayRef} isOpen={isOpen} {...props} />
    </div>
  );
};

export default {
  GlossaryOverlay,
  GlossaryForm,
};
