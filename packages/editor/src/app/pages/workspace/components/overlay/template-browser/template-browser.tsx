import React, { useEffect, useRef, useState } from 'react';
import { ui, IconType } from '@scrowl/ui';
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
  const project = Projects.useData();

  const handelClose = () => {
    if (newContent.newSlide) {
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
    } else if (project.type === 'assessment') {
      const filteredList = res.data.templates.filter((temp) => {
        return temp.meta.filename === 'quiz';
      });
      setTemplateList(filteredList);
    } else {
      setTemplateList(res.data.templates);
    }

    inProgress.current = false;
  };

  useEffect(() => {
    if (!inProgress.current) {
      Templates.get().then(updateTemplateList);
    }
  }, [inProgress, project.type]);

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

  useEffect(() => {
    if (selectedTemplate.meta.component === '') {
      setSelectedTemplate(activeTemplate);
    }
    const queryString = activeTemplate.meta.component
      ? `#template-${activeTemplate.meta.component}`
      : '#template-BlockText';

    const templateButton = document.querySelector(queryString);

    (templateButton as HTMLElement)?.focus();
  }, [isOpen]);

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
            const isSelected =
              selectedTemplate.meta.component === template.meta.component;
            const icon = template.meta.icon as IconType;

            return (
              <ui.Button
                type="button"
                id={`template-${template.meta.component}`}
                key={idx}
                className={`${css.templateBrowserItem}
                ${isSelected ? ' selected' : ''}`}
                onClick={() => {
                  setSelectedTemplate(template);
                }}
              >
                {icon && (
                  <span className={css.templateBrowserItemBg}>
                    <ui.Icon
                      icon={icon}
                      display="sharp"
                      filled={true}
                      grad={200}
                      opsz={20}
                    />
                  </span>
                )}
                <span className={css.templateBrowserItemType}>
                  <ui.Icon
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
                {isSelected && (
                  <span className={css.templateBrowserItemActive}>
                    <ui.Icon
                      icon="check_circle"
                      display="outlined"
                      grad={200}
                      opsz={20}
                    />
                  </span>
                )}
              </ui.Button>
            );
          })}
        </div>
      </div>
      <footer className="d-flex justify-content-end">
        {!newContent.newSlide && (
          <ui.Button variant="link" onClick={handelClose}>
            Cancel
          </ui.Button>
        )}
        <ui.Button variant="success" onClick={handleSubmit}>
          Select Template
        </ui.Button>
      </footer>
    </Modal>
  );
};

export default {
  TemplateBrowser,
};
