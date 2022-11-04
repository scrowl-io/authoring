import React from 'react';
import { animations } from '../../../../../../components';
import { ModalOverlay } from '../modal';

export const ConfirmationOverlay = ({ isOpen, onClose, ...props }) => {
  const title = 'Course Published';

  return (
    <ModalOverlay title={title} isOpen={isOpen} onClose={onClose}>
      <div className="overlay-publish-confirmation">
        <h4 className="mt-4">🌟 Congratulations 🌟</h4>
        <h5 className="mt-4">You Published Your First Course</h5>

        {/* <div style={{ position: 'absolute', top: '0', left: '0' }}>
          <animations.Confetti loop={true} />
        </div> */}

        <div style={{ margin: '-80px auto -100px auto', width: '400px' }}>
          <animations.Trophy loop={false} />
        </div>
      </div>

      <footer className="d-flex justify-content-end my-3">
        <button type="button" className="btn btn-link" onClick={onClose}>
          Close
        </button>
      </footer>
    </ModalOverlay>
  );
};

export default {
  ConfirmationOverlay,
};
