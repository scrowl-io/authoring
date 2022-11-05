import React from 'react';
import Scrowl from '@scrowl/template-core';
import * as css from './_index.scss';
import { LessonIntroProps } from './lesson-intro.types';

export const LessonIntro = ({ schema, ...props }: LessonIntroProps) => {
  let classes = `${css.templateBlockText} `;
  const editMode = props.editMode ? true : false;
  const focusElement = editMode ? props.focusElement : null;
  const scrollScenes: any = React.useRef([]);
  const timeline: any = React.useRef();

  let lessonTitle = schema.content.lessonTitle.value;
  let lessonSubtitle = schema.content.lessonSubtitle.value;
  let lessonTime = schema.content.lessonTime.value;
  let startLabel = schema.content.startLabel.value;

  let useImageAsBG = schema.content.heroImage.content.bg.value;
  let alignment = schema.content.options.content.alignment.value;
  let showProgressBar = schema.content.options.content.showProgress.value;
  const slideDuration = showProgressBar ? 1000 : 0;

  if (showProgressBar) {
    classes += ' show-progress';
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function getId(id?: String) {
    if (!id) {
      return props.id;
    }
    return props.id + '-' + id;
  }

  const handleScrollUpdate = (e: any) => {
    if (e.stage === 'body') {
      timeline.current.seek(timeline.current.duration * e.stageProgress);
    }
  };

  const handleStateChange = (e: any) => {
    if (e.state === 'visible') {
      scrollScenes.current.map((scene: any) => scene.enabled(true));
    } else {
      scrollScenes.current.map((scene: any) => scene.enabled(false));
    }
  };

  React.useEffect(() => {
    if (!showProgressBar) {
      return () => {};
    }

    scrollScenes.current.push(
      new Scrowl.core.scroll.Scene({
        triggerElement: '#' + getId(),
        duration: slideDuration,
        offset: 0,
        triggerHook: 0,
      })
        .setPin('#' + getId('pinned-body'), { pushFollowers: false })
        .addTo(props.controller)
        .enabled(false)
    );

    timeline.current = Scrowl.core.anime.timeline({
      easing: 'easeInOutQuad',
      autoplay: false,
    });
    const currentTimeline = timeline.current;
    const target = {
      targets: '#' + getId('bar'),
      width: '100%',
      duration: slideDuration,
    };

    currentTimeline.add(target);

    return () => {
      scrollScenes.current.forEach((scene) => {
        scene.destroy(true);
        props.controller.removeScene(scene);
      });

      scrollScenes.current = [];

      currentTimeline.children.map((child: any) => {
        child.remove(target);
        child.reset();
        currentTimeline.remove(child);
      });

      currentTimeline.reset();
    };
  }, [showProgressBar]);

  return (
    <Scrowl.core.Template
      {...props}
      className={classes}
      duration={slideDuration}
      onStateChange={handleStateChange}
      onScroll={handleScrollUpdate}
      ready={true}
    >
      <div className="slide-container">
        <div
          id={getId('pinned-body')}
          className="hero"
          aria-label={
            useImageAsBG ? schema.content.heroImage.content.alt.value : ''
          }
          style={
            useImageAsBG && schema.content.heroImage.content.url.value
              ? {
                  width: '100vw',
                  height: '100vh',
                  backgroundImage:
                    'url("./assets/' +
                    schema.content.heroImage.content.url.value +
                    '")',
                }
              : {}
          }
        >
          {useImageAsBG ? <div className="overlay" /> : null}

          <div className={'text ' + (alignment === 'right' ? ' right' : '')}>
            <div className="wrapper">
              <h1
                className={
                  'can-focus ' + (focusElement === 'text' && ' has-focus')
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
                {lessonTitle}
              </h1>
              <h2
                className={
                  'can-focus ' + (focusElement === 'text' && ' has-focus')
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
                {lessonSubtitle}
              </h2>
              <p
                className={
                  'can-focus ' + (focusElement === 'text' && ' has-focus')
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
                {lessonTime}
              </p>
              <a
                href="#"
                className={
                  'can-focus ' + (focusElement === 'text' && ' has-focus')
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
                {startLabel}
              </a>
            </div>
          </div>

          {useImageAsBG ? null : (
            <div
              role="img"
              aria-label={schema.content.heroImage.content.alt.value}
              className={
                'img ' +
                (alignment === 'right' ? ' right' : '') +
                ' can-focus ' +
                (focusElement === 'bgImage.url' && ' has-focus')
              }
              onMouseDown={() => {
                if (editMode) {
                  Scrowl.core.host.sendMessage({
                    type: 'focus',
                    field: 'bgImage.url',
                  });
                }
              }}
              style={
                schema.content.heroImage.content.url.value
                  ? {
                      backgroundImage:
                        'url("./assets/' +
                        schema.content.heroImage.content.url.value +
                        '")',
                    }
                  : {}
              }
            />
          )}
        </div>
      </div>
    </Scrowl.core.Template>
  );
};

export default {
  LessonIntro,
};
