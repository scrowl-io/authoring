import React from 'react';
import { Navbar, Offcanvas, Container } from 'react-bootstrap';
import * as css from './_navbar.scss';

import 'bootstrap/dist/css/bootstrap.min.css';
import { NavModule } from './nav-module';
import { Icon } from '@owlui/lib';

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
              <div className={css.navTitleContainer}>
                <h3 className={css.navTitle}>Welcome to Scrowl!</h3>
                <h4 className={css.navSubtitle}>Subtitle Here</h4>
                <span className={css.navDuration}>
                  <Icon icon="access_time" />
                  <h5>60 min</h5>
                </span>
              </div>
              {rootConfig.map((config, mIdx) => {
                return (
                  <div className={css.navOutline}>
                    <NavModule pageId={pageId} config={config} mIdx={mIdx} />
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
