import React, { useEffect, useRef, forwardRef } from 'react';
import { Button } from '@owlui/lib';
import * as css from './_prompt-project-name.scss';
import { Modal } from '../modal';
import { Projects } from '../../../../../../models';
import {
  usePromptProjectName,
  closePromptProjectName,
} from '../../../../page-workspace-hooks';

const PromptProjectNameElement = ({ isOpen, ...props }, ref) => {
  const title = 'Saving Project';
  const projectData = Projects.useData();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSetProjectName = (ev: React.FormEvent<HTMLInputElement>) => {
    const name = ev.currentTarget.value;

    Projects.setMeta({ name: name });
  };

  const handleInput = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    switch (ev.key) {
      case 'Enter':
        ev.currentTarget.blur();
        handleSubmit();
        break;
      case 'Escape':
        Projects.setMeta({ name: '' });
        ev.currentTarget.blur();
        break;
    }
  };

  const handleClose = () => {
    closePromptProjectName();
  };

  const handleSubmit = () => {
    Projects.save(projectData).then((res) => {
      if (res.error) {
        console.error(res);
        return;
      }

      // notification - project saved correctly
      console.log('prompt saved project', res);
      closePromptProjectName();
    });
  };

  useEffect(() => {
    setTimeout(() => {
      if (isOpen && inputRef.current) {
        inputRef.current.focus();
      }
    }, 1); // ensure that focus is respected
  }, [isOpen, inputRef]);

  return (
    <div ref={ref}>
      <Modal
        className="modal-publish-confirmation"
        title={title}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <div className={css.promptProjectNameForm}>
          <h2 className={css.promptProjectNameSubtitle}>
            Please name your project
          </h2>

          <input
            ref={inputRef}
            className="form-control"
            value={projectData.meta.name}
            onChange={handleSetProjectName}
            onKeyDown={handleInput}
            placeholder="Untitled Project"
          />
        </div>

        <footer className="d-flex justify-content-end">
          <Button variant="link" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Save
          </Button>
        </footer>
      </Modal>
    </div>
  );
};

const PromptProjectNameRef = forwardRef(PromptProjectNameElement);

export const PromptProjectName = (props) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const isOpen = usePromptProjectName();

  useEffect(() => {
    const appNode = document.getElementById('app');

    if (appNode && overlayRef.current) {
      appNode.appendChild(overlayRef.current);
    }
  }, [overlayRef, isOpen]);

  return <PromptProjectNameRef ref={overlayRef} isOpen={isOpen} {...props} />;
};

export default {
  PromptProjectName,
};
