import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Backdrop } from '../backdrop';
import { Drawer } from '..';
import { Projects, Settings } from '../../../../../../models';
import '../../_overlay.scss';
import { AssetSearch } from './asset-search';
import { AssetFolder } from './asset-folder';
import { AssetEntry } from './asset-entry';

export const AssetDrawer = ({ isOpen, onClose, onSelected, ...props }) => {
  const assets = Projects.useAssets();
  const [isCopying, setIsCopying] = useState(false);
  const [copyProgress, setCopyProgress] = useState({
    fileName: '',
    totalProgress: 0,
  });
  const animationSettings = Settings.useAnimation();
  const isAnimated = !animationSettings.reducedAnimations;
  const styles = {
    maxWidth: 450,
    width: 450,
  };
  const fileTypes = {
    JPG: 'Image',
    JPEG: 'Image',
    WEBP: 'Image',
    PNG: 'Image',
    GIF: 'Image',
    TIFF: 'Image',

    SVG: 'SVG',
    PDF: 'PDF',

    LOTTIE: 'Lottie',

    MP4: 'Video',
    AVI: 'Video',
    WEBM: 'Video',
  };
  const filter: any = props.data ? props.data.filter : false;
  const [expandedFolders, setExpandedFolders] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const searchTermLower = searchTerm ? (searchTerm as any).toLowerCase() : '';

  const assetList: any = [];
  const folderList: any = [];
  let sortKey = 'name';
  let sortOrder = 'asc';
  let rootComponents: any = [];
  const assetComponents: any = {};

  assets.forEach((asset) => {
    let parentFolderId = -1;

    const fileName = asset.fileName;
    const fileType =
      fileTypes[asset.fileExt.toUpperCase()] || asset.fileExt.toLowerCase();
    const fileId = asset.fileHash;
    const fileSize = asset.fileSize;

    assetList.push({
      fileId,
      fileName,
      fileType,
      fileExt: asset.fileExt,
      fileSize,
      parentFolderId,
      filterMatch:
        filter && fileType.toLowerCase() === filter.toLowerCase()
          ? 1
          : filter
          ? 0
          : 1,
    });
  });

  folderList.sort((a: any, b: any) => b.folderName.localeCompare(a.folderName));

  switch (sortKey) {
    case 'name':
      if (sortOrder === 'desc') {
        assetList.sort((a: any, b: any) =>
          b.fileName.localeCompare(a.fileName)
        );
        // Only situation we need to sort folder list
        folderList.sort((a: any, b: any) =>
          a.folderName.localeCompare(b.folderName)
        );
      } else {
        assetList.sort((a: any, b: any) =>
          a.fileName.localeCompare(b.fileName)
        );
      }
      break;
    case 'type':
      if (sortOrder === 'desc') {
        assetList.sort((a: any, b: any) =>
          b.fileType.localeCompare(a.fileType)
        );
      } else {
        assetList.sort((a: any, b: any) =>
          a.fileType.localeCompare(b.fileType)
        );
      }
      break;
    case 'size':
      if (sortOrder === 'desc') {
        assetList.sort((a: any, b: any) => b.fileSize - a.fileSize);
      } else {
        assetList.sort((a: any, b: any) => a.fileSize - b.fileSize);
      }
      break;
    default: // assume name+asc
      assetList.sort((a: any, b: any) => a.fileName.localeCompare(b.fileName));
  }

  assetList.sort((a: any, b: any) => b.filterMatch - a.filterMatch);
  assetComponents[-1] = [];

  assetList.forEach((asset) => {
    const {
      fileId,
      fileName,
      fileType,
      fileSize,
      parentFolderId,
      filterMatch,
      fileExt,
    } = asset;

    const fileNameLower = fileName.toLowerCase();
    const fileTypeLower = fileType.toLowerCase();
    let searchFound = searchTermLower
      ? fileNameLower.includes(searchTermLower) ||
        fileTypeLower.includes(searchTermLower)
      : true;

    if (searchFound) {
      if (!assetComponents[parentFolderId]) {
        assetComponents[parentFolderId] = [];
      }

      const entry = (
        <AssetEntry
          searchHighlight={searchTerm}
          key={'asset_' + fileId}
          data={{
            id: fileId,
            name: fileName,
            size: fileSize,
            type: fileType,
            parentFolderId,
            filterMatch,
            fileExt,
          }}
          onSelect={() => {
            // dispatch(
            //   uiActions.closeOverlay({
            //     fileName,
            //     fileId,
            //     fileExt,
            //     fileSize,
            //     fileType,
            //     asset: fileId + "." + fileExt,
            //   })
            // );
          }}
        />
      );

      if (parentFolderId < 0) {
        rootComponents.push(entry);
      } else {
        assetComponents[parentFolderId].push(entry);
      }
    }
  });

  folderList.forEach((folder) => {
    const { folderName, folderId } = folder;

    let searchFound = searchTermLower
      ? assetComponents[folderId] && assetComponents[folderId].length > 0
      : true;

    if (searchFound) {
      rootComponents.unshift(
        <AssetFolder
          searchHighlight={searchTerm && searchTerm}
          key={'folder_' + folderId}
          data={{
            id: folderId,
            name: folderName,
          }}
          expanded={
            (searchTerm && (searchTerm as any).length > 0) ||
            expandedFolders[folderId]
          }
          onToggleExpand={() => {
            const newExpandedState: any = [...expandedFolders];
            newExpandedState[folderId] = !expandedFolders[folderId];
            setExpandedFolders(newExpandedState);
          }}
        >
          {assetComponents[folderId]}
        </AssetFolder>
      );
    }
  });

  const handleSubmit = (ev: React.MouseEvent<Element, MouseEvent>) => {
    ev.preventDefault();
    console.log('file selected');
    // onSelected();
  };

  const handleAddFile = () => {
    console.log('adding file');
  };

  const handleBlockEvents = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
  };

  useEffect(() => {
    if (isCopying) {
      window.addEventListener('keydown', handleBlockEvents, { capture: true });
    }

    return () => {
      window.removeEventListener('keydown', handleBlockEvents, {
        capture: true,
      });
    };
  }, [isCopying]);

  return (
    <>
      <Drawer
        isAnimated={isAnimated}
        isOpen={isOpen}
        slideFrom="right"
        style={styles}
      >
        <div className="offcanvas-header">
          <h4 className="offcanvas-title mb-0">Project Files</h4>
          <button type="button" className="btn-close" onClick={onClose} />
        </div>

        {isCopying ? (
          <>
            <div className="copy-assets-progress-blocker"></div>

            <div className="copy-assets-progress">
              <div className="progress-container">
                <b>Adding Files...</b>
                <div className="mb-2 file-name">{copyProgress.fileName}</div>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    aria-label="Basic example"
                    style={{ width: copyProgress.totalProgress + '%' }}
                    aria-valuenow={50}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}

        <div className="offcanvas-body">
          <div className="owl-offcanvas-form">
            <div className="asset-browser-body">
              <AssetSearch
                onChange={(value) => {
                  const searchTerm = value.trim();
                  setSearchTerm(searchTerm);
                }}
              />
              <div className="mt-2 asset-list">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th
                        scope="col"
                        style={{
                          width: '65px',
                          maxWidth: '65px',
                        }}
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        style={{
                          width: '80px',
                          maxWidth: '80px',
                        }}
                      >
                        Size
                      </th>
                    </tr>
                  </thead>
                  <tbody>{rootComponents}</tbody>
                </table>
                {rootComponents.length === 0 && searchTerm ? (
                  <div style={{ textAlign: 'center' }} className="mt-3">
                    No Search Results Found
                  </div>
                ) : (
                  <></>
                )}

                {rootComponents.length === 0 && !searchTerm ? (
                  <div style={{ textAlign: 'center' }} className="mt-3">
                    No Project Files or Folders
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <footer className="d-flex justify-content-end my-3">
              <button type="button" className="btn btn-link" onClick={onClose}>
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleAddFile}
              >
                Add New File
              </button>
            </footer>
          </div>
        </div>
      </Drawer>
      {isOpen ? (
        <Backdrop
          className="asset-browser-overlay-backdrop"
          isAnimated={isAnimated}
          onClick={onClose}
          {...props}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export const AssetBrowser = (props) => {
  return (
    <AnimatePresence>
      <AssetDrawer {...props} />
    </AnimatePresence>
  );
};

export default {
  AssetBrowser,
};
