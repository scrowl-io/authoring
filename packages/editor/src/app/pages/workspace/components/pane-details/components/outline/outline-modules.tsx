import React, { useState } from 'react';
import { Button, Icon } from '@owlui/lib';
import { Collapse } from 'react-bootstrap';
import { OutlineModulesProps, OutlineModuleItemProps } from './outline.types';
import * as css from '../../_pane-details.scss';
import { OutlineLessons } from './outline-lessons';
import { resetActiveSlide } from '../../../../';
import { Projects } from '../../../../../../models';
import { Elem } from '../../../../../../utils';
import { menu } from '../../../../../../services';
import { InputInlineText } from './input-inline-text';

export const OutlineModuleItem = ({
  module,
  idx,
  className,
  ...props
}: OutlineModuleItemProps) => {
  let classes = `${css.outlineHeader} `;
  const [isOpen, setOpen] = useState(true);
  const menuId = `module-menu-${module.id}`;
  const [isEdit, setIsEdit] = useState(false);
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
        Projects.duplicateModule(module);
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
        setIsEdit(true);
      },
    },
    { type: 'separator' },
    {
      label: 'Delete Module',
      click: () => {
        resetActiveSlide();
        Projects.removeModule(module);
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

  const handleDragStart = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.dataTransfer.setData(
      'text/plain',
      JSON.stringify({
        type: 'module',
        id: module.id,
      })
    );
    ev.dataTransfer.effectAllowed = 'link';
  };

  const handleDragDrop = (ev: React.DragEvent<HTMLDivElement>) => {
    const data = JSON.parse(ev.dataTransfer.getData('text/plain'));

    if (data.type !== 'lesson') {
      return;
    }

    ev.preventDefault();
    ev.stopPropagation();

    console.log('data', data);
    // console.log('ev.currentTarget', ev.currentTarget); -> drop container
    // console.log('ev.target', ev.target); -> drop target
  };

  const inputContainerProps = {
    draggable: true,
    onDragStart: handleDragStart,
    'data-module-id': module.id,
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
            <InputInlineText
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
          <OutlineLessons
            id={menuId}
            moduleId={module.id}
            moduleIdx={idx}
            onDrop={handleDragDrop}
          />
        </div>
      </Collapse>
    </div>
  );
};

export const OutlineModules = ({ ...props }: OutlineModulesProps) => {
  const modules = Projects.useModules();
  const handleAddModule = () => {
    console.log('add module');
  };

  return (
    <div {...props}>
      {modules.map((module, idx) => {
        return <OutlineModuleItem key={idx} module={module} idx={idx} />;
      })}
      <Button
        variant="link"
        className={css.outlineAdd}
        onClick={handleAddModule}
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
