import React from 'react';
import { ui, IconType } from '@scrowl/ui';
import { AssetIconProps } from './';

export const AssetIcon = ({ type, ext, ...props }: AssetIconProps) => {
  let icon = '' as IconType;

  switch (type) {
    case 'audio':
      icon = 'audio_file';
      break;
    case 'image':
      icon = 'image';
      break;
    case 'video':
      icon = 'video_file';
      break;
    case 'json':
    case 'document':
    default:
      icon = 'description';

      if (ext) {
        switch (ext) {
          case 'pdf':
            icon = 'picture_as_pdf';
            break;
          case 'zip':
            icon = 'folder_zip';
            break;
        }
      }
      break;
  }

  return <ui.Icon icon={icon} {...props} />;
};
