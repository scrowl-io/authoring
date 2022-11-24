import React, { useEffect, useRef, forwardRef } from 'react';
import { animations, Modal } from '../../../../../components';
import {
  usePublishProgress,
  closePublishProgress,
} from '../../../page-workspace-hooks';

const PublishProgressElement = ({ isOpen, onClose }, ref) => {
  return (
    <div ref={ref}>
      <Modal
        className="modal-publish-progress"
        isOpen={isOpen}
        onClose={onClose}
        modalSize="sm"
      >
        <div className="overlay-publish-progress">
          <h5 className="mt-4">Publishing Course...</h5>

          <div
            style={{
              margin: '-40px auto auto auto',
              width: '200px',
              transform: 'rotate(45deg)',
            }}
          >
            <animations.Rocket loop={true} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

const PublishProgressRef = forwardRef(PublishProgressElement);

export const PublishProgress = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const isOpen = usePublishProgress();

  const handleClose = () => {
    closePublishProgress();
  };

  useEffect(() => {
    const appNode = document.getElementById('app');

    if (appNode && overlayRef.current) {
      appNode.appendChild(overlayRef.current);
    }
  }, [overlayRef, isOpen]);

  return (
    <PublishProgressRef
      ref={overlayRef}
      isOpen={isOpen}
      onClose={handleClose}
    />
  );
};

export default {
  PublishProgress,
};
