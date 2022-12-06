import React, { useEffect, useRef, useState } from 'react';
import { Button, Icon } from '@owlui/lib';
import * as css from './_template-browser.scss';
import { Modal } from '../../../../../components';
import { Projects, Templates } from '../../../../../models';
import {
  useTemplateBrowser,
  openTemplateBrowser,
  closeTemplateBrowser,
  useNewContent,
  resetNewContent,
  useActiveSlide,
  setActiveSlide,
  resetActiveSlide,
} from '../../../page-workspace-hooks';

export const TemplateBrowser = () => {
  const title = 'Template Browser';
  const inProgress = useRef(false);
  const [templateList, setTemplateList] = useState<
    Array<Templates.TemplateSchema>
  >([]);
  const activeSlide = useActiveSlide();
  const activeTemplate = activeSlide.template;
  const activeSlideRef = useRef(activeSlide);
  const isOpen = useTemplateBrowser();
  const [selectedTemplate, setSelectedTemplate] = useState(activeTemplate);
  const newContent = useNewContent();
  const latestSlide = Projects.useLatestSlide();

  const handelClose = () => {
    if (newContent.newSlide) {
      setActiveSlide(activeSlideRef.current);
      setSelectedTemplate(activeSlideRef.current.template);
      Projects.removeSlide(latestSlide);
      resetNewContent();
    }

    closeTemplateBrowser();
  };

  const handleSubmit = () => {
    if (!newContent.newSlide) {
      setActiveSlide({
        template: selectedTemplate,
      });
      Projects.setSlide({
        ...activeSlide,
        template: selectedTemplate,
      });
    } else {
      setActiveSlide({
        ...latestSlide,
        template: selectedTemplate,
      });
      resetNewContent();
      Projects.setSlide({
        ...latestSlide,
        template: selectedTemplate,
      });
    }

    closeTemplateBrowser();
  };

  const updateTemplateList = (res) => {
    if (res.error) {
      console.error(res);
    } else {
      setTemplateList(res.data.templates);
    }

    inProgress.current = false;
  };

  useEffect(() => {
    if (!inProgress.current) {
      Templates.get().then(updateTemplateList);
    }
  }, [inProgress]);

  useEffect(() => {
    if (selectedTemplate.meta.component && !activeTemplate.meta.component) {
      return;
    }

    setSelectedTemplate(activeTemplate);
    activeSlideRef.current = activeSlide;
  }, [activeTemplate]);

  useEffect(() => {
    if (newContent.newSlide) {
      if (!newContent.newLesson && !newContent.newModule) {
        openTemplateBrowser();
        setSelectedTemplate(templateList[0]);
        resetActiveSlide();
      } else {
        const newSlide = {
          ...latestSlide,
          template: templateList[0],
        };
        setActiveSlide(newSlide);
        resetNewContent();
        Projects.setSlide(newSlide);
      }
    }
  }, [newContent.newSlide]);

  return (
    <Modal
      className="modal-template-browser"
      title={title}
      isOpen={isOpen}
      onClose={handelClose}
    >
      <div className={css.templateBrowserContainer}>
        <div className={css.templateBrowserContent}>
          {templateList.map((template, idx) => {
            const isActive =
              activeTemplate.meta.component === template.meta.component;
            const isSelected =
              selectedTemplate.meta.component === template.meta.component;

            return (
              <button
                type="button"
                id={`template-${template.meta.component}`}
                key={idx}
                className={`${css.templateBrowserItem}${
                  isActive ? ' active' : ''
                }${isSelected ? ' selected' : ''}`}
                onClick={() => {
                  setSelectedTemplate(template);
                }}
              >
                {template.meta.icon && (
                  <span className={css.templateBrowserItemBg}>
                    <Icon
                      icon={template.meta.icon}
                      display="sharp"
                      filled={true}
                      grad={200}
                      opsz={20}
                    />
                  </span>
                )}
                <span className={css.templateBrowserItemType}>
                  <Icon
                    icon="dashboard"
                    display="sharp"
                    filled={true}
                    grad={200}
                    opsz={20}
                  />
                </span>
                <label htmlFor={`template-${template.meta.component}`}>
                  <span>{template.meta.label}</span>
                  <small>{`v${template.meta.version}`}</small>
                </label>
                {isActive && (
                  <span className={css.templateBrowserItemActive}>
                    <Icon
                      icon="check_circle"
                      display="outlined"
                      grad={200}
                      opsz={20}
                    />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      <footer className="d-flex justify-content-end">
        {!newContent.newSlide && (
          <Button variant="link" onClick={handelClose}>
            Cancel
          </Button>
        )}
        <Button variant="success" onClick={handleSubmit}>
          Select Template
        </Button>
      </footer>
    </Modal>
  );
};

export default {
  TemplateBrowser,
};
