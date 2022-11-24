import React, { useEffect, useRef, forwardRef } from 'react';
import { animations, Modal } from '../../../../../components';

const ConfirmationElement = ({ isOpen, onClose, ...props }, ref) => {
  const title = 'Course Published';

  return (
    <div ref={ref}>
      <Modal
        className="modal-publish-confirmation"
        title={title}
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="overlay-publish-confirmation">
          <h4 className="mt-4">🌟 Congratulations 🌟</h4>
          <h5 className="mt-4">You Published Your First Course</h5>

          <div style={{ position: 'absolute', top: '0', left: '0' }}>
            <animations.Confetti loop={true} />
          </div>

          <div style={{ margin: '-80px auto -100px auto', width: '400px' }}>
            <animations.Trophy loop={false} />
          </div>
        </div>

        <footer className="d-flex justify-content-end">
          <button type="button" className="btn btn-link" onClick={onClose}>
            Close
          </button>
        </footer>
      </Modal>
    </div>
  );
};

const ConfirmationRef = forwardRef(ConfirmationElement);

export const Confirmation = ({ isOpen, ...props }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const appNode = document.getElementById('app');

    if (appNode && overlayRef.current) {
      appNode.appendChild(overlayRef.current);
    }
  }, [overlayRef, isOpen]);

  return <ConfirmationRef ref={overlayRef} isOpen={isOpen} {...props} />;
};

export default {
  Confirmation,
};
