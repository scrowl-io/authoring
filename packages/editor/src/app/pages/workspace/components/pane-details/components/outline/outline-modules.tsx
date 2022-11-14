import React, { useState } from 'react';
import { Button, Icon } from '@owlui/lib';
import { Collapse } from 'react-bootstrap';
import { OutlineModulesProps, OutlineModuleItemProps } from './outline.types';
import * as css from '../../_pane-details.scss';
import { OutlineLessons } from './outline-lessons';
import { resetActiveSlide } from '../../../../';
import { Projects } from '../../../../../../models';
import { Elem } from '../../../../../../utils';
import { menu, sys } from '../../../../../../services';
import { InlineInput } from '../../../../../../components';

export const OutlineModuleItem = ({
  module,
  idx,
  className,
  ...props
}: OutlineModuleItemProps) => {
  let classes = `${css.outlineHeader} outline-item__module`;
  const [isOpen, setOpen] = useState(true);
  const menuId = `module-menu-${module.id}`;
  const [isEdit, setIsEdit] = useState(false);
  const inputContainerProps = {
    draggable: true,
    'data-outline-type': 'module',
    'data-module-id': module.id,
  };
  const moduleMenuItems: Array<menu.ContextMenuItem> = [
    {
      label: 'Add Lesson',
      click: () => {
        Projects.addLesson({
          id: -1,
          moduleId: module.id,
        });
      },
    },
    {
      label: 'Duplicate Module',
      click: () => {
        Projects.duplicateModule(module);
      },
    },
    {
      label: 'Add New Module After',
      click: () => {
        Projects.addModule({
          id: module.id,
        });
      },
    },
    { type: 'separator' },
    {
      label: 'Rename',
      click: () => {
        setIsEdit(true);
      },
    },
    { type: 'separator' },
    {
      label: 'Delete Module',
      click: () => {
        sys
          .messageDialog({
            message: 'Are you sure?',
            buttons: ['Delete Module', 'Cancel'],
            detail: module.name,
          })
          .then((res) => {
            if (res.error) {
              console.error(res);
              return;
            }

            if (res.data.response === 0) {
              resetActiveSlide();
              Projects.removeModule(module);
            }
          });
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

  const handleNameChange = (val) => {
    const updateData = {
      ...module,
      name: val,
    };

    Projects.setModule(updateData);
  };

  const handleNameClose = () => {
    setIsEdit(false);
  };

  return (
    <div className={css.outlineModule} {...props} data-module-id={module.id}>
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
            <InlineInput.Text
              isEdit={isEdit}
              text={module.name}
              onChange={handleNameChange}
              onBlur={handleNameClose}
              containerProps={inputContainerProps}
            />
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
          <OutlineLessons id={menuId} moduleId={module.id} moduleIdx={idx} />
        </div>
      </Collapse>
    </div>
  );
};

export const OutlineModules = ({
  className,
  ...props
}: OutlineModulesProps) => {
  const modules = Projects.useModules();
  let classes = `outline-list-module`;
  let addClasses = `${css.outlineAdd} outline-item__module`;

  const handleAddModule = () => {
    Projects.addModule({
      id: -1,
    });
  };

  if (className) {
    classes += ` ${className}`;
  }

  return (
    <div className={classes} {...props}>
      {modules.map((module, idx) => {
        return <OutlineModuleItem key={idx} module={module} idx={idx} />;
      })}
      <Button
        variant="link"
        className={addClasses}
        onClick={handleAddModule}
        data-module-id={-1}
      >
        <Icon icon="add" display="outlined" />
        <span>Add New Module</span>
      </Button>
    </div>
  );
};

export default {
  OutlineModules,
  OutlineModuleItem,
};
