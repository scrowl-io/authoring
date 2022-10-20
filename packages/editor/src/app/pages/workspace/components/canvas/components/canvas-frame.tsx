import React, { useState } from 'react';
import { Slide, SlideCommons } from '@scrowl/player/src/components';
import * as css from '../_canvas.scss';
import { useActiveTemplate } from '../../../';

export const CanvasFrame = () => {
  const data = useActiveTemplate('meta');
  const [frameUrl, setFrameUrl] = useState('');
  const [slideOpts, setSlideOpts] = useState<SlideCommons>({
    aspect: '16:9',
  });

  if (!data.filename) {
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
