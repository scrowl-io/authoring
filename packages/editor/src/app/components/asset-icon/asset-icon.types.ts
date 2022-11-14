import { IconsDefaultProps } from '@owlui/lib';
import type { AssetType } from '../../../main/services/file-system/fs.types';

export interface AssetIconProps extends Omit<IconsDefaultProps, 'icon'> {
  type: AssetType;
  ext?: string;
};
