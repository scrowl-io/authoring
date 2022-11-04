import React, { useState } from 'react';
import { ButtonGroup, Dropdown, Navbar, Nav } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Button, Icon } from '@owlui/lib';
import * as css from './_workspace-header.scss';
import { Elem } from '../../../../utils';
import { Projects, Settings } from '../../../../models';
import { menu } from '../../../../services';
import { Path as startPath } from '../../../start';
import { Logo } from '../../../../components';
import { PublishOverlay } from '../overlay';

export enum PREVIEW_MODE {
  default = 'default',
  slide = 'slide',
  lesson = 'lesson',
  module = 'module',
  project = 'project',
}

export const Header = () => {
  const projectMeta = Projects.useMeta();
  const projectNameLn = projectMeta.name.length;
  const [projectName, setProjectName] = useState(projectMeta.name);
  const [projectNameSize, setProjectNameSize] = useState(
    projectNameLn - 3 < 13 ? 13 : projectNameLn - 3
  );
  const [previewMode, setPreviewMode] = useState(PREVIEW_MODE.project);
  const [isOpenPublish, setIsOpenPublish] = useState(false);
  const animationSettings = Settings.useAnimation();
  const isAnimated = !animationSettings.reducedAnimations;
  const animationDelay = animationSettings.animationDelay;
  const motionOptsContainer = {
    initial: !isAnimated ? {} : { opacity: 0 },
    animate: !isAnimated ? {} : { opacity: 1 },
    transition: !isAnimated
      ? {}
      : {
          opacity: {
            delay: animationDelay,
            duration: 0.2,
          },
        },
  };
  const motionOptsProjectName = {
    initial: !isAnimated ? {} : { marginTop: '-80px' },
    animate: !isAnimated ? {} : { marginTop: '0px' },
    transition: !isAnimated
      ? {}
      : { marginTop: { delay: animationDelay, type: 'spring', bounce: 0.52 } },
  };

  const handleSetProjectName = (ev: React.FormEvent<HTMLInputElement>) => {
    const name = ev.currentTarget.value;
    const nameLn = name.length;

    setProjectName(name);
    setProjectNameSize(nameLn - 3 < 13 ? 13 : nameLn - 3);
  };

  const handleProjectInput = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    switch (ev.key) {
      case 'Enter':
        ev.currentTarget.blur();
        break;
      case 'Escape':
        setProjectName(projectMeta.name);
        ev.currentTarget.blur();
        break;
    }
  };

  const handleProjectUpdate = () => {
    Projects.setMeta({ name: projectName });
  };

  const preivewMenuItems: Array<menu.ContextMenuItem> = [
    {
      label: 'Current Slide',
      checked: previewMode === PREVIEW_MODE.slide,
      click: () => {
        setPreviewMode(PREVIEW_MODE.slide);
        console.log('preview slide');
      },
    },
    {
      label: 'Current Lesson',
      checked: previewMode === PREVIEW_MODE.lesson,
      click: () => {
        setPreviewMode(PREVIEW_MODE.lesson);
        console.log('preview lesson');
      },
    },
    {
      label: 'Current Module',
      checked: previewMode === PREVIEW_MODE.module,
      click: () => {
        setPreviewMode(PREVIEW_MODE.module);
        console.log('preview module');
      },
    },
    { type: 'separator' },
    {
      label: 'Entire Project',
      checked: previewMode === PREVIEW_MODE.project,
      click: () => {
        setPreviewMode(PREVIEW_MODE.project);
        console.log('preview project');
      },
    },
  ];

  const handlePreviewProject = (ev: React.MouseEvent) => {
    console.log('previewing', previewMode);
  };

  const handleOpenPreviewMenu = (ev: React.MouseEvent, offsetX?: number) => {
    const position = Elem.getPosition(
      ev.target,
      Elem.ELEM_ALIGNMENT.LeftBottom,
      [-100 + (offsetX ? offsetX : 0), 6]
    );
    menu.API.contextMenu(preivewMenuItems, position).then((result) => {
      console.log('menu closed', result);
    });
    console.log('opening preview mode');
  };

  const handleOpenPublish = () => {
    setIsOpenPublish(true);
  };

  const handleCLosePublish = () => {
    setIsOpenPublish(false);
  };

  const handelSubmitPublish = () => {
    console.log('course published');
  };

  return (
    <>
      <motion.div
        initial={motionOptsContainer.initial}
        animate={motionOptsContainer.animate}
        transition={motionOptsContainer.transition}
        className={css.workspaceHeaderWrapper}
      >
        <Navbar fixed="top" expand="xs" className={css.workspaceHeader}>
          <div className={css.projectMeta}>
            <Logo
              href={startPath}
              sizing="sm"
              isAnimated={isAnimated}
              animationDelay={animationDelay}
            />

            <motion.div
              className={css.projectName}
              initial={motionOptsProjectName.initial}
              animate={motionOptsProjectName.animate}
              transition={motionOptsProjectName.transition}
            >
              <input
                className="form-control"
                value={projectName}
                onChange={handleSetProjectName}
                onBlur={handleProjectUpdate}
                onKeyDown={handleProjectInput}
                placeholder="Untitled Project"
                size={projectNameSize}
              />
            </motion.div>
          </div>

          <Nav className={`${css.projectActions} align-items-center`}>
            <Nav.Item>
              <Dropdown as={ButtonGroup}>
                <Button
                  className={`ms-3 ${css.projectActionsBtn}`}
                  variant="ghost"
                  size="sm"
                  onClick={handlePreviewProject}
                  onContextMenu={(ev: React.MouseEvent) => {
                    handleOpenPreviewMenu(ev, 102);
                  }}
                >
                  <Icon icon="interests" filled display="sharp" opsz={20} />
                  Preview
                </Button>

                <Button
                  className="dropdown-toggle dropdown-toggle-split"
                  variant="ghost"
                  size="sm"
                  onClick={handleOpenPreviewMenu}
                  onContextMenu={handleOpenPreviewMenu}
                >
                  <Icon
                    icon="arrow_drop_down"
                    filled
                    display="sharp"
                    opsz={20}
                  />
                </Button>
              </Dropdown>
            </Nav.Item>
            <Nav.Item>
              <Button
                className={`ms-3 ${css.projectActionsBtn}`}
                variant="primary"
                size="sm"
                onClick={handleOpenPublish}
              >
                <Icon icon="rocket_launch" filled display="sharp" opsz={20} />
                Publish
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar>
      </motion.div>
      <PublishOverlay
        isOpen={isOpenPublish}
        onClose={handleCLosePublish}
        onSubmit={handelSubmitPublish}
      />
    </>
  );
};

export default {
  Header,
};
