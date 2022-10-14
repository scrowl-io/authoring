import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Button, Icon } from '@owlui/lib';
import * as css from './_workspace-header.scss';
import { Projects, Settings } from '../../../../models';
import { Path as startPath } from '../../../start';
import { Logo } from '../../../../components';

export const Header = () => {
  const projectMeta = Projects.useMeta();
  const projectNameLn = projectMeta.name.length;
  const [projectName, setProjectName] = useState(projectMeta.name);
  const [projectNameSize, setProjectNameSize] = useState(
    projectNameLn - 3 < 13 ? 13 : projectNameLn - 3
  );
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

  return (
    <motion.div
      initial={motionOptsContainer.initial}
      animate={motionOptsContainer.animate}
      transition={motionOptsContainer.transition}
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
            <Button
              className={`ms-3 ${css.projectActionsBtn}`}
              variant="ghost"
              size="sm"
            >
              Preview
            </Button>
          </Nav.Item>
          <Nav.Item>
            <Button
              className={`ms-3 ${css.projectActionsBtn}`}
              variant="primary"
              size="sm"
            >
              <Icon icon="history_edu" filled display="sharp" opsz={20} />
              Publish
            </Button>
          </Nav.Item>
        </Nav>
      </Navbar>
    </motion.div>
  );
};

export default {
  Header,
};
