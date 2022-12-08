import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import * as css from '../_page-start.scss';
import { RecentProjectsProps } from '../page-start.types';
import { ui } from '@scrowl/ui';
import { Projects } from '../../../models';
import { Workspace } from '../../';

export const RecentProjects = ({ projects, ...props }: RecentProjectsProps) => {
  const projectCnt = projects.length;
  const navigate = useNavigate();

  const handleOpenProject = (project: Projects.ProjectMeta) => {
    Workspace.openProject(project);
    navigate(Workspace.Path);
  };

  const handleOpenProjectBrowser = () => {
    Projects.openProjectBrowser();
  };

  return (
    <div className={css.startSection} {...props}>
      <h2>Your Projects</h2>
      <Nav className="flex-column">
        {projects.map((project: Projects.ProjectFile, idx: number) => {
          const vCnt = `v${project.versions.length}`;
          const version = project.versions[0];

          return (
            <Nav.Item key={idx}>
              <ui.Button
                variant="link"
                onClick={() => {
                  handleOpenProject(version);
                }}
              >
                <ui.Icon display="outlined" icon="pages" />
                <span>{version.name}</span>
                <span className={css.projectVersion}>{vCnt}</span>
              </ui.Button>
            </Nav.Item>
          );
        })}
        {projectCnt === 5 && (
          <Nav.Item>
            <ui.Button variant="link" onClick={handleOpenProjectBrowser}>
              <span>View more projects...</span>
            </ui.Button>
          </Nav.Item>
        )}
      </Nav>
    </div>
  );
};

export default {
  RecentProjects,
};
