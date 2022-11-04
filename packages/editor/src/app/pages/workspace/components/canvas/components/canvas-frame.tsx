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
import { Templates } from '../../../../../models';

export const CanvasFrame = () => {
  const data = useActiveSlide();
  const slideIdx: number = data.slideIdx;
  const hasSlide = slideIdx !== -1;
  const slideTemplate = data.template.meta.component;
  const prevSlideIdx = useRef(-1);
  const prevSlideTemplate = useRef('');
  const prevContent = useRef(data.template.content);
  const frameRef = useRef<HTMLIFrameElement>(null);
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
    if (slideIdx === -1) {
      return;
    }

    const hasSlideChanged = prevSlideIdx.current !== slideIdx;
    const hasTemplateChanged = prevSlideTemplate.current !== slideTemplate;

    if (!hasSlideChanged && !hasTemplateChanged) {
      const hasContentChanged = data.template.content !== prevContent.current;

      if (hasContentChanged) {
        const channel = new MessageChannel();

        channel.port1.onmessage = handleFrameMessage;

        if (isConnected && frameRef.current) {
          frameRef.current.contentWindow?.postMessage(
            { type: 'update', data: data.template.content },
            '*',
            [channel.port2]
          );
          prevContent.current = data.template.content;
        }
      }
      return;
    }

    prevSlideIdx.current = slideIdx;
    prevSlideTemplate.current = slideTemplate;
    prevContent.current = data.template.content;
    resetContentFocus();
    Templates.load(data.template).then(updateFrameUrl);
    return;
  }, [slideIdx, isConnected, data]);

  const connect = (ev: React.SyntheticEvent) => {
    sendMessage({ type: 'connection' });
  };

  return (
    <>
      {hasSlide && (
        <div className={css.canvasBody}>
          <Slide
            options={slideOpts}
            className="aspect-ratio aspect-ratio--16x9"
          >
            <iframe
              id="template-iframe"
              ref={frameRef}
              onLoad={connect}
              src={frameUrl}
              title="Scrowl Editor Canvas"
            ></iframe>
          </Slide>
        </div>
      )}
    </>
  );
};

export default {
  CanvasFrame,
};
