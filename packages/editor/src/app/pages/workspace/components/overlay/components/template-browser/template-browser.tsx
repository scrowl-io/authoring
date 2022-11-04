import React from 'react';
import { Button } from '@owlui/lib';
import * as css from '../../_overlay.scss';
import { ModalOverlay } from '../modal';

export const TemplateBrowser = ({ isOpen, onClose, onSubmit, ...props }) => {
  const title = 'Template Browser';

  const handleSubmit = () => {
    console.log('template selected');
    onSubmit();
  };

  return (
    <ModalOverlay title={title} isOpen={isOpen} onClose={onClose}>
      <div className={css.templateBrowserContainer}>Template List</div>
      <footer className="d-flex justify-content-end">
        <Button variant="link" onClick={onClose}>
          Close
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Select Template
        </Button>
      </footer>
    </ModalOverlay>
  );
};

export default {
  TemplateBrowser,
};
