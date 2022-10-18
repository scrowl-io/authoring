import React, { useState } from 'react';
import { Button, Icon } from '@owlui/lib';
import { Collapse } from 'react-bootstrap';
import { OutlineModulesProps, OutlineModuleItemProps } from './outline.types';
import * as css from '../../_pane-details.scss';
import { OutlineLessons } from './outline-lessons';
import { Projects } from '../../../../../../models';
import { Elem } from '../../../../../../utils';
import { menu } from '../../../../../../services';

export const OutlineModuleItem = ({
  module,
  moduleIdx,
  className,
  ...props
}: OutlineModuleItemProps) => {
  let classes = `${css.outlineHeader} `;
  const [isOpen, setOpen] = useState(true);
  const menuId = `module-menu-${moduleIdx}`;
  const moduleMenuItems: Array<menu.ContextMenuItem> = [
    {
      label: 'Add Lesson',
      click: () => {
        console.log('add lesson');
      },
    },
    {
      label: 'Duplicate Module',
      click: () => {
        console.log('duplicate module');
      },
    },
    {
      label: 'Add New Module After',
      click: () => {
        console.log('add module after');
      },
    },
    { type: 'separator' },
    {
      label: 'Rename',
      click: () => {
        console.log('rename module');
      },
    },
    { type: 'separator' },
    {
      label: 'Delete Module',
      click: () => {
        console.log('remove module');
      },
    },
  ];

  if (className) {
    classes += `${className} `;
  }

  const handleToggleOpen = (ev: React.MouseEvent) => {
    ev.preventDefault();
    setOpen(!isOpen);
  };

  const handleOpenModuleMenu = (ev: React.MouseEvent) => {
    ev.preventDefault();

    const target = ev.target as HTMLElement;
    const position = Elem.getPosition(target);

    menu.API.contextMenu(moduleMenuItems, position).then((result) => {
      console.log('menu close', result);
      target.blur();
    });
  };

  return (
    <div className={css.outlineModule} {...props}>
      <div className={classes}>
        <Button
          aria-expanded={isOpen}
          aria-controls={menuId}
          className={css.outlineItem}
          onClick={handleToggleOpen}
          onContextMenu={handleOpenModuleMenu}
          variant="link"
        >
          <div className={css.moduleIcons}>
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
        <Button
          className={css.actionMenu}
          variant="ghost"
          onClick={handleOpenModuleMenu}
          onContextMenu={handleOpenModuleMenu}
        >
          <Icon display="rounded" icon="more_vert" opsz={20} filled />
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
