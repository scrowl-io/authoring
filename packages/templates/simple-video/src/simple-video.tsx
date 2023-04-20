import React, { useEffect, useRef, useState } from 'react';
import './_index.scss';
import { SimpleVideoProps } from './simple-video.types';
import LazyLoad from 'react-lazyload';
import YouTube from 'react-youtube';
import Vimeo from 'react-vimeo';
import Dailymotion from 'react-dailymotion';

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
  const disableAnimations = schema.controlOptions.disableAnimations?.value;
  const stopUserAdvancement = schema.controlOptions.stopUserAdvancement.value;
  const showProgressBar = disableAnimations
    ? false
    : schema.content.options.content.showProgress.value;
  const showProgressRef = useRef(showProgressBar);
  const slideProgress = useRef(0);
  const [progressBarStyles, setProgressBarStyles] = useState({
    width: showProgressBar ? '0%' : '100%',
  });
  // @ts-ignore
  const [videoEnded, setVideoEnded] = useState(false);
  // const [player, setPlayer] = useState(null);
  const videoService = useRef('');

  let videoId;

  if (videoWebUrl) {
    if (videoWebUrl.includes('youtube.com')) {
      videoService.current = 'youtube';
      videoId = videoWebUrl.replace('https://www.youtube.com/watch?v=', '');
    }
    if (videoWebUrl.includes('vimeo.com')) {
      videoService.current = 'vimeo';
      videoId = videoWebUrl.replace('https://vimeo.com/', '');
    }
    if (videoWebUrl.includes('dailymotion.com')) {
      videoService.current = 'dailymotion';
      videoId = videoWebUrl.replace('https://www.dailymotion.com/video/', '');
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
    if (disableAnimations) {
      return;
    }
    slideProgress.current = ev.progress;

    if (showProgressRef.current) {
      setProgressBarStyles({
        ...progressBarStyles,
        width: `${ev.progress}%`,
      });
    }
  };

  const handleSlideEnd = () => {
    if (disableAnimations) {
      return;
    }
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
    console.log('custom event', videoEnded);
  };

  const onEnd = (ev) => {
    console.log('finished');
    handleVideoEnd(ev);
  };

  // const onStateChange = (ev) => {
  //   switch (ev.data) {
  //     case 0:

  //       handleVideoEnd();
  //   }
  //   console.log('changed', ev);
  // };

  const onPause = (ev) => {
    console.log('PAUSED', ev);
    if (videoService.current === 'vimeo') {
      if (ev.data.duration === ev.data.seconds) {
        console.log('finished');
        handleVideoEnd(ev);
      }
    }
  };

  // @ts-ignore
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      // autoplay: 1,
    },
  };

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
              <div>
                {videoId && videoService.current === 'youtube' && (
                  <YouTube videoId={videoId} onPause={onPause} onEnd={onEnd} />
                )}
                {videoId && videoService.current === 'dailymotion' && (
                  <Dailymotion
                    onEnd={onEnd}
                    video={videoId}
                    autoplay={false}
                    showQueue={false}
                    autoplayQueue={false}
                  />
                )}
                {videoId && videoService.current === 'vimeo' && (
                  <Vimeo
                    className="vimeo-player"
                    autoplay={true}
                    videoId={videoId}
                    onEnd={onEnd}
                    paused
                    loop={false}
                    onPause={onPause}
                  />
                )}
              </div>
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
