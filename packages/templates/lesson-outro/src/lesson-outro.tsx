import React, { useEffect, useRef, useState } from 'react';
import './_index.scss';
import { LessonOutroProps } from './lesson-outro.types';

// @ts-ignore
const LessonOutro = ({ id, schema, lesson, ...props }: LessonOutroProps) => {
  const Scrowl = window['Scrowl'];
  let classes = 'template-lesson-outro';
  const editMode = props.editMode ? true : false;
  const focusElement = editMode ? props.focusElement : null;
  const contentId = `${id}-lesson-outro`;
  const title = schema.content.title.value;
  let titleClasses = 'template-lesson-outro-title can-focus';
  const subtitle = schema.content.subtitle.value;
  let subtitleClasses = 'template-lesson-outro-subtitle can-focus';
  const time = schema.content.time.value;
  let timeClasses = 'template-lesson-outro-time can-focus';
  const startLabel = schema.content.startLabel.value;
  let startLabelClasses = 'template-lesson-outro-start-button can-focus';
  const bg = schema.content.bgImage.content.bg.value;
  const bgUrl = schema.content.bgImage.content.url.value;
  const bgLabel = schema.content.bgImage.content.alt.value || '';
  let bgClasses = `img__wrapper can-focus ${bg ? 'as-bg' : 'as-hero'}`;
  const bgRef = useRef<HTMLDivElement>(null);
  const bgStyles = {
    backgroundImage: `url("${bgUrl}")`,
  };
  const disableAnimations = schema.controlOptions.disableAnimations?.value;

  const [lessonQuestions, setLessonQuestions] = useState(
    lesson.attempts[0].questions
  );

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

  const getScore = () => {
    const correctAnswers = lessonQuestions.filter((question) => {
      return question.correct === true;
    });
    const score = correctAnswers.length / lessonQuestions.length;
    return Math.ceil((score * 100) / 5) * 5;
  };

  useEffect(() => {
    const handleUpdateOutro = (_ev) => {
      console.log('inside outro handler: ', _ev);
      setLessonQuestions([..._ev.detail.questions]);
    };

    document.addEventListener('updateOutro', handleUpdateOutro);
  }, []);

  console.log('lessonQuestions: ', lessonQuestions);

  getScore();
  return (
    <Scrowl.core.Template
      id={`slide-${contentId}`}
      className={classes}
      notScene={disableAnimations ? true : false}
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
              <span className="template-lesson-outro-time-value">{time}</span>
            </span>
          )}
          <h2>Score: {getScore()}%</h2>
          <table className="questions-table">
            <thead>
              <tr>
                <th>Question</th>
                <th>Correct</th>
              </tr>
            </thead>

            <tbody>
              {lessonQuestions.map((question) => {
                return (
                  <tr>
                    <td>{question.question}</td>
                    {question.correct ? <td>Correct</td> : <td>Incorrect</td>}
                  </tr>
                );
              })}
            </tbody>
          </table>

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

export { LessonOutro as default };
