import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ui, IconType } from '@scrowl/ui';
import { Backdrop, Drawer } from '../../../../../components';
import { Projects, Settings } from '../../../../../models';
import { menu, sys } from '../../../../../services';
import { List, Elem } from '../../../../../utils';
import '../_overlay.scss';
import {
  AssetSearch,
  AssetProgress,
  AssetEntry,
  AssetBrowserProps,
  AssetType,
} from '.';

export const AssetDrawerElement = (
  {
    className,
    isOpen,
    onClose,
    onSelected,
    assetTypes,
    ...props
  }: AssetBrowserProps,
  ref
) => {
  const animationSettings = Settings.useAnimation();
  const isAnimated = !animationSettings.reducedAnimations;
  const meta = Projects.useMeta();
  const assets = Projects.useAssets(assetTypes);
  const prevAssets = useRef(assets);
  const styles = {
    maxWidth: 450,
    width: 450,
  };
  const stylesColType = {
    width: '65px',
    maxWidth: '65px',
  };
  const stylesColSize = {
    width: '80px',
    maxWidth: '80px',
  };
  const initialCopyProgress = {
    filename: '',
    type: '',
    message: '',
    steps: 0,
    step: 0,
    stats: {
      completed: -1,
      progress: -1,
      total: -1,
    },
  };
  const [isCopying, setIsCopying] = useState(false);
  const [copyProgress, setCopyProgress] = useState(initialCopyProgress);
  const [filterInput, setFilterInput] = useState('');
  const [filteredAssets, setFilterAssets] = useState<
    Array<Projects.ProjectAsset>
  >([]);
  const [sortField, setSortField] = useState('sourceFilename');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortIcon, setSortIcon] = useState<IconType>('arrow_drop_down');

  const sortAssetList = () => {
    let sortedList: Array<Projects.ProjectAsset> = assets.slice();

    List.sortBy(sortedList, sortField, sortOrder === 'desc');

    return sortedList;
  };

  const searchAssetList = () => {
    let filteredList: Array<Projects.ProjectAsset> = [];

    const filterAssetList = (asset: Projects.ProjectAsset) => {
      return asset.sourceFilename.indexOf(filterInput) !== -1;
    };

    if (!filterInput || !filterInput.length) {
      filteredList = sortAssetList();
    } else {
      filteredList = sortAssetList().filter(filterAssetList);
    }

    setFilterAssets(filteredList);
  };

  const handleFilterInput = (filterValue: string) => {
    setFilterInput(filterValue);
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
    onClose();
  };

  const handleAddFile = () => {
    const types = assetTypes as Array<AssetType>;

    setCopyProgress(initialCopyProgress);
    setIsCopying(true);

    Projects.upload({ meta: meta, options: { assetTypes: types } }).then(
      (res) => {
        if (res.error) {
          setIsCopying(false);
          setCopyProgress(initialCopyProgress);
          sys.messageDialog({
            message: res.message,
          });
          return;
        }

        if (res.data.canceled) {
          setIsCopying(false);
          setCopyProgress(initialCopyProgress);
          return;
        }

        Projects.addAsset(res.data);
        setIsCopying(false);
        setCopyProgress(initialCopyProgress);
      }
    );
  };

  const handlePreventBubbling = (ev) => {
    Elem.stopEvent(ev);
  };

  const updateUploadProgress = (ev, uploadProgress) => {
    if (isCopying) {
      console.log('uploadProgress', uploadProgress);
      setCopyProgress(uploadProgress);
    }
  };

  useEffect(() => {
    Projects.API.onUploadProgress(updateUploadProgress);

    if (isCopying) {
      window.addEventListener('keydown', handlePreventBubbling, {
        capture: true,
      });
    }

    return () => {
      Projects.API.offUploadProgress();
      window.removeEventListener('keydown', handlePreventBubbling, {
        capture: true,
      });
    };
  }, [isCopying]);

  useEffect(() => {
    searchAssetList();
  }, [filterInput, sortField, sortOrder]);

  useEffect(() => {
    if (assets.length !== prevAssets.current.length) {
      searchAssetList();
      prevAssets.current = assets;
    }
  }, [assets, prevAssets]);

  useEffect(() => {
    if (isOpen) {
      menu.API.disableProjectActions();
    } else {
      menu.API.enableProjectActions();
    }
  }, [isOpen]);

  return (
    <div ref={ref}>
      <AnimatePresence>
        {isOpen && (
          <div className={className}>
            <Backdrop
              className="asset-browser-overlay-backdrop"
              onClick={handleClose}
            />
            <Drawer
              isAnimated={isAnimated}
              isOpen={isOpen}
              onClose={onClose}
              slideFrom="right"
              style={styles}
            >
              {isCopying && <AssetProgress progress={copyProgress} />}

              <div className="offcanvas-header">
                <h4 className="offcanvas-title mb-0">Project Files</h4>
                <button type="button" className="btn-close" onClick={onClose} />
              </div>

              <div className="offcanvas-body">
                <div className="owl-offcanvas-form">
                  <div className="asset-browser-body">
                    <AssetSearch isOpen={isOpen} onSubmit={handleFilterInput} />
                    <div className="mt-2 asset-list">
                      <table className="table">
                        <thead>
                          <tr onClick={handleSortOrder}>
                            <th scope="col" data-sort-field="sourceFilename">
                              Name
                              {sortField === 'sourceFilename' && (
                                <ui.Icon
                                  className="sort-indicator"
                                  icon={sortIcon}
                                />
                              )}
                            </th>
                            <th
                              scope="col"
                              data-sort-field="type"
                              style={stylesColType}
                            >
                              Type
                              {sortField === 'type' && (
                                <ui.Icon
                                  className="sort-indicator"
                                  icon={sortIcon}
                                />
                              )}
                            </th>
                            <th
                              scope="col"
                              data-sort-field="size"
                              style={stylesColSize}
                            >
                              Size
                              {sortField === 'size' && (
                                <ui.Icon
                                  className="sort-indicator"
                                  icon={sortIcon}
                                />
                              )}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredAssets.length ? (
                            filteredAssets.map((asset, idx) => {
                              return (
                                <AssetEntry
                                  key={idx}
                                  asset={asset}
                                  colType={stylesColType}
                                  colSize={stylesColSize}
                                  onSelected={onSelected}
                                />
                              );
                            })
                          ) : (
                            <></>
                          )}
                        </tbody>
                      </table>
                      {filteredAssets.length ? (
                        <></>
                      ) : (
                        <div style={{ textAlign: 'center' }} className="mt-3">
                          No Project Files
                        </div>
                      )}
                    </div>
                  </div>

                  <footer className="d-flex justify-content-end my-3">
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={onClose}
                    >
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
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const AssetDrawer = forwardRef(AssetDrawerElement);

export const AssetBrowser = ({ isOpen, ...props }: AssetBrowserProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const appNode = document.getElementById('app');

    if (appNode && overlayRef.current && isOpen) {
      appNode.appendChild(overlayRef.current);
    }

    return () => {
      if (containerRef.current && overlayRef.current) {
        containerRef.current.appendChild(overlayRef.current);
      }
    };
  }, [overlayRef, isOpen]);

  return (
    <div ref={containerRef}>
      <AssetDrawer {...props} isOpen={isOpen} ref={overlayRef} />
    </div>
  );
};

export default {
  AssetBrowser,
};
