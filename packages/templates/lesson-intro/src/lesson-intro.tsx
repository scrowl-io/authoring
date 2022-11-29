import React from 'react';
import Scrowl from '@scrowl/template-core';
import * as css from './_index.scss';
import { LessonIntroProps } from './lesson-intro.types';

export const LessonIntro = ({ schema, ...props }: LessonIntroProps) => {
  let classes = `${css.templateLessonIntro} `;
  const editMode = props.editMode ? true : false;
  const focusElement = editMode ? props.focusElement : null;

  let title = schema.content.title.value;
  let subtitle = schema.content.subtitle.value;
  let time = schema.content.time.value;
  let startLabel = schema.content.startLabel.value;
  const heroImage = schema.content.heroImage.content;

  return (
    <Scrowl.core.Template {...props} className={classes}>
      <div className="slide-container">
        <div className="layout">
          <header>
            <h1
              className={
                'lesson-title can-focus ' +
                (focusElement === 'text' && ' has-focus')
              }
              onMouseDown={() => {
                if (editMode) {
                  Scrowl.core.host.sendMessage({
                    type: 'focus',
                    field: 'text',
                  });
                }
              }}
            >
              {title}
            </h1>
            <h2
              className={
                'lesson-subtitle can-focus ' +
                (focusElement === 'text' && ' has-focus')
              }
              onMouseDown={() => {
                if (editMode) {
                  Scrowl.core.host.sendMessage({
                    type: 'focus',
                    field: 'text',
                  });
                }
              }}
            >
              {subtitle}
            </h2>
            {time && time.length > 0 && (
              <span
                className={
                  'time can-focus ' + (focusElement === 'text' && ' has-focus')
                }
                onMouseDown={() => {
                  if (editMode) {
                    Scrowl.core.host.sendMessage({
                      type: 'focus',
                      field: 'text',
                    });
                  }
                }}
              >
                <svg
                  className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-uqopch"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="ScheduleOutlinedIcon"
                >
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
                </svg>
                <span>{time}</span>
              </span>
            )}
            <button
              className={
                'lesson-start-button can-focus ' +
                (focusElement === 'startLabel' && ' has-focus')
              }
              onClick={() => {
                if (editMode) {
                  Scrowl.core.host.sendMessage({
                    type: 'focus',
                    field: 'startLabel',
                  });
                  return;
                }

                // TODO:: go to next slide
              }}
            >
              {startLabel}
            </button>
          </header>
          <div
            className="img-container hero can-focus"
            role="img"
            aria-label={heroImage.alt.value}
            style={
              heroImage.url.value
                ? {
                    backgroundImage: `url("./assets/${heroImage.url.value}")`,
                  }
                : {}
            }
            onMouseDown={() => {
              if (editMode) {
                Scrowl.core.host.sendMessage({
                  type: 'focus',
                  field: 'heroImage.url',
                });
              }
            }}
          >
            {!heroImage.url.value && editMode ? (
              <div
                style={{
                  paddingTop: '40%',
                  width: '100%',
                  height: '100%',
                  border: '2px dashed #c2c2c2',
                }}
              >
                <span style={{ color: '#9f9f9f' }}>Select an Image</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Scrowl.core.Template>
  );
};

export default {
  LessonIntro,
};
