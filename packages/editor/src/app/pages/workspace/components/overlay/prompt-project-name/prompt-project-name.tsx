import React, { useEffect, useRef, forwardRef } from 'react';
import { ui } from '@scrowl/ui';
import * as css from './_prompt-project-name.scss';
import { Modal } from '../../../../../components';
import { Projects } from '../../../../../models';
import { sys, events } from '../../../../../services';
import { Elem } from '../../../../../utils';
import {
  usePromptProjectName,
  closePromptProjectName,
  usePromptProjectNamePostEvent,
  resetPromptProjectNamePostEvent,
} from '../../../page-workspace-hooks';

const PromptProjectNameElement = ({ isOpen, ...props }, ref) => {
  const title = 'Saving Project';
  const projectData = Projects.useData();
  const assets = Projects.useAssets();
  const postSuccess = useRef(false);
  const postEvent = usePromptProjectNamePostEvent();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSetProjectName = (ev: React.FormEvent<HTMLInputElement>) => {
    const name = ev.currentTarget.value;

    Projects.setMeta({ name: name });
  };

  const handleInput = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    switch (ev.key) {
      case 'Enter':
        ev.currentTarget.blur();
        break;
      case 'Escape':
        Elem.stopEvent(ev);
        Projects.setMeta({ name: '' });
        ev.currentTarget.blur();
        break;
    }
  };

  const handleClose = () => {
    closePromptProjectName();
  };

  const handleSubmit = (ev: React.FormEvent) => {
    Elem.stopEvent(ev);

    Projects.save({ data: projectData, assets }).then((res) => {
      if (res.error) {
        if (!res.data.action) {
          sys.messageDialog({
            message: res.message,
          });
        }
        return;
      }

      postSuccess.current = true;
      closePromptProjectName();
    });
  };

  useEffect(() => {
    setTimeout(() => {
      if (isOpen && inputRef.current) {
        inputRef.current.focus();
      }
    }, 1); // ensure that focus is respected

    const postAction = () => {
      if (postEvent) {
        switch (postEvent.action) {
          case events.project.EVENTS.close:
            events.project.close();
            break;
          case events.project.EVENTS.open:
            events.project.open();
            break;
        }
      }

      postSuccess.current = false;
      resetPromptProjectNamePostEvent();
    };

    if (!isOpen && postSuccess.current) {
      setTimeout(postAction, 300);
      // need to trigger after modal animation has ended
    }
  }, [isOpen, postEvent, inputRef, postSuccess.current]);

  return (
    <div ref={ref}>
      <Modal
        className="modal-publish-confirmation"
        title={title}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <form onSubmit={handleSubmit}>
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
            <ui.Button variant="link" onClick={handleClose}>
              Cancel
            </ui.Button>
            <ui.Button variant="success" type="submit">
              Save
            </ui.Button>
          </footer>
        </form>
      </Modal>
    </div>
  );
};

const PromptProjectNameRef = forwardRef(PromptProjectNameElement);

export const PromptProjectName = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const isOpen = usePromptProjectName();

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
      <PromptProjectNameRef ref={overlayRef} isOpen={isOpen} {...props} />
    </div>
  );
};

export default {
  PromptProjectName,
};
