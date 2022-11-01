import React from 'react';
import { Tabs } from '@owlui/lib';
import { useActiveTemplate } from '../../';
import { Pane } from '../../../../components';
import { Settings } from '../../../../models';
import { Content } from './components';

export const PaneEditor = () => {
  const data = useActiveTemplate();
  const animationSettings = Settings.useAnimation();
  const isAnimated = !animationSettings.reducedAnimations;
  const animationDelay = animationSettings.animationDelay;
  const animationOpts = {
    initial: !isAnimated
      ? {}
      : {
          boxShadow: '30px 0 0px 0 var(--owl-sidebar-bg)',
          transform: 'translate(350px ,0px)',
        },
    animate: !isAnimated
      ? {}
      : {
          marginBottom: '0px',
          transform: 'translate(0px,0px)',
          transition: {
            marginBottom: { delay: animationDelay, duration: 0.4 },
            transform: { delay: animationDelay },
          },
          transitionEnd: { boxShadow: '' },
        },
  };
  const tabs = [
    {
      id: 'tab-content',
      title: 'Content',
      view: <Content />,
    },
  ];

  if (!data.meta.filename) {
    return <></>;
  }

  return (
    <Pane
      initial={animationOpts.initial}
      animate={animationOpts.animate}
      side="right"
    >
      <Tabs items={tabs} pxScale="Sm" transition={false} />
    </Pane>
  );
};

export default {
  PaneEditor,
};
