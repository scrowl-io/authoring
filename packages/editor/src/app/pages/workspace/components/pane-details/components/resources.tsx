import React, { useEffect, useState } from 'react';
import { ui } from '@scrowl/ui';
import * as css from '../_pane-details.scss';
import {
  ResourceItem,
  NewResourceItem,
  ContextMenuResult,
} from '../pane-details.types';
import { Projects } from '../../../../../models';
import { List } from '../../../../../utils';
import { menu, sys } from '../../../../../services';
import { AssetIcon } from '../../../../../components';
import { ResourceOverlay } from '../../overlay';
import { ProjectResource } from '../../../../../models/projects';

export const Resources = () => {
  const [isOpenResourceBrowser, setIsOpenResourceBrowser] = useState(false);
  const [isOpenAssetBrowser, setIsOpenAssetBrowser] = useState(false);

  const newResource: NewResourceItem = {
    isNew: true,
    title: '',
    filename: '',
    ext: '',
    sourceExt: '',
    sourceFilename: '',
    size: 0,
    description: '',
  };
  const [selectedResource, setSelectedResource] =
    useState<ResourceItem>(newResource);
  const resources = Projects.useResources();
  const projectMeta = Projects.useMeta();
  const sortedResources = List.sortBy(resources.slice(), 'title');
  const resourceMenu: Array<menu.ContextMenuItem> = [
    {
      label: 'Edit Resource',
      click: (menuItem) => {
        const res = menuItem as unknown as ContextMenuResult;
        const editResource = res.data.item as ResourceItem;

        setSelectedResource(editResource);
        setIsOpenResourceBrowser(true);
      },
    },
    {
      label: 'Preview',
      click: (menuItem) => {
        const res = menuItem as unknown as ContextMenuResult;
        const previewResource = res.data.item as ProjectResource;

        Projects.previewAsset({
          asset: previewResource,
          meta: projectMeta,
        }).then((res) => {
          if (res.error) {
            sys.messageDialog({
              message: res.message,
            });
          }
        });
      },
    },
    { type: 'separator' },
    {
      label: 'Remove Resource',
      click: (menuItem) => {
        const res = menuItem as unknown as ContextMenuResult;
        const editResource = res.data.item as ResourceItem;

        sys
          .messageDialog({
            message: 'Are you sure?',
            buttons: ['Remove Resource', 'Cancel'],
            detail: editResource.title || editResource.filename,
          })
          .then((res) => {
            if (res.error) {
              console.error(res);
              return;
            }

            if (res.data.response === 0) {
              Projects.removeResourceItem(editResource);
            }
          });
      },
    },
  ];

  const handleResourceMenu = (
    ev: React.MouseEvent,
    resource?: ResourceItem
  ) => {
    const target = ev.target as HTMLElement;

    if (resource) {
      setSelectedResource(resource);
    }

    menu.API.contextMenu(
      ev,
      resourceMenu,
      { item: resource },
      { alignment: 'left-bottom' }
    ).then((result) => {
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

  useEffect(() => {
    const handleControls = (ev: KeyboardEvent) => {
      switch (ev.code) {
        case 'Escape':
          if (!isOpenAssetBrowser) {
            setIsOpenResourceBrowser(false);
            break;
          }
      }
    };

    if (isOpenResourceBrowser) {
      window.addEventListener('keydown', handleControls);
    } else {
      window.removeEventListener('keydown', handleControls);
    }

    return () => {
      window.removeEventListener('keydown', handleControls);
    };
  }, [isOpenResourceBrowser, isOpenAssetBrowser]);

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
              <div
                key={idx}
                className={css.tabResourcesItem}
                onClick={() => {
                  handleOpenResourceBrowser(editableResource);
                }}
                onContextMenu={(ev) => {
                  handleResourceMenu(ev, editableResource);
                }}
              >
                <div className="d-flex justify-content-between">
                  <dt className={css.tabResourcesItemTitle}>
                    <AssetIcon
                      type={editableResource.type}
                      ext={editableResource.ext}
                    />
                    <span>{editableResource.title}</span>
                  </dt>
                  <ui.Button
                    className={css.actionMenu}
                    variant="ghost"
                    onClick={(ev) => {
                      handleResourceMenu(ev, editableResource);
                    }}
                    onContextMenu={(ev) => {
                      handleResourceMenu(ev, editableResource);
                    }}
                  >
                    <ui.Icon
                      display="rounded"
                      icon="more_vert"
                      opsz={20}
                      filled
                    />
                  </ui.Button>
                </div>
                <dd className="tab_resources__item--description">
                  {editableResource.description}
                </dd>
              </div>
            );
          })}
        </dl>
        <div className="owl-sticky-add-item">
          <ui.Button
            className="owl-sticky-add-item__button"
            onContextMenu={() => {
              handleOpenResourceBrowser(newResource);
            }}
            onClick={() => {
              handleOpenResourceBrowser(newResource);
            }}
          >
            <span className="txt-placeholder">Add a new resource...</span>
            <ui.Icon
              display="rounded"
              icon="attach_file"
              opsz={20}
              filled
              pxScale="Lg"
            />
          </ui.Button>
        </div>
      </div>
      <ResourceOverlay
        isOpen={isOpenResourceBrowser}
        onClose={handleCloseResourceBrowser}
        onSubmit={handleSubmitResource}
        resourceItem={selectedResource}
        isOpenAssetBrowser={isOpenAssetBrowser}
        setIsOpenAssetBrowser={setIsOpenAssetBrowser}
      />
    </>
  );
};

export default {
  Resources,
};
