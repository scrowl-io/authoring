import React from 'react';
import Scrowl from '@scrowl/template-core';
import * as css from './_index.scss';
import { TwoColumnProps } from './two-column.types';

export const TwoColumn = ({ schema, ...props }: TwoColumnProps) => {
  let classes = `${css.templateBlockText} `;
  const editMode = props.editMode ? true : false;
  const focusElement = editMode ? props.focusElement : null;
  const scrollScenes: any = React.useRef([]);
  const timeline: any = React.useRef();

  let layoutTextLeft = schema.content.leftColumn.textLeft.value;
  let layoutTextRight = schema.content.rightColumn.textRight.value;
  let layoutTextMiddle = schema.content.middleColumn?.textMiddle.value;
  let headingLeft = schema.content.leftColumn.headingLeft?.value;
  let headingRight = schema.content.rightColumn.headingRight?.value;
  let headingMiddle = schema.content.middleColumn?.headingMiddle?.value;
  let numberOfColumns = schema.content.columnOptions.numberOfColumns;

  let stackOnMobile = schema.content.columnOptions.stackOnMobile;

  let useImageAsBG = schema.content.bgImage.content.bg.value;
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

  // const handleScrollUpdate = (e: any) => {
  //   if (e.stage === 'body') {
  //     timeline.current.seek(timeline.current.duration * e.stageProgress);
  //   }
  // };

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

  const renderColumns = () => {
    return (
      <div
        className={`column-wrapper ${
          stackOnMobile && numberOfColumns === 3
            ? 'stacked-view-wide'
            : stackOnMobile && numberOfColumns === 2
            ? 'stacked-view-narrow'
            : ''
        }`}
      >
        <div className="left">
          <h2>{headingLeft}</h2>
          {/* <hr
            id={getId('bar')}
            style={{ width: showProgressBar ? '0%' : '100%' }}
          /> */}
          <p
            className={'can-focus ' + (focusElement === 'text' && ' has-focus')}
            onMouseDown={() => {
              if (editMode) {
                // Scrowl.focusOnlayout('text');
              }
            }}
          >
            <Scrowl.core.Markdown children={layoutTextLeft} />
          </p>
        </div>
        {numberOfColumns === 2 ? null : (
          <div className="middle">
            <h2>{headingMiddle}</h2>
            {/* <hr
              id={getId('bar')}
              style={{ width: showProgressBar ? '0%' : '100%' }}
            /> */}
            <p
              className={
                'can-focus ' + (focusElement === 'text' && ' has-focus')
              }
              onMouseDown={() => {
                if (editMode) {
                  // Scrowl.focusOnlayout('text');
                }
              }}
            >
              <Scrowl.core.Markdown children={layoutTextMiddle} />
            </p>
          </div>
        )}

        <div className="right">
          <h2>{headingRight}</h2>
          {/* <hr
            id={getId('bar')}
            style={{ width: showProgressBar ? '0%' : '100%' }}
          /> */}
          <p
            className={'can-focus ' + (focusElement === 'text' && ' has-focus')}
            onMouseDown={() => {
              if (editMode) {
                // Scrowl.focusOnlayout('text');
              }
            }}
          >
            <Scrowl.core.Markdown children={layoutTextRight} />
          </p>
        </div>
      </div>
    );
  };

  return (
    <Scrowl.core.Template
      {...props}
      className={classes}
      duration={slideDuration}
      onStateChange={handleStateChange}
      // onScroll={handleScrollUpdate}
      ready={true}
    >
      <div className="slide-container">
        <div
          id={getId('pinned-body')}
          className="hero"
          aria-label={useImageAsBG ? schema['bgImage.alt'] : ''}
          style={
            useImageAsBG && schema['bgImage.url']
              ? {
                  width: '100vw',
                  height: '100vh',
                  backgroundImage:
                    'url("./course/assets/' + schema['bgImage.url'] + '")',
                }
              : {}
          }
        >
          {useImageAsBG ? <div className="overlay" /> : null}

          <div className={'text ' + (alignment === 'right' ? ' right' : '')}>
            <div className="wrapper">{renderColumns()}</div>
          </div>

          {useImageAsBG ? null : (
            <div
              role="img"
              aria-label={schema['hero_image.alt']}
              className={
                'img ' +
                (alignment === 'right' ? ' right' : '') +
                ' can-focus ' +
                (focusElement === 'bgImage.url' && ' has-focus')
              }
              onMouseDown={() => {
                if (editMode) {
                  // Scrowl.focusOnlayout('bgImage.url');
                }
              }}
              style={
                schema['bgImage.url']
                  ? {
                      backgroundImage:
                        'url("./course/assets/' + schema['bgImage.url'] + '")',
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
  TwoColumn,
};
