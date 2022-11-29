import React, { useRef } from 'react';
import Scrowl from '@scrowl/template-core';
import './_index.scss';
import { SimpleTextProps } from './simple-text.types';

export const SimpleText = ({ id, schema, ...props }: SimpleTextProps) => {
  let classes = `template-simple-text`;
  const Markdown = Scrowl.core.Markdown;
  const editMode = props.editMode ? true : false;
  const focusElement = editMode ? props.focusElement : null;
  const contentId = `${id}-block-text`;
  const text = schema.content.text.value;
  const textFocusCss = focusElement === 'text' && 'has-focus';
  const bgUrl = schema.content.bgImage.content.url.value;
  const bgLabel = schema.content.bgImage.content.alt.value || '';
  const bgFocusCss = focusElement === 'bgImage.url' && 'has-focus';
  const bgRef = useRef<HTMLDivElement>(null);
  const bgStyles = {
    backgroundImage: `url("${bgUrl}")`,
  };
  const alignment = schema.content.options.content.alignment.value;
  const alignmentCss = alignment;
  const pins = [contentId];

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
    console.log('');
    console.log('progress', ev.scene);

    if (bgRef.current) {
      if (ev.scene.rect.y < 0) {
        const top = ev.scene.rect.y * -1;

        bgRef.current.style.top = `${top}px`;
      }
    }
  };

  return (
    <Scrowl.core.Template
      className={classes}
      onProgress={handleSlideProgress}
      pins={pins}
      {...props}
    >
      <div id={contentId} className="inner-content">
        <div className="row row-cols-2">
          {bgUrl && <div className="overlay" />}

          <div className={`text__wrapper ${alignmentCss}`}>
            <div
              className={`text__container can-focus ${textFocusCss}`}
              onMouseDown={handleFocusText}
            >
              <Markdown>{text}</Markdown>
            </div>
          </div>
        </div>
      </div>
      {(bgUrl || editMode) && (
        <div
          ref={bgRef}
          className={`img__wrapper ${alignmentCss} can-focus ${bgFocusCss} as-bg`}
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
  SimpleText,
};
