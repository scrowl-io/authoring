import React, { useState } from 'react';
import { Button, Icon } from '@owlui/lib';
import { Collapse } from 'react-bootstrap';
import { OutlineModulesProps, OutlineModuleItemProps } from './outline.types';
import * as css from '../../_pane-details.scss';
import { OutlineLessons } from './outline-lessons';
import { Projects } from '../../../../../../models';

export const OutlineModuleItem = ({
  module,
  moduleIdx,
  className,
  ...props
}: OutlineModuleItemProps) => {
  let classes = `${css.outlineHeader} `;
  const [isOpen, setOpen] = useState(true);
  const menuId = `module-menu-${moduleIdx}`;

  if (className) {
    classes += `${className} `;
  }

  const handleToggleOpen = () => {
    setOpen(!isOpen);
  };

  return (
    <div className={css.outlineModule} {...props}>
      <div className={classes}>
        <Button
          aria-expanded={isOpen}
          aria-controls={menuId}
          className={css.outlineItem}
          onClick={handleToggleOpen}
          variant="link"
        >
          <div className={css.outlineItemModuleIcons}>
            <span className={css.outlineItemIconHandle}>
              <Icon
                icon="arrow_drop_down"
                display="outlined"
                filled
                style={{ fontSize: '1.375rem' }}
              />
            </span>
            <span className={css.outlineItemIconDetail}>
              <Icon
                icon="folder"
                display="sharp"
                filled={!isOpen}
                grad={200}
                opsz={20}
              />
            </span>
            <span className={css.outlineItemLabel}>{module.name}</span>
          </div>
        </Button>
      </div>
      <Collapse in={isOpen}>
        <div>
          <OutlineLessons id={menuId} moduleIdx={moduleIdx} />
        </div>
      </Collapse>
    </div>
  );
};

export const OutlineModules = ({ ...props }: OutlineModulesProps) => {
  const modules = Projects.useModules();

  return (
    <div {...props}>
      {modules.map((module, idx) => {
        return <OutlineModuleItem key={idx} module={module} moduleIdx={idx} />;
      })}
    </div>
  );
};

export default {
  OutlineModules,
  OutlineModuleItem,
};
