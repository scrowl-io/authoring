import React, { useState } from 'react';
import { Button, Icon } from '@owlui/lib';
import * as css from '../_pane-editor.scss';
import { useActiveTemplate } from '../../../page-workspace-hooks';
import { TemplateBrowser } from '../../overlay';

export const TemplateSelector = () => {
  const templateMeta = useActiveTemplate('meta');
  const hasTemplate = templateMeta.component;
  const [isOpenTemplateBrowser, setIsOpenTemplateBrowser] = useState(false);

  const handleTemplateBrowserClose = () => {
    setIsOpenTemplateBrowser(false);
  };

  const handleTemplateBrowserOpen = () => {
    setIsOpenTemplateBrowser(true);
  };

  const handleTemplateBrowserSubmit = () => {
    console.log('template selected');
  };

  return (
    <div className={css.slideEditorHeader}>
      <span className={css.slideEditorHeaderIcon}>
        <Icon icon="dashboard" display="sharp" filled={true} opsz={20} />
      </span>
      <div>
        <div className={css.slideEditorHeaderTitle}>
          {hasTemplate ? templateMeta.label : 'No Selection'}
        </div>
        <Button
          className={css.slideEditorHeaderAction}
          variant="link"
          disabled={!hasTemplate}
          onClick={handleTemplateBrowserOpen}
        >
          Change Template
        </Button>
      </div>
      <TemplateBrowser
        isOpen={isOpenTemplateBrowser}
        onClose={handleTemplateBrowserClose}
        onSubmit={handleTemplateBrowserSubmit}
      />
    </div>
  );
};

export default {
  TemplateSelector,
};
