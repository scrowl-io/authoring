import React, { useState, useEffect, useRef } from 'react';
import './_index.scss';
import { BlockTextProps } from './block-text.types';

export const BlockText = ({ id, schema, ...props }: BlockTextProps) => {
  const Scrowl = window['Scrowl'];
  let classes = 'template-block-text';
  const Markdown = Scrowl.core.Markdown;
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
  const showProgressRef = useRef(showProgressBar);
  const slideProgress = useRef(0);
  const [progressBarStyles, setProgressBarStyles] = useState({
    width: showProgressBar ? '0%' : '100%',
  });

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
    slideProgress.current = ev.progress;

    if (showProgressRef.current) {
      setProgressBarStyles({
        ...progressBarStyles,
        width: `${ev.progress}%`,
      });
    }
  };

  const handleSlideEnd = () => {
    slideProgress.current = 100;

    if (!showProgressRef.current) {
      return;
    }

    setProgressBarStyles({
      ...progressBarStyles,
      width: `100%`,
    });
  };

  useEffect(() => {
    showProgressRef.current = showProgressBar;
    setProgressBarStyles({
      ...progressBarStyles,
      width: showProgressBar ? `${slideProgress.current}%` : `100%`,
    });
  }, [showProgressBar]);

  return (
    <Scrowl.core.Template
      id={`slide-${contentId}`}
      className={classes}
      onProgress={handleSlideProgress}
      onEnd={handleSlideEnd}
      {...props}
    >
      <div id={contentId} className="owlui-container">
        <div className={`owlui-row owlui-row-cols-2 ${alignmentCss}`}>
          {bg && <div className="owlui-col overlay" />}

          <div className={`owlui-col text__wrapper`}>
            <div className="text__container">
              <div className="progress-indictor">
                <div className="progress-bar" style={progressBarStyles}></div>
              </div>
              <div
                className={`text__value can-focus ${textFocusCss}`}
                onMouseDown={handleFocusText}
              >
                <Markdown>{text}</Markdown>
              </div>
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
