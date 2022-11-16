import React from 'react';
import { AssetProgressProps } from './asset.types';

export const AssetProgress = ({ progress }: AssetProgressProps) => {
  const completed = progress.stats.completed;
  const style = {
    width: `${completed}%`,
  };

  return (
    <div className="copy-assets-progress">
      {completed !== -1 && (
        <>
          <div className="copy-assets-progress__backdrop"></div>
          <div className="copy-assets-progress__body">
            <b>{progress.message}</b>
            <div className="mb-2 file-name">{progress.filename}</div>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                aria-label="Basic example"
                style={style}
                aria-valuenow={completed}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <div className="copy-assets-progress-steps">
              <span>{progress.step}</span>
              <span>/</span>
              <span>{progress.steps}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default {
  AssetProgress,
};
