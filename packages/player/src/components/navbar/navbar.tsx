import React, { useState } from 'react';
import { Navbar, Offcanvas, Container, Tabs, Tab } from 'react-bootstrap';
import * as css from './_navbar.scss';

// import 'bootstrap/dist/css/bootstrap.min.css';
import { NavModule } from './nav-module';
import { NavResource } from './nav-resource';
import { NavGlossaryItem } from './nav-glossary-term';

import { Icon } from '@owlui/lib';

export const NavBar = ({ pageId, rootConfig }) => {
  const [tabKey, setTabKey] = useState('outline');

  console.log(tabKey);

  return (
    <>
      <Navbar key={'1'} bg="dark" expand={false} className="mb-3">
        <Container fluid>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${false}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
            placement="start"
          >
            <Tabs
              className={css.tabsContainer}
              activeKey={tabKey}
              // @ts-ignore
              onSelect={(k) => setTabKey(k)}
            >
              <Tab eventKey="outline" title="Outline">
                <Offcanvas.Body>
                  <div className={css.navTitleContainer}>
                    <h3 className={css.navTitle}>Welcome to Scrowl!</h3>
                    <h4 className={css.navSubtitle}>Subtitle Here</h4>
                    <span className={css.navDuration}>
                      <Icon icon="access_time" />
                      <h5>60 min</h5>
                    </span>
                  </div>
                  {rootConfig &&
                    rootConfig.map((config, mIdx) => {
                      return (
                        <div className={css.navOutline}>
                          <NavModule
                            pageId={pageId}
                            config={config}
                            mIdx={mIdx}
                          />
                          <hr />
                        </div>
                      );
                    })}
                </Offcanvas.Body>
              </Tab>
              <Tab eventKey="resources" title="Resources">
                <Offcanvas.Body>
                  <div className={css.navTitleContainer}>
                    <h3 className={css.navTitle}>Additional Resources</h3>
                    {/* @ts-ignore */}
                    {rootConfig[0].resources &&
                      rootConfig[0].resources.map((resource) => {
                        return (
                          <div className={css.navOutline}>
                            <NavResource resource={resource} />
                            <hr />
                          </div>
                        );
                      })}
                  </div>
                </Offcanvas.Body>
              </Tab>
              <Tab eventKey="glossary" title="Glossary">
                <Offcanvas.Body>
                  <div className={css.navTitleContainer}>
                    <h3 className={css.navTitle}>Glossary</h3>
                    {/* @ts-ignore */}
                    {rootConfig[0].glossary &&
                      rootConfig[0].glossary.map((item) => {
                        return (
                          <div className={css.navGlossary}>
                            <NavGlossaryItem glossaryItem={item} />
                            <hr />
                          </div>
                        );
                      })}
                  </div>
                </Offcanvas.Body>
              </Tab>
            </Tabs>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default {
  NavBar,
};
