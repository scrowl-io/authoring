import React, { useEffect, useState, forwardRef, useRef } from 'react';
import { Button, Icon } from '@owlui/lib';
import { Modal } from '../';
import { Projects } from '../../models';
import { ProjectSearch } from './';
import { List } from '../../utils';

const ProjectBrowserElement = ({ isOpen, ...props }, ref) => {
  const title = 'Project Browser';
  const projects = [];
  const [filteredProjects, setFilteredProjects] = useState<
    Array<Projects.ProjectFile>
  >([]);
  const [selectedProject, setSelectedProject] = useState();
  const [filterInput, setFilterInput] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortIcon, setSortIcon] = useState('arrow_drop_down');

  const sortList = () => {
    let sortedList: Array<Projects.ProjectFile> = projects.slice();

    List.sortBy(sortedList, sortField, sortOrder === 'desc');

    return sortedList;
  };

  const searchList = () => {
    let filteredList: Array<Projects.ProjectFile> = [];

    const filterList = (project: Projects.ProjectFile) => {
      return project.versions[0].name.indexOf(filterInput) !== -1;
    };

    if (!filterInput || !filterInput.length) {
      filteredList = sortList();
    } else {
      filteredList = sortList().filter(filterList);
    }

    setFilteredProjects(filteredList);
  };

  const handleFilterInput = (ev: React.FormEvent<HTMLInputElement>) => {
    const val = ev.currentTarget.value;

    setFilterInput(val);
  };

  const handleSortOrder = (ev: React.MouseEvent) => {
    const target = ev.target as HTMLTableCellElement;
    let newSortOrder = 'asc';
    const newSortField = target.dataset.sortField;
    const isSameField = newSortField === sortField;

    if (!newSortField) {
      return;
    }

    switch (sortOrder) {
      case 'asc':
        newSortOrder = isSameField ? 'desc' : 'asc';
        break;
      case 'desc':
        newSortOrder = isSameField ? 'asc' : 'desc';
        break;
    }

    const newSortIcon =
      newSortOrder === 'asc' ? 'arrow_drop_down' : 'arrow_drop_up';

    setSortField(newSortField);
    setSortOrder(newSortOrder);
    setSortIcon(newSortIcon);
  };

  const handleClose = () => {
    Projects.closeProjectBrowser();
  };

  const handleSubmit = () => {};

  useEffect(() => {
    setFilterInput('');
    // TODO :: call project api endpoint to get list of projects
  }, [isOpen]);

  useEffect(() => {
    searchList();
  }, [filterInput, sortField, sortOrder]);

  return (
    <div ref={ref}>
      <Modal
        className="modal-project-browser"
        title={title}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <div className="project-browser-container">
          <ProjectSearch value={filterInput} onChange={handleFilterInput} />
          <div className="project-browser-content">
            <table className="table">
              <thead>
                <tr onClick={handleSortOrder}>
                  <th scope="col" data-sort-field="name">
                    Name
                    {sortField === 'name' && (
                      <Icon className="sort-indicator" icon={sortIcon} />
                    )}
                  </th>
                  <th scope="col" data-sort-field="createdAt">
                    Created
                    {sortField === 'createdAt' && (
                      <Icon className="sort-indicator" icon={sortIcon} />
                    )}
                  </th>
                  <th scope="col" data-sort-field="updatedAt">
                    Last Modified
                    {sortField === 'updatedAt' && (
                      <Icon className="sort-indicator" icon={sortIcon} />
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.length ? (
                  filteredProjects.map((project, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{project.versions[0].name}</td>
                        <td>{project.createdAt}</td>
                        <td>{project.updatedAt}</td>
                      </tr>
                    );
                  })
                ) : (
                  <></>
                )}
              </tbody>
            </table>
            {filteredProjects.length ? (
              <></>
            ) : (
              <div style={{ textAlign: 'center' }} className="mt-3">
                No Projects
              </div>
            )}
          </div>
        </div>

        <footer className="d-flex justify-content-end">
          <Button variant="link" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Open
          </Button>
        </footer>
      </Modal>
    </div>
  );
};

const ProjectBrowserRef = forwardRef(ProjectBrowserElement);

export const ProjectBrowser = (props) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const isOpen = Projects.useProjectBrowser();

  useEffect(() => {
    const appNode = document.getElementById('app');

    if (appNode && overlayRef.current) {
      appNode.appendChild(overlayRef.current);
    }
  }, [overlayRef, isOpen]);

  return <ProjectBrowserRef ref={overlayRef} isOpen={isOpen} {...props} />;
};

export default {
  ProjectBrowser,
};
