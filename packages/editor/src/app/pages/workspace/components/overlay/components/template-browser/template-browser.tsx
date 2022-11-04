import React, { useEffect, useRef, useState } from 'react';
import { Button, Icon } from '@owlui/lib';
import * as css from './_template-browser.scss';
import { ModalOverlay } from '../modal';
import { Templates } from '../../../../../../models';

export const TemplateBrowser = ({
  isOpen,
  onClose,
  onSubmit,
  activeTemplate,
  ...props
}) => {
  const title = 'Template Browser';
  const inProgress = useRef(false);
  const [templateList, setTemplateList] = useState<
    Array<Templates.TemplateSchema>
  >([]);

  const handleSubmit = () => {
    console.log('template selected');
    onSubmit();
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
    <ModalOverlay title={title} isOpen={isOpen} onClose={onClose}>
      <div className={css.templateBrowserContainer}>
        {templateList.map((template, idx) => {
          console.log('template.meta', template.meta);
          const isActive = activeTemplate.component !== template.meta.component;
          return (
            <button
              id={`template-${template.meta.component}`}
              key={idx}
              className={`${css.templateBrowserItem}${
                isActive ? ' active' : ''
              }`}
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
                    display="rounded"
                    filled={true}
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
        <Button variant="link" onClick={onClose}>
          Close
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Select Template
        </Button>
      </footer>
    </ModalOverlay>
  );
};

export default {
  TemplateBrowser,
};
