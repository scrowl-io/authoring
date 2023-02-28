// @ts-ignore
import React, { useRef, useState } from 'react';
import './_index.scss';
import { LessonIntroProps } from './lesson-intro.types';

export const LessonIntro = ({ id, schema, ...props }: LessonIntroProps) => {
  const Scrowl = window['Scrowl'];
  let classes = 'template-lesson-intro';
  const editMode = props.editMode ? true : false;
  const focusElement = editMode ? props.focusElement : null;
  const contentId = `${id}-lesson-intro`;
  const title = schema.content.title.value;
  let titleClasses = 'template-lesson-intro-title can-focus';
  const subtitle = schema.content.subtitle.value;
  let subtitleClasses = 'template-lesson-intro-subtitle can-focus';
  const time = schema.content.time.value;
  let timeClasses = 'template-lesson-intro-time can-focus';
  const startLabel = schema.content.startLabel.value;
  let startLabelClasses = 'template-lesson-intro-start-button can-focus';
  const bg = schema.content.bgImage.content.bg.value;
  const bgUrl = schema.content.bgImage.content.url.value;
  const bgLabel = schema.content.bgImage.content.alt.value || '';
  let bgClasses = `img__wrapper can-focus ${bg ? 'as-bg' : 'as-hero'}`;
  const bgRef = useRef<HTMLDivElement>(null);
  const bgStyles = {
    backgroundImage: `url("${bgUrl}")`,
  };

  if (focusElement === 'title') {
    titleClasses += ' has-focus';
  }

  switch (focusElement) {
    case 'title':
      titleClasses += ' has-focus';
      break;
    case 'subtitle':
      subtitleClasses += ' has-focus';
      break;
    case 'time':
      timeClasses += ' has-focus';
      break;
    case 'startLabel':
      startLabelClasses += ' has-focus';
      break;
    case 'bgImage.url':
      bgClasses += ' has-focus';
      break;
    default:
      console.warn('Unsupported element', focusElement);
      break;
  }

  const handleFocusTitle = () => {
    if (editMode) {
      Scrowl.core.host.sendMessage({
        type: 'focus',
        field: 'title',
      });
    }
  };

  const handleFocusSubtitle = () => {
    if (editMode) {
      Scrowl.core.host.sendMessage({
        type: 'focus',
        field: 'subtitle',
      });
    }
  };

  const handleFocusTime = () => {
    if (editMode) {
      Scrowl.core.host.sendMessage({
        type: 'focus',
        field: 'time',
      });
    }
  };

  const handleFocusStartLabel = (ev) => {
    if (editMode) {
      Scrowl.core.host.sendMessage({
        type: 'focus',
        field: 'startLabel',
      });
    } else {
      const startCourse = new CustomEvent('startCourse', { detail: ev });
      document.dispatchEvent(startCourse);
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

  return (
    <Scrowl.core.Template
      id={`slide-${contentId}`}
      className={classes}
      notScene={true}
      style={{ overflow: 'hidden' }}
      {...props}
    >
      <div id={contentId} className="content">
        <header>
          {bg && <div className="overlay" />}
          <h1 className={titleClasses} onMouseDown={handleFocusTitle}>
            {title}
          </h1>
          <h2 className={subtitleClasses} onMouseDown={handleFocusSubtitle}>
            {subtitle}
          </h2>
          {time && time.length > 0 && (
            <span className={timeClasses} onMouseDown={handleFocusTime}>
              <Scrowl.ui.Icon icon="schedule" display="outlined" />
              <span className="template-lesson-intro-time-value">{time}</span>
            </span>
          )}
          <button
            className={startLabelClasses}
            onMouseDown={handleFocusStartLabel}
          >
            {startLabel}
          </button>
        </header>
        {(bgUrl || editMode) && (
          <div ref={bgRef} className={bgClasses} onMouseDown={handleFocusBg}>
            <img
              className="img__container"
              aria-label={bgLabel}
              style={bgStyles}
            />
          </div>
        )}
      </div>
    </Scrowl.core.Template>
  );
};

export default {
  LessonIntro,
};
