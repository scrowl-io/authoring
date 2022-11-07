import React, { useState, useRef } from 'react';
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
import { getContainer } from './utils';

export const OutlineModuleItem = ({
  module,
  idx,
  className,
  ...props
}: OutlineModuleItemProps) => {
  let classes = `${css.outlineHeader}`;
  const [isOpen, setOpen] = useState(true);
  const menuId = `module-menu-${module.id}`;
  const [isEdit, setIsEdit] = useState(false);
  const draggable = useRef<HTMLDivElement | undefined>();
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

    const target = ev.target as HTMLDivElement;
    const ghostElm = target.cloneNode(true) as HTMLDivElement;
    const appNode = document.getElementById('app');

    if (!appNode) {
      return;
    }

    ghostElm.classList.add(css.draggableOutlineItem);
    appNode.appendChild(ghostElm);
    ghostElm.style.width = window.getComputedStyle(target).width;
    draggable.current = ghostElm;
    ev.dataTransfer.setDragImage(ghostElm, 0, 0);
  };

  const handleDragEnd = (ev: React.DragEvent<HTMLDivElement>) => {
    if (!draggable.current) {
      return;
    }

    draggable.current.remove();
    draggable.current = undefined;
  };

  const handleValidDragTarget = (ev: React.DragEvent<HTMLDivElement>) => {
    if (!draggable.current) {
      return;
    }

    const target = ev.target as HTMLDivElement;
    const container = getContainer(target, 'outline-list-module');

    if (container) {
      ev.preventDefault();
      container.classList.add(css.draggableIndicatorModule);
    }
  };

  const inputContainerProps = {
    draggable: true,
    onDragStart: handleDragStart,
    onDragOver: handleValidDragTarget,
    onDragEnter: handleValidDragTarget,
    onDragEnd: handleDragEnd,
    'data-module-id': module.id,
  };

  const handleDragDrop = (ev: React.DragEvent<HTMLDivElement>) => {
    const moveFrom = JSON.parse(ev.dataTransfer.getData('text/plain'));

    if (moveFrom.type !== 'lesson') {
      return;
    }

    ev.preventDefault();

    const target = ev.target as HTMLDivElement;
    const container = getContainer(target, css.outlineLesson) as HTMLDivElement;

    if (!container) {
      return;
    }

    container.classList.remove(css.draggableIndicatorLesson);

    const moveTo = {
      moduleId: parseInt(container.dataset.moduleId || ''),
      id: parseInt(container.dataset.lessonId || ''),
    };

    Projects.moveOutlineItem({
      moveFrom,
      moveTo,
    });
  };

  const handleDragEnter = (ev: React.DragEvent) => {
    const target = ev.target as HTMLDivElement;
    const container = getContainer(target, css.outlineLesson);

    if (container) {
      ev.preventDefault();
      container.classList.add(css.draggableIndicatorLesson);
      draggable.current = container;
    }
  };

  const handleDragLeave = (ev: React.DragEvent) => {
    const target = ev.target as HTMLDivElement;
    const containerLesson = getContainer(target, css.outlineLesson);

    if (!containerLesson) {
      const indicator = document.getElementsByClassName(
        css.draggableIndicatorLesson
      )[0];

      if (!indicator) {
        return;
      }
      indicator.classList.remove(css.draggableIndicatorLesson);
      return;
    }

    if (
      containerLesson &&
      !containerLesson.isSameNode(draggable.current) &&
      containerLesson.contains(target)
    ) {
      containerLesson.classList.remove(css.draggableIndicatorLesson);
      return;
    }
  };

  return (
    <div
      className={css.outlineModule}
      {...props}
      data-module-id={module.id}
      onDragLeave={handleDragLeave}
    >
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
            onDragEnter={handleDragEnter}
            onDragOver={handleValidDragTarget}
          />
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
