import React from 'react';
import { Nav } from 'react-bootstrap';
import { RecentProjectsProps } from '../page-start.types';
import { Icon, Button } from '@owlui/lib';
import { Projects } from '../../../models';

export const RecentProjects = ({ projects, ...props }: RecentProjectsProps) => {
  const projectCnt = projects.length;

  const handleOpenProject = (project: Projects.ProjectMeta) => {};

  const handleOpenProjectBrowser = () => {};

  return (
    <div {...props}>
      <h2>Your Projects</h2>
      <Nav className="flex-column">
        {projects.map((project: Projects.ProjectFile, idx: number) => {
          const vCnt = project.versions.length;
          const version = project.versions[0];

          return (
            <Nav.Item key={idx}>
              <Button
                variant="link"
                onClick={() => {
                  handleOpenProject(version);
                }}
              >
                <Icon display="outlined" icon="pages" />
                <span>{version.name}</span>
                <span>{vCnt}</span>
              </Button>
            </Nav.Item>
          );
        })}
        {projectCnt === 5 && (
          <Nav.Item>
            <Button variant="link" onClick={handleOpenProjectBrowser}>
              <span>View more projects...</span>
            </Button>
          </Nav.Item>
        )}
      </Nav>
    </div>
  );
};

export default {
  RecentProjects,
};
