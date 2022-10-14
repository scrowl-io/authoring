import React from 'react';
import { Backdrop } from './backdrop';
import { useGlossaryEditor, setGlossaryEditor } from '../../../';
import { Drawer } from './';

export const GlossaryEditor = (props) => {
  const isOpen = useGlossaryEditor();
  const isAnimated = props.isAnimated;

  const handleClose = () => {
    setGlossaryEditor(false);
  };

  const handleSubmit = (ev: React.MouseEvent<Element, MouseEvent>) => {
    ev.preventDefault();
  };

  console.log('glossary is open', isOpen);

  return (
    <>
      <Drawer isAnimated={isAnimated} isOpen={isOpen}>
        <div className="offcanvas-header">
          <h4 className="offcanvas-title mb-0">{props.title}</h4>
          <button type="button" className="btn-close" onClick={handleClose} />
        </div>

        <div className="offcanvas-body">
          <form className="owl-offcanvas-form"></form>
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
              className="btn btn-link"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </footer>
        </div>
      </Drawer>
      {isOpen ? <Backdrop {...props} onClick={handleClose} /> : <></>}
    </>
  );
};

export default {
  GlossaryEditor,
};
