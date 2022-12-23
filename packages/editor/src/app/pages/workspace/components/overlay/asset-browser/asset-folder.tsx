import React from 'react';
import Highlighter from 'react-highlight-words';
import { menu } from '../../../../../services';

export const AssetFolder = (props: any) => {
  const searchTerm = props.searchHighlight || '';
  const assetFolderMenu: Array<menu.ContextMenuItem> = [
    {
      label: 'Rename',
      click: () => {
        console.log('rename asset folder');
      },
    },
    { type: 'separator' },
    {
      label: 'Remove',
      click: () => {
        console.log('remove asset folder');
      },
    },
  ];

  const handleAssetMenu = (ev: React.MouseEvent) => {
    const target = ev.target as HTMLElement;

    menu.API.contextMenu(ev, assetFolderMenu).then((result) => {
      target.blur();
    });
  };

  return (
    <>
      <tr
        className={'asset-list-folder' + (props.expanded ? ' expanded ' : '')}
        onContextMenu={handleAssetMenu}
      >
        <td colSpan={3} className="truncate">
          <div className="wrapper">
            <a
              href="#"
              role="button"
              onClick={(e) => {
                e.preventDefault();
                props.onToggleExpand();
              }}
            >
              <span
                className={
                  'material-symbols-rounded scrowl-outline__detail-icon ' +
                  (props.expanded ? ' active ' : '')
                }
              >
                folder
              </span>
              <Highlighter
                className="highlighter"
                highlightClassName="highlight"
                searchWords={[searchTerm]}
                autoEscape={true}
                textToHighlight={props.data.name}
              />
            </a>
          </div>

          <div className="actions-container">
            <button
              className="btn  btn-outline-primary btn-sm action"
              type="button"
              onClick={handleAssetMenu}
            >
              <span className="material-symbols-sharp">arrow_drop_down</span>
            </button>
            {/* <ul className="dropdown-menu">
              <li>
                <button className="dropdown-item" onClick={() => {}}>
                  <span className="material-symbols-sharp owl-dropdown-icon">border_color</span>
                  Rename
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => {}}>
                  <span className="material-symbols-sharp owl-dropdown-icon">swap_horiz</span>
                  Update
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => {}}>
                  <span className="material-symbols-sharp owl-dropdown-icon">delete</span>
                  Delete
                </button>
              </li>
            </ul> */}
          </div>
        </td>

        {/* <td className="text-right actions">
          
        </td> */}
      </tr>
      {props.expanded && props.children}
      {props.expanded && (!props.children || !props.children.length) ? (
        <tr className="asset-list-folder no-folder-results">
          <td colSpan={4} className="truncate">
            <button
              className="btn  btn-link "
              onClick={(e) => {
                e.preventDefault();
                // Add File
              }}
            >
              + Add New File
            </button>
          </td>
        </tr>
      ) : null}

      {props.expanded && props.children ? (
        <tr className="empty">
          <td colSpan={4}></td>
        </tr>
      ) : null}
    </>
  );
};

export default {
  AssetFolder,
};
