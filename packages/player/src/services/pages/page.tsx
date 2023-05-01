import React, { useState, useEffect, useRef } from 'react';
import { PageProps } from './pages.types';
import { LessonAttempt, TemplateComponent } from '../../root/root.types';
import { Error } from '../../components';

export const Page = ({
  slides,
  templates,
  slideId,
  lesson,
  ...props
}: PageProps) => {
  const Scrowl = window['Scrowl'];
  const [hasStartedCourse, setHasStartedCourse] = useState(true);
  const attempt = useRef(0);

  if (
    Scrowl &&
    Scrowl.runtime &&
    Scrowl.runtime.API !== null &&
    hasStartedCourse !== false
  ) {
    const [_courseStartError, suspendData] = Scrowl.runtime.getSuspendData();

    const parsedData = JSON.parse(suspendData);

    if (
      // @ts-ignore
      !Object.entries(parsedData).length > 0 ||
      (parsedData &&
        parsedData.courseStarted &&
        parsedData.courseStarted !== true)
    ) {
      setHasStartedCourse(false);
    }
  }

  const timeStamp = new Date();
  timeStamp.toLocaleString();
  timeStamp.toLocaleDateString();
  timeStamp.toLocaleTimeString();

  const attempts: Array<LessonAttempt> = [
    {
      started_at: timeStamp,
      finished_at: '',
      questions: [],
    },
  ];

  const questions: Array<any> = [];

  slides.forEach((slide) => {
    if (slide.template.meta.component === 'Quiz') {
      const question: any = {};
      const answers: Array<string> = [];
      //@ts-ignore
      slide.template.content.answers.content.forEach((answer) => {
        answers.push(answer.value);
      });
      question.id = `${props.id}--slide-${slide.id}-${slide.template.meta.filename}`;
      question.correct = false;
      question.question =
        // @ts-ignore
        slide.template.content.question.content.question.value;
      question.answers = answers;

      questions.push(question);
    }
  });

  attempts[attempt.current].questions = questions;

  lesson.attempts = attempts;

  const controller = new Scrowl.core.scroll.Controller();

  let currentSlide = `module-${slides[0].moduleId}--lesson-${slides[0].lessonId}--slide-${slides[0].id}-${slides[0].template.meta.filename}`;
  let currentIndex = 0;

  const targets = slides?.map((slide) => {
    return `module-${slide.moduleId}--lesson-${slide.lessonId}--slide-${slide.id}-${slide.template.meta.filename}`;
  });

  const handleArrowKeys = (ev) => {
    if (Scrowl && Scrowl.runtime) {
      if (Scrowl.runtime.API !== null) {
        const [error, suspendData] = Scrowl.runtime.getSuspendData();
        if (suspendData === '{}') {
          return;
        } else {
          const parsedData = JSON.parse(suspendData);
          if (error || !parsedData.courseStarted) {
            return;
          }
        }
      }
    }

    let matchingId;

    if (targets && currentSlide !== 'owlui-last') {
      matchingId = targets.find((t) => {
        return t === currentSlide;
      });
    } else {
      currentIndex = targets.length;
    }

    if (matchingId) {
      currentIndex = targets?.indexOf(matchingId);
    }

    let targetID;
    let targetElement;

    switch (ev.key) {
      case 'ArrowLeft':
        if (currentIndex === 0) {
          return;
        }
        if (currentIndex === 1) {
          targetID = targets[0];
          targetElement = document.querySelector(`#${targetID}`);
          currentIndex = 0;
          currentSlide = `module-${slides[0].moduleId}--lesson-${slides[0].lessonId}--slide-${slides[0].id}-${slides[0].template.meta.filename}`;
          setTimeout(() => {
            targetElement?.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'start',
            });
          }, 0);
        } else {
          targetID = targets[currentIndex - 1];
          targetElement = document.querySelector(`#${targetID}`);

          if (
            slides[currentIndex - 1].template.controlOptions.disableAnimations
              .value === true
          ) {
            setTimeout(() => {
              targetElement?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'start',
              });
            }, 0);
          } else {
            setTimeout(() => {
              targetElement?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'start',
              });
            }, 0);
          }
        }
        break;
      case 'ArrowRight':
        if (currentIndex === targets.length) {
          return;
        }
        if (currentIndex + 1 === targets.length) {
          targetElement = document.querySelector('.owlui-last');
          setTimeout(() => {
            targetElement?.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'start',
            });
          }, 0);
          currentSlide = 'owlui-last';
        } else {
          targetID = targets[currentIndex + 1];
          targetElement = document.querySelector(`#${targetID}`);

          const currentSlideElement = document.querySelector(
            `#${targets[currentIndex]}`
          );

          let scrollMagicPin;

          if (
            slides[currentIndex].template.controlOptions.disableAnimations
              .value === false
          ) {
            scrollMagicPin = currentSlideElement?.parentElement?.parentElement;
          }

          // if (
          //   slides[currentIndex].template.controlOptions.stopUserAdvancement
          //     .value === true
          // ) {
          //   return;
          // }

          if (
            slides[currentIndex + 1].template.controlOptions.disableAnimations
              .value === true &&
            slides[currentIndex].template.controlOptions.disableAnimations
              .value === false
          ) {
            const pinHeight = scrollMagicPin.style.minHeight;
            const adjustedMargin = Math.abs(parseInt(pinHeight) / 2) * -1;

            scrollMagicPin.style.marginBottom = `${adjustedMargin.toString()}px`;

            setTimeout(() => {
              targetElement?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'start',
              });
            }, 0);
          } else {
            setTimeout(() => {
              targetElement?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'start',
              });
            }, 0);
          }
        }
        break;
    }

    const currentSlideObj = {
      currentIndex: currentIndex,
      currentSlide: currentSlide,
    };

    const currentSlideEvent = new CustomEvent('CurrentSlidePageUpdate', {
      detail: currentSlideObj,
    });
    document.dispatchEvent(currentSlideEvent);
  };

  useEffect(() => {
    const handleSlideEvent = (ev) => {
      currentSlide = ev.detail.currentTarget.id;
    };
    const handleUpdateSlideEvent = (ev) => {
      currentSlide = ev.detail.currentSlide;
    };

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        handleArrowKeys(e);
      }
    });

    document.addEventListener('CurrentSlideNavUpdate', handleUpdateSlideEvent);
    document.addEventListener('slide.enter', handleSlideEvent);

    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8,
    };

    const slidesObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting === true) {
          currentSlide = entry.target.id;

          const currentSlideObj = {
            currentIndex: currentIndex,
            currentSlide: currentSlide,
          };

          const currentSlideEvent = new CustomEvent('CurrentSlidePageUpdate', {
            detail: currentSlideObj,
          });
          document.dispatchEvent(currentSlideEvent);
        }
      });
    });

    const finalSlideObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting === true) {
          currentSlide = 'owlui-last';
        }
      });
    }, options);

    let lastSlide = document.querySelector('.owlui-last');
    if (lastSlide) {
      finalSlideObserver.observe(lastSlide);
    }

    let targetElements;

    setTimeout(() => {
      targetElements = targets.map((target) => {
        return document.querySelector(`#${target}`);
      });

      targetElements.forEach((element) => {
        if (element) {
          slidesObserver.observe(element);
        }
      });
    }, 500);
  }, [slides, hasStartedCourse]);

  useEffect(() => {
    if (slideId && slideId?.length > 0) {
      document.querySelector(`#${slideId}`)?.scrollIntoView();
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [slides]);

  useEffect(() => {
    return () => {
      controller.destroy(true);
    };
  });

  useEffect(() => {
    const handleSubmitQuizAnswer = (_ev) => {
      const updateOutro = new CustomEvent('updateOutro', {
        detail: _ev.detail,
      });
      document.dispatchEvent(updateOutro);
    };

    document.addEventListener('quizCompleted', handleSubmitQuizAnswer);
  }, []);

  useEffect(() => {
    const handleResetQuiz = (_ev) => {
      const resetQuestions: Array<any> = [];
      const timeStamp = new Date();
      timeStamp.toLocaleString();
      timeStamp.toLocaleDateString();
      timeStamp.toLocaleTimeString();

      if (lesson.attempts) {
        lesson.attempts[attempt.current].questions = _ev.detail;
      }

      const newAttempt = {
        started_at: timeStamp,
        finished_at: '',
        questions: [] as any,
      };
      if (lesson.attempts) {
        lesson.attempts[attempt.current].finished_at = timeStamp;
      }

      slides.forEach((slide) => {
        if (slide.template.meta.component === 'Quiz') {
          const question: any = {};
          const answers: Array<string> = [];
          //@ts-ignore
          slide.template.content.answers.content.forEach((answer) => {
            answers.push(answer.value);
          });
          question.id = `${props.id}--slide-${slide.id}-${slide.template.meta.filename}`;
          question.correct = false;
          question.question =
            // @ts-ignore
            slide.template.content.question.content.question.value;
          question.answers = answers;

          resetQuestions.push(question);

          newAttempt.questions = resetQuestions;
        }
      });

      var ele: any = document.querySelectorAll('input[type=radio]');
      ele.forEach((el) => {
        el.checked = false;
      });

      lesson.attempts?.push(newAttempt);
      attempt.current++;
      console.log('reset lesson attempts: ', lesson);

      ele[0].scrollIntoView(false);
    };

    document.addEventListener('resetQuiz', handleResetQuiz);
  }, []);

  useEffect(() => {
    const handleCourseStart = (_ev) => {
      setHasStartedCourse(true);
    };

    document.addEventListener('startCourse', handleCourseStart);
  }, []);

  if (!hasStartedCourse) {
    const id = `${props.id}--slide-${slides[0].id}`;
    const component = slides[0].template.meta.component;
    const Template = templates[component] as TemplateComponent;

    return (
      <Template
        key={1}
        id={id}
        schema={slides[0].template}
        controller={controller}
        slides={slides[0]}
      />
    );
  } else {
    return (
      <>
        {slides.map((slide, idx) => {
          const id = `${props.id}--slide-${slide.id}`;
          const component = slide.template.meta.component;

          if (!templates.hasOwnProperty(component)) {
            return <Error msg={`Unabled to find template: ${component}`} />;
          }

          const Template = templates[component] as TemplateComponent;

          if (component === 'Quiz' || component === 'LessonOutro') {
            return (
              <Template
                key={idx}
                id={id}
                schema={slide.template}
                controller={controller}
                slides={slides}
                lesson={lesson}
                attempt={attempt}
              />
            );
          }

          return (
            <Template
              key={idx}
              id={id}
              schema={slide.template}
              controller={controller}
              slides={slides}
            />
          );
        })}
      </>
    );
  }
};

export default {
  Page,
};
