import React, { useEffect, useRef, useState } from 'react';
import { ui, IconType } from '@scrowl/ui';
import * as css from './_module-editor.scss';
import { Modal } from '../../../../../components';
import { Projects, Templates } from '../../../../../models';
import {
  openTemplateBrowser,
  closeTemplateBrowser,
  useNewContent,
  resetNewContent,
  useActiveSlide,
  setActiveSlide,
  resetActiveSlide,
  useModuleEditor,
  closeModuleEditor,
} from '../../../page-workspace-hooks';

export const ModuleEditor = () => {
  const title = 'Edit Module';
  const inProgress = useRef(false);
  const [templateList, setTemplateList] = useState<
    Array<Templates.TemplateSchema>
  >([]);
  const activeSlide = useActiveSlide();
  const activeTemplate = activeSlide.template;
  const activeSlideRef = useRef(activeSlide);
  const isOpen = useModuleEditor();
  const [selectedTemplate, setSelectedTemplate] = useState(activeTemplate);
  const newContent = useNewContent();
  const latestSlide = Projects.useLatestSlide();

  const handelClose = () => {
    if (newContent.newSlide) {
      Projects.removeSlide(latestSlide);
      resetNewContent();
    }

    closeModuleEditor();
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
        <div className={css.templateBrowserContent}></div>
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
  ModuleEditor,
};
