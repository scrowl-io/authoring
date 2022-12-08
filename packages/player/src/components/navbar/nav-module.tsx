import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import utils from '../../utils';
import * as _css from './_navbar.scss';

const css = utils.css.removeMapPrefix(_css);
const Scrowl = window['Scrowl'];

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
        <Scrowl.ui.Icon
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
                <Link to={url}>
                  <span className={css.lessonButton}>
                    <Scrowl.ui.Icon
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
