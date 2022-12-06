import React, { useState, useEffect } from 'react';
import { Navbar, Offcanvas, Container, Tabs, Tab } from 'react-bootstrap';
import { Icon } from '@owlui/lib';
import * as css from './_navbar.scss';
import { NavModule } from './nav-module';
import { NavResource } from './nav-resource';
import { NavGlossaryItem } from './nav-glossary-item';

export const NavBar = ({ pageId, project }) => {
  const [tabKey, setTabKey] = useState('outline');

  let totalLessons = 0;

  project.outlineConfig.forEach((module) => {
    module.lessons.forEach((_lesson) => {
      totalLessons++;
    });
  });

  const getScormProgress = () => {
    const runtime = window['Scrowl'].runtime;
    const progress = runtime?.getProgress();
    return progress;
  };
  // @ts-ignore
  const [scormProgress, setScormProgress] = useState(getScormProgress());

  useEffect(() => {
    const savedProgress = getScormProgress;
    if (savedProgress !== undefined) {
      // @ts-ignore
      setScormProgress(savedProgress);
    }
  }, [pageId]);

  // @ts-ignore
  // const getCurrentProgress = (project, pageId) => {
  //   let lessonsArray: { index: number; targetId: string }[] = [];
  //   let counter = 0;
  //   project.outlineConfig.forEach((module, mIdx) => {
  //     module.lessons.forEach((_lesson, lIdx) => {
  //       const lessonObj = {
  //         index: counter,
  //         targetId: `module-${mIdx}--lesson-${lIdx}`,
  //       };
  //       counter++;
  //       lessonsArray.push(lessonObj);
  //     });
  //   });

  //   const currentSlide = lessonsArray.find((lesson) => {
  //     return lesson.targetId === pageId;
  //   });

  //   const currentSlideIndex = currentSlide?.index;
  //   const totalLessons = lessonsArray.length;

  //   let percentageCompleted;

  //   if (currentSlideIndex) {
  //     percentageCompleted = currentSlideIndex / totalLessons;
  //   }

  //   return percentageCompleted;
  // };

  // @ts-ignore
  const completedLessons = [];

  project.outlineConfig.forEach((module) => {
    module.lessons.forEach((lesson) => {
      if (
        scormProgress &&
        (lesson.lesson.id + 1) / totalLessons <= scormProgress
      ) {
        // @ts-ignore
        completedLessons.push(lesson);
      }
    });
  });

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
              <Tab eventKey="outline" key="outline" title="Outline">
                <Offcanvas.Body>
                  <div className={css.titleContainer}>
                    <h3>{project.name}</h3>
                    <h4 className={css.outlineSubtitle}>Subtitle Here</h4>
                    <span className={css.outlineDuration}>
                      <Icon icon="access_time" display="outlined" />
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
                            completedLessons={completedLessons}
                          />
                          <hr />
                        </div>
                      );
                    })}
                </Offcanvas.Body>
              </Tab>
              <Tab eventKey="resources" key="resources" title="Resources">
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
              <Tab eventKey="glossary" key="glossary" title="Glossary">
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
