import React from 'react';
import { AssetProgressProps } from './asset.types';

export const AssetProgress = ({ filename, progress }: AssetProgressProps) => {
  const style = {
    width: `${progress}%`,
  };

  return (
    <div>
      <div className="copy-assets-progress-blocker"></div>
      <div className="copy-assets-progress">
        <div className="progress-container">
          <b>Adding Files...</b>
          <div className="mb-2 file-name">{filename}</div>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              aria-label="Basic example"
              style={style}
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default {
  AssetProgress,
};
