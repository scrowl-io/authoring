import React, { useEffect, useState, forwardRef, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ui, IconType } from '@scrowl/ui';
import './_project-browser.scss';
import { FormattedProjectFile } from './project-browser.types';
import { Modal, filter } from '../';
import { Projects } from '../../models';
import { Workspace } from '../../pages';
import { sys, events } from '../../services';
import { ProjectSearch } from './';
import { List, Elem } from '../../utils';

const ProjectBrowserElement = ({ isOpen, ...props }, ref) => {
  const navigate = useNavigate();
  const location = useLocation();
  const title = 'Project Browser';
  const listInProgress = useRef(false);
  const [projects, setProjects] = useState<Array<FormattedProjectFile>>([]);
  const [filteredProjects, setFilteredProjects] = useState<
    Array<FormattedProjectFile>
  >([]);
  const [selectedProject, setSelectedProject] = useState<{
    idx: number;
    project: Projects.ProjectFile;
  } | null>();
  const [filterInput, setFilterInput] = useState('');
  const [sortField, setSortField] = useState('project.name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortIcon, setSortIcon] = useState<IconType>('arrow_drop_down');
  const saveStatus = Projects.useInteractions();
  const projectData = Projects.useData();
  const assets = Projects.useAssets();
  const formRef = useRef<HTMLFormElement>(null);

  const sortList = () => {
    let sortedList: Array<FormattedProjectFile> = projects.slice();

    List.sortBy(sortedList, sortField, sortOrder === 'desc');

    return sortedList;
  };

  const searchList = () => {
    let filteredList: Array<FormattedProjectFile> = [];

    const filterList = (project: FormattedProjectFile) => {
      return project.project.name.indexOf(filterInput) !== -1;
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

  const handleSelectProject = (project: Projects.ProjectFile, idx: number) => {
    setSelectedProject({
      idx,
      project,
    });
  };

  const open = () => {
    if (!selectedProject) {
      return;
    }

    const project = selectedProject.project.versions[0];
    Workspace.openProject(project);

    if (location.pathname !== Workspace.Path) {
      navigate(Workspace.Path);
    }
  };

  const handleSubmit = (ev: React.FormEvent) => {
    Elem.stopEvent(ev);

    const promptDiscardProject = () => {
      sys
        .messageDialog({
          type: 'question',
          title: 'Confirm',
          message: 'Open Project Without Saving?',
          detail: 'Your changes are not saved.',
          buttons: ['Save and Close', 'Discard and Open', 'Cancel'],
        })
        .then((res) => {
          if (res.error) {
            console.error(res);
            return;
          }

          switch (res.data.response) {
            case 0:
              Projects.save({
                data: projectData,
                assets,
              }).then((saveRes) => {
                if (saveRes.data && saveRes.data.action) {
                  switch (saveRes.data.action) {
                    case 'prompt-project-name':
                      Workspace.openPromptProjectName({
                        action: events.project.EVENTS.open,
                      });
                      break;
                  }
                  return;
                } else if (saveRes.error) {
                  sys.messageDialog({
                    message: res.message,
                  });
                  return;
                }

                open();
              });
              break;
            case 1:
              open();
              break;
          }
        });
    };

    if (!selectedProject) {
      return;
    }

    const project = selectedProject.project.versions[0];

    if (projectData.meta.id && projectData.meta.id === project.id) {
      handleClose();
      return;
    }

    if (location.pathname === Workspace.Path && saveStatus.isUncommitted) {
      promptDiscardProject();
      return;
    }

    open();
  };

  useEffect(() => {
    setFilterInput('');

    const getProjects = () => {
      Projects.list().then((res) => {
        listInProgress.current = false;

        if (res.error) {
          console.error(res);
          return;
        }

        if (!isOpen) {
          return;
        }

        setProjects(
          res.data.projects.map((projectFile) => {
            projectFile.project = projectFile.versions[0];
            return projectFile;
          })
        );
      });
    };

    if (!listInProgress.current && isOpen) {
      listInProgress.current = true;
      getProjects();
    }

    if (!isOpen) {
      setSelectedProject(null);
    }

    events.project.onOpen(open);

    return () => {
      events.project.offOpen(open);
    };
  }, [
    isOpen,
    formRef.current,
    saveStatus.isUncommitted,
    location.pathname,
    selectedProject,
  ]);

  useEffect(() => {
    searchList();
  }, [filterInput, sortField, sortOrder, projects]);

  return (
    <div ref={ref}>
      <Modal
        className="modal-project-browser"
        title={title}
        isOpen={isOpen}
        onClose={handleClose}
        modalSize="lg"
      >
        <form onSubmit={handleSubmit}>
          <div className="project-browser-container">
            <ProjectSearch value={filterInput} onChange={handleFilterInput} />
            <div className="project-browser-content">
              <table className="table">
                <thead>
                  <tr onClick={handleSortOrder}>
                    <th
                      scope="col"
                      data-sort-field="project.name"
                      className="cell-name"
                    >
                      Name
                      {sortField === 'project.name' && (
                        <ui.Icon className="sort-indicator" icon={sortIcon} />
                      )}
                    </th>
                    <th
                      scope="col"
                      data-sort-field="createdAt"
                      className="cell-created-at"
                    >
                      Created
                      {sortField === 'createdAt' && (
                        <ui.Icon className="sort-indicator" icon={sortIcon} />
                      )}
                    </th>
                    <th
                      scope="col"
                      data-sort-field="updatedAt"
                      className="cell-updated-at"
                    >
                      Last Modified
                      {sortField === 'updatedAt' && (
                        <ui.Icon className="sort-indicator" icon={sortIcon} />
                      )}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.length ? (
                    filteredProjects.map(
                      (project: FormattedProjectFile, idx: number) => {
                        let classes = 'project-row';

                        if (idx === selectedProject?.idx) {
                          classes += ' active';
                        }

                        return (
                          <tr
                            key={idx}
                            className={classes}
                            onClick={() => {
                              handleSelectProject(project, idx);
                            }}
                          >
                            <td className="cell-name">
                              {project.project.name}
                            </td>
                            <td className="cell-created-at">
                              <filter.Date>{project.createdAt}</filter.Date>
                            </td>
                            <td className="cell-updated-at">
                              <filter.Date>{project.updatedAt}</filter.Date>
                            </td>
                          </tr>
                        );
                      }
                    )
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
            <ui.Button variant="link" onClick={handleClose}>
              Cancel
            </ui.Button>
            <ui.Button variant="primary" type="submit">
              Open
            </ui.Button>
          </footer>
        </form>
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
