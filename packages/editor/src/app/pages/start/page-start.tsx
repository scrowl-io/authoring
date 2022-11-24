import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as css from './_page-start.scss';
import { Workspace } from '../';
import { Projects } from '../../models';
import { menu } from '../../services';
import { Logo } from '../../components';
import { StartNew } from './components';

export const Path = '/start';

export const Page = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const openListener = (ev, project?: Projects.ProjectMeta) => {
      if (project) {
        Workspace.openProject(project);
        navigate(Workspace.Path);
        return;
      }

      Projects.openProjectBrowser();
    };

    menu.API.onProjectOpen(openListener);

    return () => {
      menu.API.offProjectOpen();
    };
  });

  return (
    <div className={css.start}>
      <div className={css.startContainer}>
        <div className={css.startHeader}>
          <h1>
            <Logo />
            Scrowl
          </h1>
        </div>

        <StartNew className={css.startSection} />
      </div>
    </div>
  );
};
