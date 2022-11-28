import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
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
    <div>
      <span className={css.moduleButton} onClick={handleToggleOpen}>
        <span
          className={`owlui-icons-outlined ${
            isOpen ? 'icon-expanded' : 'icon'
          }`}
        >
          chevron_right
        </span>
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
                    <span
                      className={`owlui-icons-outlined
                        ${
                          id === currentSlide
                            ? css.lessonIconActive
                            : css.lessonIcon
                        }
                      `}
                    >
                      arrow_drop_down_circle
                    </span>
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
