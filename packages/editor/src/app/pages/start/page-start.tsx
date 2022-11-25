import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as css from './_page-start.scss';
import { Workspace } from '../';
import { Projects } from '../../models';
import { menu } from '../../services';
import { Logo } from '../../components';
import { StartNew, RecentProjects, GettingStarted } from './components';

export const Path = '/start';

export const Page = () => {
  const navigate = useNavigate();
  const listInProgress = useRef(false);
  const [projects, setProjects] = useState<Array<Projects.ProjectFile>>([]);

  useEffect(() => {
    const openListener = (ev, project?: Projects.ProjectMeta) => {
      if (project) {
        Workspace.openProject(project);
        navigate(Workspace.Path);
        return;
      }

      Projects.openProjectBrowser();
    };

    const getProjects = () => {
      Projects.list(5).then((res) => {
        listInProgress.current = false;

        if (res.error) {
          console.error(res);
          return;
        }

        setProjects(res.data.projects);
      });
    };

    menu.API.onProjectOpen(openListener);

    if (!listInProgress.current) {
      listInProgress.current = true;
      getProjects();
    }

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

        <StartNew />
        <GettingStarted />
        {projects.length && <RecentProjects projects={projects} />}
      </div>
    </div>
  );
};
