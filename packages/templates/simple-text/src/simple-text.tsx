import React, { useCallback, useRef } from 'react';
import './_index.scss';
import { SimpleTextProps } from './simple-text.types';
import LazyLoad from 'react-lazyload';

const SimpleText = ({ id, schema, ...props }: SimpleTextProps) => {
  const Scrowl = window['Scrowl'];
  let classes = `template-simple-text`;
  const Markdown = Scrowl.core.Markdown;
  const Anime = Scrowl.core.anime;
  const textAnimation = useRef<any>();
  const editMode = props.editMode ? true : false;
  const focusElement = editMode ? props.focusElement : null;
  const contentId = `${id}-simple-text`;
  const text = schema.content.text.value;
  const textFocusCss = focusElement === 'text' && 'has-focus';
  const textStyles = {
    transform: 'translateX(100%)',
    opacity: '0',
  };
  const textAnimiationDuration = 120;
  const disableAnimations = schema.controlOptions.disableAnimations?.value;
  const animations = disableAnimations
    ? 'none'
    : schema.content.animateLists.value;
  const bgUrl = schema.content.bgImage.content.url.value;
  const bgLabel = schema.content.bgImage.content.alt.value || '';
  const bgFocusCss = focusElement === 'bgImage.url' && 'has-focus';
  const bgRef = useRef<HTMLDivElement>(null);
  //@ts-ignore
  const bgStyles = {
    backgroundImage: `url("${bgUrl}")`,
  };
  const alignment = schema.content.options.content.alignment.value;
  const alignmentCss = alignment;

  switch (animations) {
    case 'none':
      textStyles.transform = 'translateX(0%)';
      textStyles.opacity = '1';
      break;
  }

  const textRef = useCallback((node) => {
    const createAnimation = () => {
      if (disableAnimations) {
        return;
      }
      if (!node || !node.childNodes) {
        return;
      }

      const initialTextStyles = Object.keys(textStyles);
      const nodeList: Array<HTMLElement> = [];

      node.childNodes.forEach((child) => {
        const node = child as HTMLElement;

        if (!node || !node.style) {
          return;
        }

        initialTextStyles.forEach((prop) => {
          node.style[prop] = textStyles[prop];
        });

        nodeList.push(node);
      });

      switch (animations) {
        case 'all':
          textAnimation.current = Anime({
            targets: nodeList,
            autoplay: false,
            easing: 'easeInOutQuad',
            opacity: '1',
            translateX: '0',
            duration: textAnimiationDuration,
          });
          break;
        case 'none':
          if (textAnimation) {
            textAnimation.current.remove(nodeList);
          }
          break;
      }
    };

    createAnimation();
  }, []);

  const handleFocusText = () => {
    if (editMode) {
      Scrowl.core.host.sendMessage({
        type: 'focus',
        field: 'text',
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

  const handleSlideProgress = (ev) => {
    const updateTextAnimation = () => {
      if (animations === 'none') {
        return;
      }

      if (textAnimation.current && ev.scene.progress >= 0) {
        const seekValue =
          textAnimiationDuration * 2 * (ev.scene.progress / 100);

        textAnimation.current.seek(seekValue);
      }
    };

    updateTextAnimation();
  };

  return (
    <Scrowl.core.Template
      id={`slide-${contentId}`}
      className={classes}
      onProgress={handleSlideProgress}
      notScene={disableAnimations ? true : false}
      {...props}
    >
      <div id={contentId} className="owlui-container">
        {(bgUrl || editMode) && (
          <div
            ref={bgRef}
            className={`img__wrapper ${alignmentCss} can-focus ${bgFocusCss} as-bg`}
            onMouseDown={handleFocusBg}
          >
            <LazyLoad>
              <img
                className="img__container"
                aria-label={bgLabel}
                src={bgUrl}
                // style={bgStyles}
              />
            </LazyLoad>
          </div>
        )}
        <div className="owlui-row owlui-row-cols-1">
          <div className="owlui-col">
            {bgUrl && <div className="overlay" />}

            <div className={`text__wrapper ${alignmentCss}`}>
              <div
                ref={textRef}
                className={`text__container can-focus ${textFocusCss}`}
                onMouseDown={handleFocusText}
              >
                <Markdown>{text}</Markdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Scrowl.core.Template>
  );
};;;;

export { SimpleText as default };