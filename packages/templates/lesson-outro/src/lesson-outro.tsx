import React, { useEffect, useRef, useState } from 'react';
import './_index.scss';
import { LessonOutroProps } from './lesson-outro.types';

const LessonOutro = ({
  id,
  schema,
  lesson,
  attempt,
  // @ts-ignore
  slides,
  ...props
}: LessonOutroProps) => {
  const Scrowl = window['Scrowl'];
  let classes = 'template-lesson-outro';
  const editMode = props.editMode ? true : false;
  const focusElement = editMode ? props.focusElement : null;
  const contentId = `${id}-lesson-outro`;
  const title = schema.content.title.value;
  let titleClasses = 'template-lesson-outro-title can-focus';
  const bg = schema.content.bgImage.content.bg.value;
  const bgUrl = schema.content.bgImage.content.url.value;
  const bgLabel = schema.content.bgImage.content.alt.value || '';
  let bgClasses = `img__wrapper can-focus ${bg ? 'as-bg' : 'as-hero'}`;
  const bgRef = useRef<HTMLDivElement>(null);
  const bgStyles = {
    backgroundImage: `url("${bgUrl}")`,
  };
  const disableAnimations = schema.controlOptions.disableAnimations?.value;
  let lessonQuestions;
  let setLessonQuestions;
  if (!editMode) {
    [lessonQuestions, setLessonQuestions] = useState(
      //@ts-ignore
      lesson.attempts[attempt.current].questions
    );
  }

  const threshold = 60;

  if (focusElement === 'title') {
    titleClasses += ' has-focus';
  }

  switch (focusElement) {
    case 'title':
      titleClasses += ' has-focus';
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

  const handleFocusBg = () => {
    if (editMode) {
      Scrowl.core.host.sendMessage({
        type: 'focus',
        field: 'bgImage.url',
      });
    }
  };

  const getScore = () => {
    let score = 0;
    const correctAnswers = lessonQuestions?.filter((question) => {
      return question.correct === true;
    });
    if (correctAnswers) {
      score = correctAnswers.length / lessonQuestions.length;
      return Math.ceil((score * 100) / 5) * 5;
    } else {
      return score;
    }
  };

  let score = getScore();

  const resetQuiz = () => {
    if (editMode) {
      return;
    }
    const resetQuiz = new CustomEvent('resetQuiz', {
      detail: {
        lessonQuestions,
        slides,
      },
    });
    document.dispatchEvent(resetQuiz);

    if (lesson && lesson.attempts && attempt) {
      setLessonQuestions([...lesson.attempts[attempt.current].questions]);
    }
    score = 0;
  };

  useEffect(() => {
    const handleUpdateOutro = (ev) => {
      if (editMode) {
        return;
      }
      const updatedQuestions = lessonQuestions;
      lessonQuestions.forEach((question, idx) => {
        if (question.id === ev.detail.contentId) {
          updatedQuestions[idx] = ev.detail;
        }
        setLessonQuestions([...updatedQuestions]);
      });
    };

    document.addEventListener('updateOutro', handleUpdateOutro);
    //@ts-ignore
  }, [lesson?.attempts[attempt.current].questions]);

  useEffect(() => {
    if (score && score > threshold) {
      const passLessonEvent = new CustomEvent('passLesson', {
        detail: score,
      });
      document.dispatchEvent(passLessonEvent);
    }
  }, [score]);

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
          <h1 className={titleClasses} onMouseDown={handleFocusTitle}>
            {title}
          </h1>
          <div className="results-container">
            <h3>Score: {score}%</h3>
            {score && score > threshold ? <h3>PASS</h3> : <h3>FAIL</h3>}
          </div>

          <table className="questions-table">
            <thead>
              <tr>
                <th>Question</th>
                <th>Correct</th>
              </tr>
            </thead>

            <tbody>
              {lessonQuestions &&
                lessonQuestions.map((question, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{question.question}</td>
                      {question.correct ? <td>Correct</td> : <td>Incorrect</td>}
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {score < threshold && (
            <button onClick={resetQuiz}>Retake Quiz</button>
          )}
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
