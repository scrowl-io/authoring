import React from 'react';
import Highlighter from 'react-highlight-words';
import { menu } from '../../../../../../services';

export const AssetEntry = (props: any) => {
  let fileSizeBytes = props.data.size;
  const searchTerm = props.searchHighlight || '';
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

  return (
    <tr
      className={
        'asset-list-entry ' +
        (props.data.parentFolderId === -1 ? 'root-entry' : '')
      }
      style={
        props.data.filterMatch ? {} : { pointerEvents: 'none', opacity: '0.5' }
      }
    >
      <td className="truncate">
        <div className="wrapper name">
          <a
            href="#"
            role="button"
            onClick={(e) => {
              e.preventDefault();
              props.onSelect();
            }}
          >
            <Highlighter
              className="highlighter"
              highlightClassName="highlight"
              searchWords={[searchTerm]}
              autoEscape={true}
              textToHighlight={props.data.name}
            />
          </a>
        </div>
      </td>
      <td style={{ width: '65px', maxWidth: '65px' }}>
        <div className="wrapper">
          <Highlighter
            className="highlighter"
            highlightClassName="highlight"
            searchWords={[props.searchHighlight]}
            autoEscape={true}
            textToHighlight={props.data.type}
          />
        </div>
      </td>
      <td className="file-size">
        <div className="wrapper ">
          {fileSize[0]}
          <span className="size-unit">{fileSize[1]}</span>
        </div>

        <div className="actions-container">
          <button
            className="btn  btn-outline-primary btn-sm action"
            type="button"
            onClick={handleAssetMenu}
          >
            <span className="material-symbols-sharp">arrow_drop_down</span>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default {
  AssetEntry,
};
