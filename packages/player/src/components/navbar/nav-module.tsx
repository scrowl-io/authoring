import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { Icon } from '@owlui/lib';
import { Link } from 'react-router-dom';
import * as css from './_navbar.scss';

import 'bootstrap/dist/css/bootstrap.min.css';

export const NavModule = ({ pageId, config, mIdx }) => {
  const currentSlide = pageId;

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
    <div className={css.navOutline}>
      <span className={css.moduleButton} onClick={handleToggleOpen}>
        <Icon
          className={`${isOpen ? 'icon-expanded' : 'icon'}`}
          icon="chevron_right"
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
                <Link to={url}>
                  <span className={css.lessonButton}>
                    <Icon
                      className={
                        id === currentSlide
                          ? css.lessonIconActive
                          : css.lessonIcon
                      }
                      icon="arrow_drop_down_circle"
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
