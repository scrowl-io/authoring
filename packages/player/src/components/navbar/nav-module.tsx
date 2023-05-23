import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import utils from '../../utils';
import * as _css from './_navbar.scss';

const css = utils.css.removeMapPrefix(_css);

export const NavModule = ({ pageId, config, mIdx }) => {
  const Scrowl = window['Scrowl'];
  const currentSlide = pageId;

  let moduleSlides: Array<string> = [];

  config.lessons.forEach((lesson, _i) => {
    const slide = `module-${mIdx}--lesson-${lesson.lesson.id}`;
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
      <div className={css.moduleButton} onClick={handleToggleOpen}>
        <Scrowl.ui.Icon
          icon="chevron_right"
          display="outlined"
          className={isOpen ? css.iconExpanded : css.icon}
        />
        <h5
          className={
            // @ts-ignore
            moduleSlides.includes(pageId)
              ? css.moduleNameActive
              : isOpen
              ? css.moduleNameExpanded
              : css.moduleName
          }
        >
          {config.module.name}
        </h5>
      </div>
      <Collapse in={isOpen}>
        <ul className={css.lessonList}>
          {config.lessons.map((lesson, lIdx) => {
            const id = `module-${mIdx}--lesson-${lesson.lesson.id}`;
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
                    <p
                      className={`${
                        id === currentSlide
                          ? css.lessonLinkActive
                          : css.lessonLink
                      }`}
                    >
                      {lessonName}
                    </p>
                  </span>
                </Link>
              </li>
            );
          })}
          {isOpen ? <hr /> : ''}
        </ul>
      </Collapse>
    </div>
  );
};

export default {
  NavModule,
};
