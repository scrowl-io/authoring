import React from 'react';

export const GroupIcon = (key, props) => {
  const color = props.color || '#666';
  const fontSize =
    (Math.max(Math.min(parseInt(props.size), 18), 10) || 16) + 'px';

  return (
    <span
      key={key}
      style={{
        fontSize,
        color,
      }}
      className="material-symbols-sharp"
    >
      {props.name}
    </span>
  );
};

export const GroupText = (key, props) => {
  const color = props.color || '#666';

  return (
    <span
      key={key}
      style={{
        color,
      }}
      className="text"
    >
      {props.text}
    </span>
  );
};

export const GroupElement = (position: string, props: any): any => {
  if (!props || !props.items || !props.items.length) {
    return null;
  }

  const width = parseInt(props.width) ? parseInt(props.width) + 'px' : 'auto';

  const children: any = [];

  let keyIndex = 0;
  props.items.forEach((item) => {
    keyIndex++;
    if (item.type === 'icon') {
      children.push(GroupIcon('key_' + keyIndex, item));
    } else {
      children.push(GroupText('key_' + keyIndex, item));
    }
  });

  return (
    <span className={'input-group-text ' + position} style={{ width }}>
      {children}
    </span>
  );
};

export default {
  GroupElement,
  GroupIcon,
  GroupText,
};
