import React from 'react';
import { Button, Icon } from '@owlui/lib';
import * as css from '../_pane-editor.scss';
import {
  useActiveTemplate,
  openTemplateBrowser,
} from '../../../page-workspace-hooks';

export const TemplateSelector = () => {
  const templateMeta = useActiveTemplate('meta');
  const hasTemplate = templateMeta.component;

  const handleOpen = () => {
    console.log('opening template browser');
    openTemplateBrowser();
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
          onClick={handleOpen}
        >
          Change Template
        </Button>
      </div>
    </div>
  );
};

export default {
  TemplateSelector,
};
