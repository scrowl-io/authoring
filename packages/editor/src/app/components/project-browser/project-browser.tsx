import React, { useEffect, forwardRef, useRef } from 'react';
import { Modal } from '../';
import { Projects } from '../../models';

const ProjectBrowserElement = ({ isOpen, ...props }, ref) => {
  const title = 'Project Browser';
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    Projects.closeProjectBrowser();
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
        className="modal-project-browser"
        title={title}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <div>
          <p>Project list</p>
        </div>
      </Modal>
    </div>
  );
};

const ProjectBrowserRef = forwardRef(ProjectBrowserElement);

export const ProjectBrowser = (props) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const isOpen = Projects.useProjectBrowser();

  useEffect(() => {
    const appNode = document.getElementById('app');

    if (appNode && overlayRef.current) {
      appNode.appendChild(overlayRef.current);
    }
  }, [overlayRef, isOpen]);

  return <ProjectBrowserRef ref={overlayRef} isOpen={isOpen} {...props} />;
};

export default {
  ProjectBrowser,
};
