import React, { useState, useEffect, useRef } from 'react';
import { Slide, SlideCommons } from '@scrowl/player/src/components';
import * as css from '../_canvas.scss';
import {
  useActiveSlide,
  useContentFocus,
  setContentFocus,
  resetContentFocus,
} from '../../../';
import { rq } from '../../../../../services';
import { Templates, Projects } from '../../../../../models';

export const CanvasFrame = () => {
  const data = useActiveSlide();
  let slideId: number = data.id;
  let hasSlide = slideId !== -1;
  const slideTemplate = data.template.meta.component;
  const prevslideId = useRef(-1);
  const prevSlideTemplate = useRef('');
  const prevContent = useRef(data.template.content);
  const prevControlOptions = useRef(data.template.controlOptions);

  const frameRef = useRef<HTMLIFrameElement>(null);
  const isLoaded = Projects.useInteractions().isLoaded;
  const contentFocus = useContentFocus();
  const [frameUrl, setFrameUrl] = useState('');
  const [isConnected, setConnection] = useState(false);
  const [slideOpts, setSlideOpts] = useState<SlideCommons>({
    aspect: '16:9',
  });

  const updateFrameUrl = (res: rq.ApiResult) => {
    if (res.error) {
      console.error(res.message);
      return;
    }

    setFrameUrl(res.data.url);
  };

  const sendMessage = (message) => {
    const channel = new MessageChannel();

    channel.port1.onmessage = handleFrameMessage;

    if (!frameRef.current) {
      return;
    }

    frameRef.current.contentWindow?.postMessage(message, '*', [channel.port2]);
  };

  const handleFrameMessage = (ev) => {
    if (!frameUrl) {
      return;
    }

    const frameOrigin = new URL(frameUrl).origin;

    if (ev.origin && ev.origin !== frameOrigin) {
      return;
    }

    switch (ev.data.type) {
      case 'connection':
        setConnection(true);
        sendMessage({ type: 'update', data: data.template.content });
        break;
      case 'update':
        console.log('update complete');
        break;
      case 'focus':
        setContentFocus(ev.data.field);
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('message', handleFrameMessage);

    return () => {
      window.removeEventListener('message', handleFrameMessage);
    };
  });

  useEffect(() => {
    sendMessage({ type: 'focus', field: contentFocus });
  }, [contentFocus]);

  useEffect(() => {
    if (slideId === -1 || !isLoaded) {
      return;
    }

    const hasSlideChanged = prevslideId.current !== slideId;
    const hasTemplateChanged = prevSlideTemplate.current !== slideTemplate;

    if (!hasSlideChanged && !hasTemplateChanged) {
      const hasContentChanged = data.template.content !== prevContent.current;
      const hasControlOptionsChanged =
        data.template.controlOptions !== prevControlOptions.current;

      if (hasContentChanged || hasControlOptionsChanged) {
        const channel = new MessageChannel();

        channel.port1.onmessage = handleFrameMessage;

        if (isConnected && frameRef.current) {
          frameRef.current.contentWindow?.postMessage(
            { type: 'update', data: data.template },
            '*',
            [channel.port2]
          );
          prevContent.current = data.template.content;
          prevControlOptions.current = data.template.controlOptions;
        }
      }
      return;
    }

    prevslideId.current = slideId;
    prevSlideTemplate.current = slideTemplate;
    prevContent.current = data.template.content;
    prevControlOptions.current = data.template.controlOptions;
    resetContentFocus();
    Templates.load(data.template).then(updateFrameUrl);
    return;
  }, [slideId, isConnected, data]);

  useEffect(() => {
    if (!isLoaded) {
      slideId = -1;
      prevslideId.current = -1;
      prevSlideTemplate.current = '';
      hasSlide = false;
      setConnection(false);
    }
  }, [isLoaded]);

  const connect = (ev: React.SyntheticEvent) => {
    sendMessage({ type: 'connection' });
  };

  return (
    <>
      {hasSlide && (
        <div
          style={{
            display: 'flex',
            width: 'var(--workspace-canvas-width)',
            height: 'var(--workspace-canvas-height)',
            margin: '0 auto',
            flexDirection: 'column',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              flexGrow: 1,
              position: 'relative',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box',
              }}
            >
              <iframe
                style={{
                  border: 0,
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
                id="template-iframe"
                ref={frameRef}
                onLoad={connect}
                src={frameUrl}
                title="Scrowl Editor Canvas"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default {
  CanvasFrame,
};
