import React, { useState } from 'react';
import { Button, Icon } from '@owlui/lib';
import * as css from '../_pane-details.scss';
import { ResourceItem, NewResourceItem } from '../pane-details.types';
import { Projects } from '../../../../../models';
import { Elem, List } from '../../../../../utils';
import { menu } from '../../../../../services';
import { AssetIcon } from '../../../../../components';
import { ResourceOverlay } from '../../overlay';

export const Resources = () => {
  const [isOpenResourceBrowser, setIsOpenResourceBrowser] = useState(false);
  const newResource: NewResourceItem = {
    isNew: true,
    title: '',
    filename: '',
    ext: '',
    size: 0,
  };
  const [selectedResource, setSelectedResource] =
    useState<ResourceItem>(newResource);
  const resources = Projects.useResources();
  const sortedResources = List.sortBy(resources.slice(), 'title');
  const resourceMenu: Array<menu.ContextMenuItem> = [
    {
      label: 'Edit Resource',
      click: () => {
        // handleOpenResourceBrowser();
        console.log('editing resource');
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
    resource?: ResourceItem
  ) => {
    ev.preventDefault();
    ev.stopPropagation();

    const target = ev.target as HTMLElement;
    const position = Elem.getPosition(target);

    if (resource) {
      setSelectedResource(resource);
    }

    menu.API.contextMenu(resourceMenu, position).then((result) => {
      target.blur();
    });
  };

  const handleOpenResourceBrowser = (resource: ResourceItem) => {
    setSelectedResource(resource);
    setIsOpenResourceBrowser(true);
  };

  const handleCloseResourceBrowser = () => {
    setIsOpenResourceBrowser(false);
  };

  const handleSubmitResource = ({ isNew, ...resource }: ResourceItem) => {
    if (isNew) {
      Projects.addResourceItem(resource);
    } else {
      Projects.setResourceItem(resource);
    }

    setIsOpenResourceBrowser(false);
  };

  return (
    <>
      <div>
        <dl className={css.tabResourcesList}>
          {sortedResources.map((resource, idx) => {
            const editableResource = {
              ...resource,
              isNew: false,
            };
            return (
              <div key={idx} className={css.tabResourcesItem}>
                <div
                  className="d-flex justify-content-between"
                  onClick={() => {
                    handleOpenResourceBrowser(editableResource);
                  }}
                  onContextMenu={(ev) => {
                    handleResourceMenu(ev, editableResource);
                  }}
                >
                  <dt className={css.tabResourcesItemTitle}>
                    <AssetIcon
                      type={editableResource.type}
                      ext={editableResource.ext}
                    />
                    <span>{editableResource.title}</span>
                  </dt>
                  <Button
                    className={css.actionMenu}
                    variant="ghost"
                    onClick={(ev) => {
                      handleResourceMenu(ev, editableResource);
                    }}
                    onContextMenu={(ev) => {
                      handleResourceMenu(ev, editableResource);
                    }}
                  >
                    <Icon display="rounded" icon="more_vert" opsz={20} filled />
                  </Button>
                </div>
                <dd className={css.tabResourcesDescription}>
                  {editableResource.description}
                </dd>
              </div>
            );
          })}
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
      <ResourceOverlay
        isOpen={isOpenResourceBrowser}
        onClose={handleCloseResourceBrowser}
        onSubmit={handleSubmitResource}
        resourceItem={selectedResource}
      />
    </>
  );
};

export default {
  Resources,
};
