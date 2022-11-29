import React from 'react';
import Scrowl from '@scrowl/template-core';
import * as css from './_index.scss';
import { SimpleTextProps } from './simple-text.types';

export const SimpleText = ({ schema, ...props }: SimpleTextProps) => {
  let classes = `${css.templateSimpleText} `;
  const editMode = props.editMode ? true : false;
  const focusElement = editMode ? props.focusElement : null;
  const scrollScenes: any = React.useRef([]);
  const timeline: any = React.useRef();

  let schemaText = schema.content.text.value;
  let useImageAsBG = schema.content.bgImage.content.bg.value;
  let alignment = schema.content.options.content.alignment.value;
  let animateLists = schema.content.animateLists?.value;
  const slideDuration = animateLists ? 2000 : 0;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function getId(id?: String) {
    if (!id) {
      return props.id;
    }
    return props.id + '-' + id;
  }

  React.useEffect(() => {
    if (!animateLists) {
      return;
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

    let selectors: any = [];

    switch (animateLists) {
      case 'all':
        selectors.push('#' + getId('pinned-body') + ' li');
        selectors.push('#' + getId('pinned-body') + ' p');
        selectors.push('#' + getId('pinned-body') + ' hr');
        selectors.push('#' + getId('pinned-body') + ' blockquote');
        break;
    }

    if (!selectors.length) {
      return;
    }

    const listItems: any = (document as any).querySelectorAll(
      selectors.join(', ')
    );

    if (!listItems) {
      return;
    }

    timeline.current = Scrowl.core.anime.timeline({
      easing: 'easeInOutQuad',
      autoplay: false,
    });
    const currentTimeline = timeline.current;

    [...listItems].map((item: any) => {
      item.style.opacity = 0;
      item.style.transform = 'translateX(200px)';
      const target = {
        targets: item,
        opacity: '1',
        translateX: '0',
        duration: 50,
      };

      currentTimeline.add(target);

      return null as any;
    });

    const target = {
      duration: 100,
    };

    currentTimeline.add(target);

    const frozenListItems = selectors.join(', ');
    return () => {
      currentTimeline.children.map((child: any) => {
        child.remove();
        child.reset();
        currentTimeline.remove(child);
      });
      currentTimeline.reset();

      const listItems: any = (document as any).querySelectorAll(
        frozenListItems
      );
      [...listItems].map((item: any) => {
        item.style.opacity = 1;
        item.style.transform = '';
        return null;
      });
    };
  }, [animateLists]);

  return (
    <Scrowl.core.Template
      {...props}
      className={classes}
      duration={slideDuration}
    >
      <div className="slide-container">
        <div
          id={getId('pinned-body')}
          className="hero"
          aria-label={
            useImageAsBG ? schema.content.bgImage.content.alt.value : ''
          }
          style={
            useImageAsBG && schema.content.bgImage.content.url.value
              ? {
                  width: '100vw',
                  height: '100vh',
                  backgroundImage:
                    'url("./assets/' +
                    schema.content.bgImage.content.url.value +
                    '")',
                }
              : {}
          }
        >
          {useImageAsBG ? <div className="overlay" /> : null}

          <div
            className={
              'text ' +
              (alignment === 'right'
                ? 'right'
                : alignment === 'left'
                ? 'left'
                : alignment === 'center'
                ? 'center'
                : alignment === 'justify'
                ? 'justify'
                : '')
            }
          >
            <div className="wrapper">
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
                <Scrowl.core.Markdown children={schemaText} />
              </p>
            </div>
          </div>

          {useImageAsBG ? null : (
            <div
              role="img"
              aria-label={schema.content.bgImage.content.alt.value}
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
                schema.content.bgImage.content.url.value
                  ? {
                      backgroundImage:
                        'url("./assets/' +
                        schema.content.bgImage.content.url.value +
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
  SimpleText,
};
