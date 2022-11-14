import React from 'react';
import { Button, Icon } from '@owlui/lib';
import { AssetEntryProps } from './asset.types';
import { menu } from '../../../../../../services';
import { AssetIcon } from '../../../../../../components';

export const AssetEntry = ({
  asset,
  colType,
  colSize,
  onSelected,
  ...props
}: AssetEntryProps) => {
  let fileSizeBytes = asset.size;
  // const searchTerm = props.searchHighlight || '';
  const assetEntryMenu: Array<menu.ContextMenuItem> = [
    {
      label: 'Rename',
      click: () => {
        console.log('rename asset entry');
      },
    },
    { type: 'separator' },
    {
      label: 'Remove',
      click: () => {
        console.log('remove asset entry');
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
    ev.preventDefault();

    const target = ev.target as HTMLElement;

    menu.API.contextMenu(assetEntryMenu).then((result) => {
      console.log('asset entry menu close', result);
      target.blur();
    });
  };

  const handleSelected = () => {
    onSelected(asset);
  };

  return (
    <tr className="asset-list-entry">
      <td className="truncate">
        <div className="wrapper name" onClick={handleSelected}>
          <AssetIcon type={asset.type} ext={asset.ext} />
          <span>{asset.filename}</span>
        </div>
      </td>
      <td style={colType}>
        <div className="wrapper">{asset.ext}</div>
      </td>
      <td className="file-size">
        <div className="wrapper">
          <span className="file-size-label">
            <span>{fileSize[0]}</span>
            <span className="size-unit">{fileSize[1]}</span>
          </span>

          <Button
            className="action-menu"
            variant="ghost"
            onClick={(ev) => {
              handleAssetMenu(ev);
            }}
            onContextMenu={(ev) => {
              handleAssetMenu(ev);
            }}
          >
            <Icon
              display="rounded"
              icon="more_vert"
              opsz={20}
              filled
              pxScale="Sm"
            />
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default {
  AssetEntry,
};
