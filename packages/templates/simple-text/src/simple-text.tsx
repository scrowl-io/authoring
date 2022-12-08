import React, { useEffect, useRef } from 'react';
import './_index.scss';
import { SimpleTextProps } from './simple-text.types';

export const SimpleText = ({ id, schema, ...props }: SimpleTextProps) => {
  const Scrowl = window['Scrowl'];
  let classes = `template-simple-text`;
  const Markdown = Scrowl.core.Markdown;
  const Anime = Scrowl.core.anime;
  const textAnimation = useRef<any>();
  const editMode = props.editMode ? true : false;
  const focusElement = editMode ? props.focusElement : null;
  const contentId = `${id}-block-text`;
  const text = schema.content.text.value;
  const textFocusCss = focusElement === 'text' && 'has-focus';
  const textRef = useRef<HTMLDivElement>(null);
  const textStyles = {
    transform: 'translateX(100%)',
    opacity: '0',
  };
  const textAnimiationDuration = 120;
  const animations = schema.content.animateLists.value;
  const bgUrl = schema.content.bgImage.content.url.value;
  const bgLabel = schema.content.bgImage.content.alt.value || '';
  const bgFocusCss = focusElement === 'bgImage.url' && 'has-focus';
  const bgRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const createAnimation = () => {
      if (!textRef.current || !textRef.current.childNodes) {
        return;
      }

      const initialTextStyles = Object.keys(textStyles);
      const nodeList: Array<HTMLElement> = [];

      textRef.current.childNodes.forEach((child) => {
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
  }, [textRef.current, animations]);

  return (
    <Scrowl.core.Template
      id={`slide-${contentId}`}
      className={classes}
      onProgress={handleSlideProgress}
      {...props}
    >
      <div id={contentId}>
        {(bgUrl || editMode) && (
          <div
            ref={bgRef}
            className={`img__wrapper ${alignmentCss} can-focus ${bgFocusCss} as-bg`}
            onMouseDown={handleFocusBg}
          >
            <img
              className="img__container"
              aria-label={bgLabel}
              style={bgStyles}
            />
          </div>
        )}
        <div className="owlui-row owlui-row-cols-1">
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
    </Scrowl.core.Template>
  );
};

export default {
  SimpleText,
};
