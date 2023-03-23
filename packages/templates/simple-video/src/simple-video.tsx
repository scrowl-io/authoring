import React, { useEffect, useRef, useState } from 'react';
import './_index.scss';
import { SimpleVideoProps } from './simple-video.types';
import LazyLoad from 'react-lazyload';

const SimpleVideo = ({ id, schema, ...props }: SimpleVideoProps) => {
  const Scrowl = window['Scrowl'];
  let classes = 'template-simple-video';
  const Markdown = Scrowl.core.Markdown;
  const editMode = props.editMode ? true : false;
  const focusElement = editMode ? props.focusElement : null;
  const contentId = `${id}-simple-video`;
  const text = schema.content.text.value;
  const textFocusCss = focusElement === 'text' && 'has-focus';
  const videoAssetUrl = schema.content.videoAsset.content.assetUrl?.value;
  const videoWebUrl = schema.content.videoAsset.content.webUrl?.value;
  const bgLabel = schema.content.videoAsset.content.alt.value || '';
  const bgFocusCss = focusElement === 'videoAsset.url' && 'has-focus';
  const bgRef = useRef<HTMLDivElement>(null);
  const alignment = schema.content.options.content.alignment.value;
  const alignmentCss = alignment === 'right' ? 'right' : 'left';
  const showProgressBar = schema.content.options.content.showProgress.value;
  const showProgressRef = useRef(showProgressBar);
  const slideProgress = useRef(0);
  const [progressBarStyles, setProgressBarStyles] = useState({
    width: showProgressBar ? '0%' : '100%',
  });
  // @ts-ignore
  const [videoEnded, setVideoEnded] = useState(false);

  let videoEmbedUrl;

  if (videoWebUrl) {
    if (videoWebUrl.includes('youtube')) {
      videoEmbedUrl = videoWebUrl.replace('watch?v=', 'embed/');
    }
    if (videoWebUrl.includes('vimeo')) {
      videoEmbedUrl = videoWebUrl
        .replace('vimeo', 'player.vimeo')
        .replace('com', 'com/video');
    }
    if (videoWebUrl.includes('dailymotion')) {
      videoEmbedUrl = videoWebUrl.replace('com', 'com/embed');
    }
  }

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

  const handleFocusBg = () => {
    if (editMode) {
      Scrowl.core.host.sendMessage({
        type: 'focus',
        field: 'bgImage.url',
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

  const handleVideoEnd = (ev) => {
    const videoEnded = new CustomEvent('videoEnded', { detail: ev });
    document.dispatchEvent(videoEnded);
  };

  return (
    <Scrowl.core.Template
      id={`slide-${contentId}`}
      className={classes}
      onProgress={handleSlideProgress}
      onEnd={handleSlideEnd}
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
                className={`text__value can-focus ${textFocusCss}`}
                onMouseDown={handleFocusText}
              >
                <Markdown>{text}</Markdown>
              </div>
            </div>
          </div>
        </div>

        {(videoAssetUrl || videoWebUrl) && (
          <div
            ref={bgRef}
            className={`video__wrapper ${alignmentCss} can-focus ${bgFocusCss} ${'as-side'}`}
            onMouseDown={handleFocusBg}
          >
            {videoWebUrl && !videoAssetUrl && (
              <iframe
                width="600"
                height="337.50"
                src={videoEmbedUrl}
                title="Video player"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            )}

            {videoAssetUrl && !videoWebUrl && (
              <LazyLoad offset={250}>
                <video
                  controls
                  onEnded={handleVideoEnd}
                  className="video__container"
                  aria-label={bgLabel}
                >
                  <source src={videoAssetUrl} />
                </video>
              </LazyLoad>
            )}
          </div>
        )}
      </div>
    </Scrowl.core.Template>
  );
};

export { SimpleVideo as default };