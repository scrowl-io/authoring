import React, { useState } from 'react';
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
  const bgStylesFull = !bg
    ? {}
    : {
        width: '100vw',
        height: '100vh',
        backgroundImage: `url("./assets/${bgUrl}")`,
      };
  const bgStylesHero = bg
    ? {}
    : {
        backgroundImage: bgStylesFull.backgroundImage,
      };
  const alignment = schema.content.options.content.alignment.value;
  const alignmentCss = alignment === 'right' ? 'right' : '';
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
    if (!showProgressBar) {
      return;
    }

    setProgressBarStyles({
      ...progressBarStyles,
      width: `${ev.progress}%`,
    });
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
      <div
        id={contentId}
        className="hero"
        aria-label={bgLabel}
        style={bgStylesFull}
      >
        <div className="inner-content">
          {bg && <div className="overlay" />}

          <div className={`text ${alignmentCss}`}>
            <div className="wrapper">
              <div className="progress-indictor">
                <div className="progress-bar" style={progressBarStyles}></div>
              </div>
              <p
                className={`can-focus ${textFocusCss}`}
                onMouseDown={handleFocusText}
              >
                {text}
              </p>
            </div>
          </div>

          {!bg && (
            <div
              role="img"
              aria-label={bgLabel}
              className={`img ${alignmentCss} can-focus ${bgFocusCss}`}
              onMouseDown={handleFocusBg}
              style={bgStylesHero}
            />
          )}
        </div>
      </div>
    </Scrowl.core.Template>
  );
};

export default {
  BlockText,
};
