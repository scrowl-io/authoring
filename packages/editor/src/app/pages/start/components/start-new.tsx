import React from 'react';
import { Nav } from 'react-bootstrap';
import * as css from '../_page-start.scss';
import { StartNewProps } from '../page-start.types';
import { Icon, Button } from '@owlui/lib';

export const StartNew = ({ hasProjects, ...props }: StartNewProps) => {
  const handleNewProject = () => {};

  return (
    <div className={css.startSection} {...props}>
      <h2>Start</h2>
      <Nav className="flex-column">
        <Nav.Item>
          <Button variant="link" onClick={handleNewProject}>
            <Icon display="outlined" icon="library_add" />
            New Project
          </Button>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default {
  StartNew,
};
