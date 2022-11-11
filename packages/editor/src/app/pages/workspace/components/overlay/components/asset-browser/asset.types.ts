import React from 'react';
import { AssetType } from '../../../../../../../main/services/file-system/fs.types';

export type { AssetType } from '../../../../../../../main/services/file-system/fs.types';

export type AssetProgressProps = {
  filename: string;
  progress: number;
};

export interface AssetBrowserCommons {
  isOpen: boolean;
  onClose: (data?: any) => void;
  onSelected: (data?: any) => void;
  assetTypes: Array<AssetType>;
};

export type AssetBrowserProps = AssetBrowserCommons & React.AllHTMLAttributes<HTMLDivElement>;
