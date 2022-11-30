import React, { useState } from 'react';
import { Navbar, Offcanvas, Container, Tabs, Tab } from 'react-bootstrap';
import * as css from './_navbar.scss';
import { NavModule } from './nav-module';
import { NavResource } from './nav-resource';
import { NavGlossaryItem } from './nav-glossary-item';

export const NavBar = ({ pageId, project }) => {
  const [tabKey, setTabKey] = useState('outline');

  return (
    <>
      <Navbar key="1" expand={false} className="mb-3">
        <Container fluid>
          <Navbar.Toggle
            className={css.navButton}
            aria-controls={`offcanvasNavbar-expand-${false}`}
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${false}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
            placement="start"
          >
            <Tabs
              className={css.tabsContainer}
              activeKey={tabKey}
              // @ts-ignore
              onSelect={(tab) => setTabKey(tab)}
            >
              <Tab eventKey="outline" title="Outline">
                <Offcanvas.Body>
                  <div className={css.titleContainer}>
                    <h3>{project.name}</h3>
                    <h4 className={css.outlineSubtitle}>Subtitle Here</h4>
                    <span className={css.outlineDuration}>
                      <span className="owlui-icons-outlined">access_time</span>
                      <h5>60 min</h5>
                    </span>
                  </div>
                  {project &&
                    project.outlineConfig.map((config, mIdx) => {
                      return (
                        <div className={css.moduleLessons}>
                          <NavModule
                            pageId={pageId}
                            config={config}
                            mIdx={mIdx}
                            key={mIdx}
                          />
                          <hr />
                        </div>
                      );
                    })}
                </Offcanvas.Body>
              </Tab>
              <Tab eventKey="resources" title="Resources">
                <Offcanvas.Body>
                  <div className={css.titleContainer}>
                    <h3>Additional Resources</h3>
                    {project.resources &&
                      project.resources.map((resource) => {
                        return (
                          <div>
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
                  <div className={css.titleContainer}>
                    <h3>Glossary</h3>
                    {project.glossary &&
                      project.glossary.map((item) => {
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
