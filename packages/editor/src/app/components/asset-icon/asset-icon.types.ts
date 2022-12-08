import { IconDefaultProps } from '@scrowl/ui';
import type { AssetType } from '../../../main/services/file-system/fs.types';

export interface AssetIconProps extends Omit<IconDefaultProps, 'icon'> {
  type: AssetType;
  ext?: string;
};
