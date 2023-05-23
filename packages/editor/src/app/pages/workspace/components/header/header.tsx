import React, { useEffect, useState, useRef } from 'react';
import { ButtonGroup, Dropdown, Navbar, Nav } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { ui } from '@scrowl/ui';
import * as css from './_workspace-header.scss';
import { Elem } from '../../../../utils';
import { Projects, Settings } from '../../../../models';
import { menu, sys } from '../../../../services';
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
  const projectNameRef = useRef<HTMLSpanElement>(null);
  const projectNameInputRef = useRef<HTMLInputElement>(null);
  const [rollbackName, setRollbackName] = useState(projectMeta.name || '');
  const [isOpenPublish, setIsOpenPublish] = useState(false);
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
  const hasPublished = Settings.useHasPublished();
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

  const handleUpdateForm = (ev: React.FocusEvent<HTMLInputElement>) => {
    const newValue = ev.currentTarget.value;

    setRollbackName(newValue);
  };

  const handleUpdateProjectName = (ev: React.FormEvent<HTMLInputElement>) => {
    const newValue = ev.currentTarget.value;

    Projects.setMeta({ name: newValue });
  };

  const handleInputProjectName = (
    ev: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const newValue = ev.currentTarget.value;

    switch (ev.key) {
      case 'Enter':
        ev.currentTarget.blur();
        Projects.setMeta({ name: newValue });
        break;
      case 'Escape':
        Elem.stopEvent(ev);
        ev.currentTarget.value = rollbackName;
        Projects.setMeta({ name: rollbackName });
        ev.currentTarget.blur();
        break;
    }
  };

  const handleProjectPreview = (
    payload: Projects.ProjectsReqPreviewProject
  ) => {
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
    const payload: Projects.ProjectsReqPreviewProject = {
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

  const previewMenuItems: Array<menu.ContextMenuItem> = [
    {
      label: 'Current Slide',
      type: 'radio',
      checked: previewMode === 'slide',
      click: () => {
        const payload: Projects.ProjectsReqPreviewProject = {
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
        const payload: Projects.ProjectsReqPreviewProject = {
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
        const payload: Projects.ProjectsReqPreviewProject = {
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
        const payload: Projects.ProjectsReqPreviewProject = {
          type: 'project',
          project: projectData,
          assets,
        };

        handleProjectPreview(payload);
      },
    },
  ];

  const handleOpenPreviewMenu = (ev: React.MouseEvent, offsetX?: number) => {
    menu.API.contextMenu(ev, previewMenuItems, undefined, {
      alignment: 'left-bottom',
      offset: [-100 + (offsetX ? offsetX : 0), 6],
    });
  };

  const handleOpenPublish = () => {
    setIsOpenPublish(true);
  };

  const handleCLosePublish = () => {
    setIsOpenPublish(false);
  };

  const handelSubmitPublish = (formData) => {
    openPublishProgress();

    const submittedData = {
      ...projectData,
      scorm: formData,
    };

    Projects.save({ data: submittedData, assets }).then((saveRes) => {
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

        Settings.setLastPublishedAt(pubRes.data.lastPublishedAt);
        setIsOpenPublish(false);
        closePublishProgress();

        if (pubRes.data.canceled) {
          return;
        }

        if (hasPublished) {
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
    if (projectNameRef.current && projectNameInputRef.current) {
      let newWidth = projectNameRef.current.offsetWidth + 6;

      if (!projectMeta.name || !projectMeta.name.length || newWidth < 200) {
        newWidth = 200;
      }

      projectNameInputRef.current.style.width = `${newWidth}px`;
    }
  }, [projectNameRef.current, projectNameInputRef.current, projectMeta.name]);

  useEffect(() => {
    menu.API.onPublish(() => {
      setIsOpenPublish(true);
    });

    return () => {
      menu.API.offPublish();
      menu.API.offPublishQuick();
    };
  }, [projectData]);

  useEffect(() => {
    if (!rollbackName || rollbackName === '') {
      setRollbackName(projectMeta.name as string);
    }
  }, [projectData]);

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
              asLink={true}
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
              <span ref={projectNameRef}>
                {projectMeta.name && projectMeta.name.replace(/ /g, '\u00A0')}
              </span>
              <input
                ref={projectNameInputRef}
                className="form-control"
                value={projectMeta.name}
                onChange={handleUpdateProjectName}
                onKeyDown={handleInputProjectName}
                onBlur={handleUpdateForm}
                placeholder="Untitled Project"
              />
            </motion.div>
          </div>

          <Nav className={`${css.projectActions} align-items-center`}>
            <Nav.Item>
              <Dropdown as={ButtonGroup}>
                <ui.Button
                  className={`ms-3 ${css.projectActionsBtn}`}
                  variant="ghost"
                  size="sm"
                  onClick={handlePreviewDefault}
                  onContextMenu={(ev: React.MouseEvent) => {
                    handleOpenPreviewMenu(ev, 102);
                  }}
                >
                  <ui.Icon icon="interests" filled display="sharp" opsz={20} />
                  Preview
                </ui.Button>

                <ui.Button
                  className="dropdown-toggle dropdown-toggle-split"
                  variant="ghost"
                  size="sm"
                  onClick={handleOpenPreviewMenu}
                  onContextMenu={handleOpenPreviewMenu}
                >
                  <ui.Icon
                    icon="arrow_drop_down"
                    filled
                    display="sharp"
                    opsz={20}
                  />
                </ui.Button>
              </Dropdown>
            </Nav.Item>
            <Nav.Item>
              <ui.Button
                className={`ms-3 ${css.projectActionsBtn}`}
                variant="primary"
                size="sm"
                onClick={handleOpenPublish}
              >
                <ui.Icon
                  icon="rocket_launch"
                  filled
                  display="sharp"
                  opsz={20}
                />
                Publish
              </ui.Button>
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
