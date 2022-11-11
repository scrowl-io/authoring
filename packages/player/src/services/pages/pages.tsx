import React, { useRef } from 'react';
import { PageDefinition, PageProps } from './pages.types';
import {
  PlayerRootConfig,
  PlayerTemplateList,
  TemplateComponent,
} from '../../root';
import { Error } from '../../components';

const Page = ({ slides, templates, ...props }: PageProps) => {
  const controller = useRef(new window.Scrowl.core.scroll.Controller());

  return (
    <div>
      {slides.map((slide, idx) => {
        const id = `${props.id}--slide-${idx}`;
        const component = slide.template.meta.component;

        if (!templates.hasOwnProperty(component)) {
          return <Error msg={`Unabled to find template: ${component}`} />;
        }

        const Template = templates[component] as TemplateComponent;

        return (
          <Template
            key={idx}
            id={id}
            schema={slide.template}
            controller={controller.current}
            duration={0}
          />
        );
      })}
    </div>
  );
};

export const create = (
  rootConfig: Array<PlayerRootConfig>,
  templateList: PlayerTemplateList
) => {
  const data: Array<PageDefinition> = [];

  rootConfig.forEach((config, mIdx) => {
    config.lessons.forEach((page, lIdx) => {
      const id = `module-${mIdx}--lesson-${lIdx}`;
      const url = `/${id}`;

      data.push({
        module: config.module,
        lesson: page.lesson,
        url,
        Element: () => {
          return <Page id={id} slides={page.slides} templates={templateList} />;
        },
      });
    });
  });

  return data;
};

export default {
  create,
};
