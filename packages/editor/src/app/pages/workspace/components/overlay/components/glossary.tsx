import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import '../_overlay.scss';
import { Backdrop, Drawer } from '.';
import { Settings } from '../../../../../models';

const GlossaryFormElement = (
  { isOpen, onClose, onSubmit, term, ...props },
  ref
) => {
  const animationSettings = Settings.useAnimation();
  const isAnimated = !animationSettings.reducedAnimations;
  const isNewTerm = term === undefined || term.id === -1;
  const title = isNewTerm ? 'Add' : 'Edit';
  const [termWord, setTermWord] = useState(isNewTerm ? '' : term.word);
  const [termDefinition, setTermDefinition] = useState(
    isNewTerm ? '' : term.description
  );
  const [isDirty, setIsDirty] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (ev: React.MouseEvent<Element, MouseEvent>) => {
    ev.preventDefault();

    const hasError = termWord.trim() === '' || termDefinition.trim() === '';

    if (hasError) {
      setIsDirty(true);
      return;
    }

    onSubmit({
      word: termWord,
      definition: termDefinition,
      id: isNewTerm ? -1 : term.id,
    });
  };

  useEffect(() => {
    if (termWord !== term.word) {
      setTermWord(term.word);
      setTermDefinition(term.definition);
    }
  }, [term, isOpen]);

  return (
    <div ref={ref}>
      <Drawer isAnimated={isAnimated} isOpen={isOpen}>
        <div className="owlui-offcanvas-header">
          <h4 className="owlui-offcanvas-title mb-0">{title} Glossary Term</h4>
          <button type="button" className="btn-close" onClick={handleClose} />
        </div>

        <div className="owlui-offcanvas-body content-form">
          <form className="owlui-offcanvas-form">
            <div className="mb-2">
              <label htmlFor="term-word" className="form-label">
                Term
              </label>
              <input
                id="term-word"
                autoFocus
                type="text"
                className={
                  'owlui-form-control ' +
                  (isDirty && termWord.trim() === '' ? 'error' : '')
                }
                placeholder="Enter Term"
                value={termWord}
                onChange={(e) => {
                  setTermWord(e.target.value);
                }}
              />
            </div>

            <div className="mb-2 owlui-offcanvas-form__textarea">
              <label htmlFor="glossary-definition" className="form-label">
                Definition
              </label>
              <textarea
                id="glossary-definition"
                className={
                  'owlui-form-control form-control-lg ' +
                  (isDirty && termDefinition.trim() === '' ? 'error' : '')
                }
                placeholder="Define the term"
                style={{ resize: 'none' }}
                value={termDefinition}
                onChange={(e) => {
                  setTermDefinition(e.target.value);
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

export const GlossaryForm = forwardRef(GlossaryFormElement);

export const GlossaryOverlay = (props) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const appNode = document.getElementById('app');

    if (appNode && overlayRef.current) {
      appNode.appendChild(overlayRef.current);
    }
  }, [overlayRef]);

  return (
    <AnimatePresence>
      <GlossaryForm ref={overlayRef} {...props} />
    </AnimatePresence>
  );
};

export default {
  GlossaryOverlay,
  GlossaryForm,
};
