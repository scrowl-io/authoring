import React, { useState } from 'react';
import { ui } from '@scrowl/ui';
import { AssetEntryProps } from './asset.types';
import { menu, sys } from '../../../../../services';
import { AssetIcon, InlineInput } from '../../../../../components';
import { Projects } from '../../../../../models';

export const AssetEntry = ({
  asset,
  colType,
  colSize,
  onSelected,
  ...props
}: AssetEntryProps) => {
  const projectMeta = Projects.useMeta();
  const [isEdit, setIsEdit] = useState(false);
  let fileSizeBytes = asset.size;
  const assetEntryMenu: Array<menu.ContextMenuItem> = [
    {
      label: 'Rename',
      click: () => {
        setIsEdit(true);
      },
    },
    {
      label: 'Preview',
      click: () => {
        Projects.previewAsset({
          asset,
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
      label: 'Remove',
      click: () => {
        Projects.removeAsset(asset);
      },
    },
  ];

  const fileSizeKB = Math.round(fileSizeBytes / 102.4) / 10;
  const fileSizeMB = Math.round(fileSizeKB / 102.4) / 10;
  const fileSizeGB = Math.round(fileSizeMB / 102.4) / 10;

  let fileSize = [fileSizeKB, 'KB'];

  if (fileSizeMB >= 1000) {
    fileSize = [fileSizeGB, 'GB'];
  } else if (fileSizeKB >= 1000) {
    fileSize = [fileSizeMB, 'MB'];
  }

  const handleAssetMenu = (ev: React.MouseEvent) => {
    const target = ev.target as HTMLElement;

    menu.API.contextMenu(ev, assetEntryMenu).then((result) => {
      target.blur();
    });
  };

  const handleSelected = () => {
    onSelected(asset);
  };

  const handleTitleChange = (val) => {
    const updateData = {
      ...asset,
      title: val,
    };

    Projects.setAsset(updateData);
  };

  const handleTitleClose = () => {
    setIsEdit(false);
  };

  return (
    <tr className="asset-list-entry">
      <td className="truncate asset__title">
        <div className="wrapper name" onClick={handleSelected}>
          <AssetIcon type={asset.type} ext={asset.ext} />
          <InlineInput.Text
            isEdit={isEdit}
            text={asset.sourceFilename}
            onChange={handleTitleChange}
            onBlur={handleTitleClose}
          />
        </div>
      </td>
      <td className="asset__type" style={colType}>
        <div className="wrapper">{asset.type}</div>
      </td>
      <td className="asset__file-size">
        <div className="wrapper">
          <span className="asset__file-size-label">
            <span>{fileSize[0]}</span>
            <span className="size-unit">{fileSize[1]}</span>
          </span>

          <ui.Button
            className="action-menu"
            variant="ghost"
            onClick={(ev) => {
              handleAssetMenu(ev);
            }}
            onContextMenu={(ev) => {
              handleAssetMenu(ev);
            }}
          >
            <ui.Icon
              display="rounded"
              icon="more_vert"
              opsz={20}
              filled
              pxScale="Sm"
            />
          </ui.Button>
        </div>
      </td>
    </tr>
  );
};

export default {
  AssetEntry,
};
