// @ts-ignore
import React, { useEffect, useState } from 'react';
import {
  ThemeProvider,
  Navbar,
  Offcanvas,
  Container,
  Tabs,
  Tab,
} from 'react-bootstrap';
import utils, { CssMapProps } from '../../utils';
import * as _css from './_navbar.scss';
import { NavModule } from './nav-module';
import { NavResource } from './nav-resource';
import { NavGlossaryItem } from './nav-glossary-item';

const css = utils.css.removeMapPrefix(_css);

export const NavBar = ({ pageId, project, slides }) => {
  const Scrowl = window['Scrowl'];
  const [tabKey, setTabKey] = useState('outline');
  const themePrefixes: CssMapProps = {};

  themePrefixes['nav'] = `owlui-nav`;
  themePrefixes['nav-tabs'] = `owlui-nav-tabs`;
  themePrefixes['nav-item'] = `owlui-nav-item`;
  themePrefixes['nav-link'] = `owlui-nav-link`;
  themePrefixes['navbar'] = `owlui-navbar`;
  themePrefixes['navbar-toggler'] = `owlui-navbar-toggler`;
  themePrefixes['tab-pane'] = `owlui-tab-pane`;
  themePrefixes['tab-content'] = `owlui-tab-content`;
  themePrefixes['offcanvas'] = `owlui-offcanvas`;
  themePrefixes['offcanvas-body'] = `owlui-offcanvas-body`;
  themePrefixes['container'] = `owlui-container`;

  let currentSlide = `module-${slides[0].moduleId}--lesson-${slides[0].lessonId}--slide-${slides[0].id}-${slides[0].template.meta.filename}`;
  let currentIndex = 0;

  const OutlineFooter = () => {
    const targets = slides?.map((slide) => {
      return `module-${slide.moduleId}--lesson-${slide.lessonId}--slide-${slide.id}-${slide.template.meta.filename}`;
    });

    const scrollSlide = (ev) => {
      if (Scrowl && Scrowl.runtime) {
        if (Scrowl.runtime.API !== null) {
          const [error, suspendData] = Scrowl.runtime.getSuspendData();
          if (suspendData === '{}') {
            return;
          } else {
            const parsedData = JSON.parse(suspendData);
            if (error || !parsedData.courseStarted) {
              return;
            }
          }
        }
      }

      let matchingId;
      if (targets && currentSlide !== 'owlui-last') {
        matchingId = targets.find((t) => {
          return t === currentSlide;
        });
      } else {
        currentIndex = targets.length;
      }

      if (matchingId) {
        currentIndex = targets?.indexOf(matchingId);
      }

      let targetIndex;
      let targetElement;

      switch (ev.target.innerText) {
        case 'Previous Slide':
          if (currentIndex === 1) {
            targetIndex = targets[0];
            targetElement = document.querySelector(`#${targetIndex}`);
            currentIndex = 0;
            currentSlide = `module-${slides[0].moduleId}--lesson-${slides[0].lessonId}--slide-${slides[0].id}-${slides[0].template.meta.filename}`;
            setTimeout(() => {
              targetElement?.scrollIntoView(false);
            }, 0);
          } else {
            targetIndex = targets[currentIndex - 1];
            targetElement = document.querySelector(`#${targetIndex}`);
            targetElement?.scrollIntoView(false);
          }
          break;
        case 'Next Slide':
          if (currentIndex + 1 === targets.length) {
            targetElement = document.querySelector('.owlui-last');
            targetElement?.scrollIntoView();
            currentSlide = 'owlui-last';
          } else {
            targetIndex = targets[currentIndex + 1];
            targetElement = document.querySelector(`#${targetIndex}`);
            targetElement?.scrollIntoView();
          }
          break;
      }

      const currentSlideObj = {
        currentIndex: currentIndex,
        currentSlide: currentSlide,
      };

      const currentSlideEvent = new CustomEvent('CurrentSlideNavUpdate', {
        detail: currentSlideObj,
      });
      document.dispatchEvent(currentSlideEvent);
    };

    return (
      <div className={css.outlineFooter}>
        <div className={css.buttonContainer}>
          <button onClick={scrollSlide}>Previous Slide</button>
          <button onClick={scrollSlide}>Next Slide</button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const handleSlideEvent = (ev) => {
      currentSlide = ev.detail.currentTarget.id;
    };
    const handleUpdateSlideEvent = (ev) => {
      currentSlide = ev.detail.currentSlide;
    };
    document.addEventListener('CurrentSlidePageUpdate', handleUpdateSlideEvent);
    document.addEventListener('slide.enter', handleSlideEvent);

    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8,
    };

    let introObserver = new IntersectionObserver(() => {
      currentSlide = 'module-0--lesson-0--slide-0-lesson-intro';
    }, options);

    let finalSlideObserver = new IntersectionObserver(() => {
      currentSlide = 'owlui-last';
    }, options);

    let introSlide = document.querySelector(
      '#module-0--lesson-0--slide-0-lesson-intro'
    );

    let lastSlide = document.querySelector('.owlui-last');

    if (introSlide) {
      introObserver.observe(introSlide);
    }
    if (lastSlide) {
      finalSlideObserver.observe(lastSlide);
    }
  }, []);


  return (
    <ThemeProvider prefixes={themePrefixes}>
      <Navbar key="1" expand={false} expanded={true} className="mb-3">
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
                <Offcanvas.Body className={css.outlineOffcanvas}>
                  <div className={css.titleContainer}>
                    <h3>{project.name}</h3>
                    <h4 className={css.outlineSubtitle}>{project.subtitle}</h4>
                    <span className={css.outlineDuration}>
                      <Scrowl.ui.Icon icon="schedule" display="outlined" />
                      <h5>60 min</h5>
                    </span>
                  </div>
                  {project &&
                    project.outlineConfig.map((config, mIdx) => {
                      return (
                        <div className={css.moduleLessons} key={mIdx}>
                          <NavModule
                            pageId={pageId}
                            config={config}
                            mIdx={mIdx}
                            key={mIdx}
                          />
                        </div>
                      );
                    })}
                </Offcanvas.Body>
                <OutlineFooter />
              </Tab>
              <Tab eventKey="resources" key="resources" title="Resources">
                <Offcanvas.Body>
                  <div className={css.titleContainer}>
                    <h3>Additional Resources</h3>
                    {project.resources &&
                      project.resources.map((resource, idx) => {
                        return (
                          <div key={idx}>
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
                      project.glossary.map((item, idx) => {
                        return (
                          <div className={css.navGlossary} key={idx}>
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
    </ThemeProvider>
  );
};

export default {
  NavBar,
};
