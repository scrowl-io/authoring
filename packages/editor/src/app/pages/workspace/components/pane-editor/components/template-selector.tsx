import React from 'react';
import { ui } from '@scrowl/ui';
import * as css from '../_pane-editor.scss';
import {
  useActiveTemplate,
  openTemplateBrowser,
} from '../../../page-workspace-hooks';

export const TemplateSelector = () => {
  const templateMeta = useActiveTemplate('meta');
  const hasTemplate = templateMeta.component;

  const handleOpen = () => {
    openTemplateBrowser();
  };

  return (
    <div className={css.slideEditorHeader}>
      <span className={css.slideEditorHeaderIcon}>
        <ui.Icon icon="dashboard" display="sharp" filled={true} opsz={20} />
      </span>
      <div>
        <div className={css.slideEditorHeaderTitle}>
          {hasTemplate ? templateMeta.label : 'No Selection'}
        </div>
        <ui.Button
          className={css.slideEditorHeaderAction}
          variant="link"
          disabled={!hasTemplate}
          onClick={handleOpen}
        >
          Change Template
        </ui.Button>
      </div>
    </div>
  );
};

export default {
  TemplateSelector,
};
