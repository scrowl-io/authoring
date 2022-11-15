import React from 'react';
import { animations } from '../../../../../../components';
import { Modal } from '../modal';
import {
  usePublishProgress,
  closePublishProgress,
} from '../../../../page-workspace-hooks';

const PublishProgress = () => {
  const isOpen = usePublishProgress();

  const handleClose = () => {
    closePublishProgress();
  };

  return (
    <div>
      <Modal
        className="modal-publish-progress"
        isOpen={isOpen}
        onClose={handleClose}
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

export default {
  PublishProgress,
};
