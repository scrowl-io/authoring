import React, { useState, useEffect, useRef } from 'react';
import './_index.scss';
import { QuizProps } from './quiz.types';

const Quiz = ({ id, schema, ...props }: QuizProps) => {
  const Scrowl = window['Scrowl'];
  let classes = 'template-quiz';
  const Markdown = Scrowl.core.Markdown;
  const editMode = props.editMode ? true : false;
  const focusElement = editMode ? props.focusElement : null;
  const contentId = `${id}-quiz`;
  const question = schema.content.question.content.question.value;
  const answers = schema.content.answers.content;
  const numberOfAnswers = schema.content.question.content.numberOfAnswers.value;
  const correctAnswer = schema.content.question.content.correctAnswer
    .value as number;
  const correctAnswerText = answers.find((_obj, i: number) => {
    const idx = correctAnswer - 1;
    return i === idx;
  });

  const textFocusCss = focusElement === 'text' && 'has-focus';
  const alignment = schema.content.options.content.alignment.value;
  const alignmentCss = alignment === 'right' ? 'right' : 'left';
  const disableAnimations = schema.controlOptions.disableAnimations?.value;
  const stopUserAdvancement = schema.controlOptions.stopUserAdvancement.value;
  const showProgressBar = schema.content.options.content.showProgress.value;
  const showProgressRef = useRef(showProgressBar);
  const slideProgress = useRef(0);
  const [progressBarStyles, setProgressBarStyles] = useState({
    width: showProgressBar ? '0%' : '100%',
  });
  const selectedAnswer = useRef(null);

  if (showProgressBar) {
    classes += ' show-progress';
  }

  const handleFocusQuestion = () => {
    if (editMode) {
      Scrowl.core.host.sendMessage({
        type: 'focus',
        field: 'question',
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

  const handleSelectAnswer = (ev) => {
    selectedAnswer.current = ev.target.value;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (
      correctAnswerText &&
      selectedAnswer.current === correctAnswerText.value
    ) {
      alert('CORRECT');
      const quizCompleted = new CustomEvent('quizCompleted', { detail: ev });
      document.dispatchEvent(quizCompleted);
      console.log('custom event', quizCompleted);
    } else {
      alert('INCORRECT');
    }
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
      notScene={disableAnimations ? true : false}
      // @ts-ignore
      stopUserAdvancement={stopUserAdvancement}
      {...props}
    >
      <div id={contentId} className="owlui-container">
        <div className={`owlui-row ${alignmentCss}`}>
          <div className={`owlui-col text__wrapper`}>
            <div className="text__container">
              <div className="progress-indictor">
                <div className="progress-bar" style={progressBarStyles}></div>
              </div>
              <div
                className={`text__value can-focus ${textFocusCss} ${alignment}`}
              >
                <h3
                  onMouseDown={handleFocusQuestion}
                  className="question__text"
                >
                  <Markdown>{question}</Markdown>
                </h3>

                <div className={`answers__container`}>
                  <form onSubmit={handleSubmit}>
                    {answers.map((answer, idx) => {
                      if (numberOfAnswers && idx < numberOfAnswers) {
                        return (
                          <div className="answer" key={idx}>
                            <input
                              type="radio"
                              id={`${contentId}-answer-${idx}`}
                              name={question}
                              value={answer.value}
                              onChange={handleSelectAnswer}
                            />
                            <label htmlFor={`${contentId}-answer-${idx}`}>
                              {answer.value}
                            </label>
                          </div>
                        );
                      }
                    })}
                    <input
                      className="owlui-btn owlui-btn-primary submit-answer"
                      type="submit"
                      value="Submit"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Scrowl.core.Template>
  );
};

export { Quiz as default };
