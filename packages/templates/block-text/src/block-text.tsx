import React, { useState, useRef } from 'react';
import Scrowl from '@scrowl/template-core';
import './_index.scss';
import { BlockTextProps } from './block-text.types';

export const BlockText = ({ id, schema, ...props }: BlockTextProps) => {
  let classes = 'template-block-text';
  const editMode = props.editMode ? true : false;
  const focusElement = editMode ? props.focusElement : null;
  const contentId = `${id}-block-text`;
  const text = schema.content.text.value;
  const textFocusCss = focusElement === 'text' && 'has-focus';
  const bg = schema.content.bgImage.content.bg.value;
  const bgUrl = schema.content.bgImage.content.url.value;
  const bgLabel = schema.content.bgImage.content.alt.value || '';
  const bgFocusCss = focusElement === 'bgImage.url' && 'has-focus';
  const bgRef = useRef<HTMLDivElement>(null);
  const bgStyles = {
    backgroundImage: `url("${bgUrl}")`,
  };
  const alignment = schema.content.options.content.alignment.value;
  const alignmentCss = alignment === 'right' ? 'right' : 'left';
  const showProgressBar = schema.content.options.content.showProgress.value;
  const [progressBarStyles, setProgressBarStyles] = useState({
    width: showProgressBar ? '0%' : '100%',
  });
  const pins = [contentId];

  if (showProgressBar) {
    classes += ' show-progress';
  }

  const handleFocusText = () => {
    if (editMode) {
      Scrowl.core.host.sendMessage({
        type: 'focus',
        field: 'text',
      });
    }
  };

  const handleFocusBg = () => {
    if (editMode) {
      Scrowl.core.host.sendMessage({
        type: 'focus',
        field: 'bgImage.url',
      });
    }
  };

  const handleSlideProgress = (ev) => {
    if (bgRef.current) {
      if (ev.scene.rect.y < 0) {
        const top = ev.scene.rect.y * -1 + (bg ? 0 : 32);
        const bottom = top + window.innerHeight;

        if (bg || bottom < ev.scene.end) {
          bgRef.current.style.top = `${top}px`;
        }
      }
    }

    if (showProgressBar) {
      setProgressBarStyles({
        ...progressBarStyles,
        width: `${ev.progress}%`,
      });
    }
  };

  const handleSlideEnd = () => {
    if (!showProgressBar) {
      return;
    }

    setProgressBarStyles({
      ...progressBarStyles,
      width: `100%`,
    });
  };

  return (
    <Scrowl.core.Template
      className={classes}
      onProgress={handleSlideProgress}
      onEnd={handleSlideEnd}
      pins={pins}
      {...props}
    >
      <div id={contentId} className="inner-content">
        <div className="row row-cols-2">
          {bg && <div className="overlay" />}

          <div className={`text__wrapper ${alignmentCss}`}>
            <div className="text__container">
              <div className="progress-indictor">
                <div className="progress-bar" style={progressBarStyles}></div>
              </div>
              <p
                className={`text__value can-focus ${textFocusCss}`}
                onMouseDown={handleFocusText}
              >
                {text}
              </p>
            </div>
          </div>
        </div>
      </div>
      {(bgUrl || editMode) && (
        <div
          ref={bgRef}
          className={`img__wrapper ${alignmentCss} can-focus ${bgFocusCss} ${
            bg ? 'as-bg' : 'as-side'
          }`}
          onMouseDown={handleFocusBg}
        >
          <img
            className="img__container"
            aria-label={bgLabel}
            style={bgStyles}
          />
        </div>
      )}
    </Scrowl.core.Template>
  );
};

export default {
  BlockText,
};
