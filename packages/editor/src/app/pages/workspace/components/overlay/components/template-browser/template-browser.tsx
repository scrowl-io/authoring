import React, { useEffect, useRef, useState } from 'react';
import { Button, Icon } from '@owlui/lib';
import * as css from './_template-browser.scss';
import { Modal } from '../modal';
import { Templates } from '../../../../../../models';
import {
  useActiveTemplate,
  useTemplateBrowser,
  closeTemplateBrowser,
} from '../../../../page-workspace-hooks';

export const TemplateBrowser = () => {
  const title = 'Template Browser';
  const inProgress = useRef(false);
  const [templateList, setTemplateList] = useState<
    Array<Templates.TemplateSchema>
  >([]);
  const activeTemplate = useActiveTemplate();
  const isOpen = useTemplateBrowser();
  const [selectedTemplate, setSelectedTemplate] = useState({
    meta: activeTemplate,
  });

  const handelClose = () => {
    closeTemplateBrowser();
  };

  const handleSubmit = () => {
    console.log('template selected');
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

  return (
    <Modal
      className="modal-template-browser"
      title={title}
      isOpen={isOpen}
      onClose={handelClose}
    >
      <div className={css.templateBrowserContainer}>
        {templateList.map((template, idx) => {
          const isActive = activeTemplate.component === template.meta.component;
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
      <footer className="d-flex justify-content-end">
        <Button variant="link" onClick={handelClose}>
          Cancel
        </Button>
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
