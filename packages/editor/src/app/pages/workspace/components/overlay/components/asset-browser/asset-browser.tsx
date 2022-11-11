import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Backdrop } from '../backdrop';
import { Drawer } from '..';
import { Projects, Settings } from '../../../../../../models';
import { menu, sys } from '../../../../../../services';
import '../../_overlay.scss';
import {
  AssetSearch,
  AssetProgress,
  AssetEntry,
  AssetBrowserProps,
  AssetType,
} from './';

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
  const initialUploadAssetState = {
    filename: '',
  };
  const [isCopying, setIsCopying] = useState(false);
  const [uploadAsset, setUploadAsset] = useState(initialUploadAssetState);
  const [copyProgress, setCopyProgress] = useState(0);

  const searchAssetList = (val: string) => {};

  const handleClose = () => {
    onClose();
  };

  const handleAddFile = () => {
    const types = assetTypes as Array<AssetType>;

    Projects.upload({ meta: meta, options: { assetTypes: types } }).then(
      (res) => {
        if (res.error) {
          sys.messageDialog({
            message: res.message,
          });
          return;
        }

        Projects.addAsset(res.data);
      }
    );
  };

  const handlePreventBubbling = (ev) => {
    ev.bubbles = false;
    ev.stopPropagation();
    ev.preventDefault();
  };

  useEffect(() => {
    if (isCopying) {
      window.addEventListener('keydown', handlePreventBubbling, {
        capture: true,
      });
    }

    return () => {
      window.removeEventListener('keydown', handlePreventBubbling, {
        capture: true,
      });
    };
  }, [isCopying]);

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
              slideFrom="right"
              style={styles}
            >
              <div className="offcanvas-header">
                <h4 className="offcanvas-title mb-0">Project Files</h4>
                <button type="button" className="btn-close" onClick={onClose} />
              </div>

              {isCopying && (
                <AssetProgress
                  filename={uploadAsset.filename}
                  progress={copyProgress}
                />
              )}

              <div className="offcanvas-body">
                <div className="owl-offcanvas-form">
                  <div className="asset-browser-body">
                    <AssetSearch onChange={searchAssetList} />
                    <div className="mt-2 asset-list">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Name</th>
                            <th scope="col" style={stylesColType}>
                              Type
                            </th>
                            <th scope="col" style={stylesColSize}>
                              Size
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {assets.length ? (
                            assets.map((asset, idx) => {
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
                      {assets.length ? (
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
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const appNode = document.getElementById('app');

    if (appNode && overlayRef.current && isOpen) {
      appNode.appendChild(overlayRef.current);
    }
  }, [overlayRef, isOpen]);

  return <AssetDrawer {...props} isOpen={isOpen} ref={overlayRef} />;
};

export default {
  AssetBrowser,
};
