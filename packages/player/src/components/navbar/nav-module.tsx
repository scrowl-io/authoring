import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { Icon } from '@owlui/lib';
import { Link } from 'react-router-dom';
import * as css from './_navbar.scss';

import 'bootstrap/dist/css/bootstrap.min.css';

export const NavModule = ({ pageId, config, mIdx, completedLessons }) => {
  const currentSlide = pageId;
  const runtime = window['Scrowl'].runtime;

  let moduleSlides: Array<string> = [];

  config.lessons.forEach((_lesson, i) => {
    const slide = `module-${mIdx}--lesson-${i}`;
    moduleSlides.push(slide);
  });

  //@ts-ignore
  const [isOpen, setOpen] = moduleSlides.includes(pageId)
    ? useState(true)
    : useState(false);

  const handleToggleOpen = (ev) => {
    ev.preventDefault();
    // @ts-ignore
    if (!moduleSlides.includes(pageId)) {
      setOpen(!isOpen);
    }
  };

  return (
    <div>
      <span className={css.moduleButton} onClick={handleToggleOpen}>
        <Icon
          icon="chevron_right"
          display="outlined"
          className={isOpen ? 'icon-expanded' : 'icon'}
        />
        <h5>{config.module.name}</h5>
      </span>
      <Collapse in={isOpen}>
        <ul className={css.lessonList}>
          {config.lessons.map((lesson, lIdx) => {
            const id = `module-${mIdx}--lesson-${lIdx}`;
            const url = `/${id}`;
            const lessonName = lesson.lesson.name;

            return (
              <li key={lIdx}>
                <Link
                  to={
                    !runtime
                      ? url
                      : completedLessons.includes(lesson)
                      ? url
                      : ''
                  }
                >
                  <span className={css.lessonButton}>
                    <Icon
                      icon="arrow_drop_down_circle"
                      display="outlined"
                      className={
                        id === currentSlide
                          ? css.lessonIconActive
                          : css.lessonIcon
                      }
                    />
                    <span
                      className={`${
                        id === currentSlide
                          ? css.lessonLinkActive
                          : css.lessonLink
                      }`}
                    >
                      {lessonName}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Collapse>
    </div>
  );
};

export default {
  NavModule,
};
