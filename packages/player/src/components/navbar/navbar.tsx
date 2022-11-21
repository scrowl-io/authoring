import React from 'react';
import { Navbar, Offcanvas, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export const NavBar = ({ rootConfig }) => {
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
                  <div className="nav-outline">
                    <h5>{module.name}</h5>
                    <ul>
                      {config.lessons.map((lesson, lIdx) => {
                        const id = `module-${mIdx}--lesson-${lIdx}`;
                        const url = `/${id}`;
                        const lessonName = lesson.lesson.name;

                        return (
                          <li key={lIdx}>
                            <Link to={url}>{lessonName}</Link>
                          </li>
                        );
                      })}
                    </ul>
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
