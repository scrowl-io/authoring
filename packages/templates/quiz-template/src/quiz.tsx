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
  const question = schema.content.question.value;
  const answers = schema.content.answers;
  const textFocusCss = focusElement === 'text' && 'has-focus';
  const alignment = schema.content.options.content.alignment.value;
  const alignmentCss = alignment === 'right' ? 'right' : 'left';
  const disableAnimations = schema.controlOptions.disableAnimations?.value;
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
      notScene={disableAnimations ? true : false}
      {...props}
    >
      <div id={contentId} className="owlui-container">
        <div className={`owlui-row owlui-row-cols-2 ${alignmentCss}`}>
          <div className={`owlui-col text__wrapper`}>
            <div className="text__container">
              <div className="progress-indictor">
                <div className="progress-bar" style={progressBarStyles}></div>
              </div>
              <div
                className={`text__value can-focus ${textFocusCss}`}
                onMouseDown={handleFocusText}
              >
                <Markdown>{question}</Markdown>
                {answers.map((answer, idx) => {
                  return (
                    <div key={idx}>
                      <p>{answer.value}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Scrowl.core.Template>
  );
};

export { Quiz as default };
