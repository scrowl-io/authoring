import React, { useEffect, useState } from 'react';
import { ButtonGroup, Dropdown, Navbar, Nav } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Button, Icon } from '@owlui/lib';
import * as css from './_workspace-header.scss';
import { Elem } from '../../../../utils';
import { Projects, Settings } from '../../../../models';
import { menu, sys } from '../../../../services';
import { Path as startPath } from '../../../start';
import { Logo } from '../../../../components';
import { PublishOverlay, Confirmation } from '../overlay';
import {
  openPublishProgress,
  closePublishProgress,
  useActiveSlide,
} from '../../page-workspace-hooks';

export const Header = () => {
  const projectData = Projects.useData();
  const assets = Projects.useAssets();
  const activeSlide = useActiveSlide() as Projects.ProjectSlide;
  const projectMeta = projectData.meta;
  const projectNameLn = projectMeta.name ? projectMeta.name.length : 0;
  const [projectName, setProjectName] = useState(projectMeta.name || '');
  const [projectNameSize, setProjectNameSize] = useState(
    projectNameLn - 3 < 13 ? 13 : projectNameLn - 3
  );
  const [isOpenPublish, setIsOpenPublish] = useState(false);
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
  const previewMode = Settings.usePreviewMode();
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
        setProjectName(projectMeta.name || '');
        ev.currentTarget.blur();
        break;
    }
  };

  const handleProjectUpdate = () => {
    Projects.setMeta({ name: projectName });
  };

  const handleProjectPreview = (payload: Projects.PreviewProjectReq) => {
    Settings.setPreviewMode(payload.type);

    menu.API.updatePreviewMenu(payload.type).then((res) => {
      if (res.error) {
        sys.messageDialog({
          message: res.message,
        });
        return;
      }
    });

    Projects.preview(payload).then((res) => {
      if (res.error) {
        sys.messageDialog({
          message: res.message,
        });
        return;
      }

      console.log('preview result', res);
    });
  };

  const handlePreviewDefault = () => {
    const payload: Projects.PreviewProjectReq = {
      type: previewMode,
      project: projectData,
      assets,
    };

    switch (payload.type) {
      case 'slide':
        payload.id = activeSlide.id;
        break;
      case 'lesson':
        payload.id = activeSlide.lessonId;
        break;
      case 'module':
        payload.id = activeSlide.moduleId;
        break;
    }

    handleProjectPreview(payload);
  };

  const preivewMenuItems: Array<menu.ContextMenuItem> = [
    {
      label: 'Current Slide',
      type: 'radio',
      checked: previewMode === 'slide',
      click: () => {
        const payload: Projects.PreviewProjectReq = {
          type: 'slide',
          project: projectData,
          assets,
          id: activeSlide.id,
        };

        handleProjectPreview(payload);
      },
    },
    {
      label: 'Current Lesson',
      type: 'radio',
      checked: previewMode === 'lesson',
      click: () => {
        const payload: Projects.PreviewProjectReq = {
          type: 'lesson',
          project: projectData,
          assets,
          id: activeSlide.lessonId,
        };

        handleProjectPreview(payload);
      },
    },
    {
      label: 'Current Module',
      type: 'radio',
      checked: previewMode === 'module',
      click: () => {
        const payload: Projects.PreviewProjectReq = {
          type: 'module',
          project: projectData,
          assets,
          id: activeSlide.moduleId,
        };

        handleProjectPreview(payload);
      },
    },
    {
      label: 'Entire Project',
      type: 'radio',
      checked: previewMode === 'project',
      click: () => {
        const payload: Projects.PreviewProjectReq = {
          type: 'project',
          project: projectData,
          assets,
        };

        handleProjectPreview(payload);
      },
    },
  ];

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
    openPublishProgress();
    Projects.save({ data: projectData, assets }).then((saveRes) => {
      if (saveRes.error) {
        closePublishProgress();
        sys.messageDialog({
          message: saveRes.message,
        });
        return;
      }

      Projects.publish(saveRes.data.project).then((pubRes) => {
        if (pubRes.error) {
          closePublishProgress();
          sys.messageDialog({
            message: pubRes.message,
          });
          return;
        }

        setIsOpenPublish(false);
        closePublishProgress();

        if (pubRes.data.canceled) {
          return;
        }

        setTimeout(() => {
          setIsOpenConfirmation(true);
        }, 1);
      });
    });
  };

  const handleCloseConfirmation = () => {
    setIsOpenConfirmation(false);
  };

  useEffect(() => {
    if (projectMeta.name && projectMeta.name !== projectName) {
      const nameLn = projectMeta.name.length;

      setProjectName(projectMeta.name);
      setProjectNameSize(nameLn - 3 < 13 ? 13 : nameLn - 3);
    }
  }, [projectMeta.name]);

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
                  onClick={handlePreviewDefault}
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
      <Confirmation
        isOpen={isOpenConfirmation}
        onClose={handleCloseConfirmation}
      />
    </>
  );
};

export default {
  Header,
};
