import React, { useState } from 'react';
// @ts-ignore
import { Navbar, Offcanvas, Container, Collapse } from 'react-bootstrap';
// @ts-ignore
import { Button, Icon } from '@owlui/lib';

import { Link } from 'react-router-dom';
// @ts-ignore
import * as css from './_navbar.scss';

import 'bootstrap/dist/css/bootstrap.min.css';

export const NavBar = ({ pageId, rootConfig }) => {
  // @ts-ignore
  const [isOpen, setOpen] = useState(true);
  const currentSlide = pageId;

  const handleToggleOpen = (ev) => {
    ev.preventDefault();
    setOpen(!isOpen);
  };

  return (
    <>
      <Navbar key={'1'} bg="light" expand={false} className="mb-3">
        <Container fluid>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${false}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
                Outline
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {rootConfig.map((config, mIdx) => {
                const module = config.module;

                return (
                  <div className={css.navOutline}>
                    <span
                      className={css.moduleButton}
                      onClick={handleToggleOpen}
                    >
                      <Icon icon="chevron_right" />
                      <h5>{module.name}</h5>
                    </span>
                    <Collapse in={isOpen}>
                      <ul className={css.lessonList}>
                        {config.lessons.map((lesson, lIdx) => {
                          const id = `module-${mIdx}--lesson-${lIdx}`;
                          const url = `/${id}`;
                          const lessonName = lesson.lesson.name;

                          return (
                            <li className={css.lessonListItem} key={lIdx}>
                              <span className={css.lessonButton}>
                                <Icon
                                  className={
                                    id === currentSlide
                                      ? 'lesson-icon-active'
                                      : css.lessonIcon
                                  }
                                  icon="arrow_drop_down_circle"
                                />
                                <Link
                                  className={
                                    id === currentSlide
                                      ? 'lesson-link-active'
                                      : css.lessonLink
                                  }
                                  to={url}
                                >
                                  {lessonName}
                                </Link>
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </Collapse>
                    <hr />
                  </div>
                );
              })}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default {
  NavBar,
};
