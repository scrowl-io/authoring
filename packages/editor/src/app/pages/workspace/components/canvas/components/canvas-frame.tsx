import React, { useState, useEffect, useRef } from 'react';
import { Slide, SlideCommons } from '@scrowl/player/src/components';
import * as css from '../_canvas.scss';
import { useActiveSlide } from '../../../';
import { rq } from '../../../../../services';
import { Templates } from '../../../../../models';

export const CanvasFrame = () => {
  const data = useActiveSlide();
  const slideIdx = data.slideIdx;
  const slideTemplate = data.template.meta.component;
  const prevSlideIdx = useRef(-1);
  const prevSlideTemplate = useRef('');
  const [frameUrl, setFrameUrl] = useState('');
  const [slideOpts, setSlideOpts] = useState<SlideCommons>({
    aspect: '16:9',
  });

  const updateFrameUrl = (res: rq.ApiResult) => {
    if (res && res.error) {
      console.error(res.message);
      return;
    }

    if (res && res.data && res.data.url) {
      setFrameUrl(res.data.url);
    }
  };

  useEffect(() => {
    if (slideIdx === -1) {
      return;
    }

    const hasSlideChanged = prevSlideIdx.current !== slideIdx;
    const hasTemplateChanged = prevSlideTemplate.current !== slideTemplate;

    if (!hasSlideChanged && !hasTemplateChanged) {
      return;
    }

    prevSlideIdx.current = slideIdx;
    prevSlideTemplate.current = slideTemplate;
    Templates.load(slideTemplate).then(updateFrameUrl);
  }, [slideIdx]);

  if (slideIdx === -1) {
    return <></>;
  }

  return (
    <div className={css.canvasBody}>
      <Slide options={slideOpts} className="aspect-ratio aspect-ratio--16x9">
        <iframe
          src={frameUrl}
          title="Scrowl Editor Canvas"
          referrerPolicy="unsafe-url"
          sandbox="allow-same-origin allow-scripts"
          height="100%"
          width="100%"
          id="template-iframe"
        ></iframe>
      </Slide>
    </div>
  );
};

export default {
  CanvasFrame,
};
