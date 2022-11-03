import React, { useState, useRef } from 'react';
import { Button, Icon } from '@owlui/lib';
import * as css from '../_pane-details.scss';
import { Projects } from '../../../../../models';
import { Elem } from '../../../../../utils';
import { menu } from '../../../../../services';

export const Resources = () => {
  const [isOpenResourceBrowser, setIsOpenResourceBrowser] = useState(false);
  const newResource = {
    id: -1,
    filename: '',
    title: '',
    description: '',
  };
  const selectedResource = useRef<Projects.ProjectResource>(newResource);
  const resources = Projects.useResources();
  const sortedResources = resources
    .slice()
    .sort((a: any, b: any) => a.title.localeCompare(b.title));
  const resourceMenu: Array<menu.ContextMenuItem> = [
    {
      label: 'Edit Resource',
      click: () => {
        handleOpenResourceBrowser();
      },
    },
    { type: 'separator' },
    {
      label: 'Remove Resource',
      click: () => {
        console.log('remove resource item');
      },
    },
  ];

  const handleResourceMenu = (
    ev: React.MouseEvent,
    resource?: Projects.ProjectResource
  ) => {
    ev.preventDefault();
    ev.stopPropagation();

    const target = ev.target as HTMLElement;
    const position = Elem.getPosition(target);

    if (resource) {
      selectedResource.current = resource;
    }

    menu.API.contextMenu(resourceMenu, position).then((result) => {
      console.log('menu close', result);
      target.blur();
    });
  };

  const handleOpenResourceBrowser = (resource?: Projects.ProjectResource) => {
    setIsOpenResourceBrowser(true);

    if (resource) {
      selectedResource.current = resource;
    }
  };

  const handleCloseResourceBrowser = () => {
    setIsOpenResourceBrowser(false);
  };

  const handleSubmitResource = (resource: Projects.ProjectResource) => {
    setIsOpenResourceBrowser(false);

    if (resource.id === -1) {
      Projects.addResourceItem(resource);
    } else {
      Projects.setResourceItem(resource);
    }
  };

  return (
    <>
      <div>
        <dl className={css.tabResourceList}>
          {sortedResources.map((resource, idx) => (
            <div key={idx} className={css.tabResourceItem}>
              <div
                className="d-flex justify-content-between"
                onClick={() => {
                  handleOpenResourceBrowser(resource);
                }}
                onContextMenu={(ev) => {
                  handleResourceMenu(ev, resource);
                }}
              >
                <dt className={css.tabResourceItemTitle}>{resource.title}</dt>
                <Button
                  className={css.actionMenu}
                  variant="ghost"
                  onClick={(ev) => {
                    handleResourceMenu(ev, resource);
                  }}
                  onContextMenu={(ev) => {
                    handleResourceMenu(ev, resource);
                  }}
                >
                  <Icon display="rounded" icon="more_vert" opsz={20} filled />
                </Button>
              </div>
              <dd className={css.tabResourceItemDescription}>
                {resource.definition}
              </dd>
            </div>
          ))}
        </dl>
        <div className="owl-sticky-add-item">
          <button
            className="owl-sticky-add-item__button"
            onContextMenu={() => {
              handleOpenResourceBrowser(newResource);
            }}
            onClick={() => {
              handleOpenResourceBrowser(newResource);
            }}
          >
            <span className="txt-placeholder">Add a new resource...</span>
            <Icon
              display="rounded"
              icon="attach_file"
              opsz={20}
              filled
              pxScale="Lg"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default {
  Resources,
};
