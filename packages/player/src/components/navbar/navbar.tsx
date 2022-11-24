import React from 'react';
// @ts-ignore
import { Navbar, Offcanvas, Container, Collapse } from 'react-bootstrap';
// @ts-ignore
import { Button, Icon } from '@owlui/lib';
import * as css from './_navbar.scss';

import 'bootstrap/dist/css/bootstrap.min.css';
import { NavModule } from './nav-module';

export const NavBar = ({ pageId, rootConfig }) => {
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
                    <NavModule
                      pageId={pageId}
                      rootConfig={rootConfig}
                      module={module}
                      mIdx={mIdx}
                    />

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
