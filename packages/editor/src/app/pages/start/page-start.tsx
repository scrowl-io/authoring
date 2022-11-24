import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Workspace } from '../';
import { Projects } from '../../models';
import { menu } from '../../services';

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
    <>
      <div>Starting Page</div>
    </>
  );
};
