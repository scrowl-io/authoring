import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { ui } from '@scrowl/ui';
import * as css from '../_page-start.scss';
import { StartNewProps } from '../page-start.types';
import { Projects } from '../../../models';
import { menu } from '../../../services';
import { Workspace } from '../../';

export const GettingStarted = ({ hasProjects, ...props }: StartNewProps) => {
  const navigator = useNavigate();
  const inProgress = useRef(false);
  const isReady = useRef(false);

  const handleNewProject = (blueprint: string) => {
    if (inProgress.current) {
      return;
    }

    inProgress.current = true;
    Projects.create(blueprint).then((result) => {
      if (result.error) {
        console.error(result);
        return;
      }

      menu.API.enableProjectActions().then(() => {
        inProgress.current = false;
        navigator(Workspace.Path);
      });
    });
  };

  useEffect(() => {
    if (isReady.current) {
      return;
    }

    menu.API.disableProjectActions().then(() => {
      isReady.current = false;
    });

    return () => {
      isReady.current = true;
    };
  }, [isReady.current]);

  return (
    <div className={css.startSection} {...props}>
      <h2>Getting Started</h2>
      <Nav className="flex-column">
        <Nav.Item>
          <ui.Button
            variant="link"
            onClick={() => {
              handleNewProject('beginner');
            }}
          >
            <ui.Icon display="sharp" icon="assistant_direction" />
            Beginner Tutorial Project
          </ui.Button>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default {
  GettingStarted,
};
