import React, { useEffect, useState, useRef } from 'react';
import { rq, menu, events } from '../../services';

export type ContextMenuProps = React.AllHTMLAttributes<HTMLDivElement>;

export const Menu = ({ ...props }: ContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement>();
  const [menuConfig, setMenuConfig] = useState<menu.ContextMenuPayload>();

  const hideMenu = () => {
    if (!menuRef.current) {
      return;
    }

    menuRef.current.style.left = '-1000px';
    menuRef.current.style.top = '-1000px';
  };

  const handleSelectItem = (ev, item) => {
    events.contextMenu.close({
      canceled: false,
      item,
    });
    hideMenu();
  };

  useEffect(() => {
    const handleOpen = (ev) => {
      if (!menuRef.current) {
        console.error('Unable to create menu: menu not set');
        return;
      }

      const config = ev.detail.config as menu.ContextMenuPayload;

      triggerRef.current = ev.detail.target as HTMLElement;
      setMenuConfig(config);
      menuRef.current.style.left = `${config.position[0]}px`;
      menuRef.current.style.top = `${config.position[1]}px`;
    };

    const handleCancel = (ev) => {
      if (!menuRef.current) {
        return;
      }

      const target = ev.toElement as HTMLElement;
      const isMenuElem = menuRef.current.isSameNode(target);
      const isInMenu = menuRef.current.contains(target);
      const isTriggerElem = !triggerRef.current
        ? false
        : triggerRef.current.isSameNode(target);
      const isInTriggerElem = !triggerRef.current
        ? false
        : triggerRef.current.contains(target);

      if (isMenuElem || isInMenu || isTriggerElem || isInTriggerElem) {
        return;
      }

      events.contextMenu.close({
        canceled: true,
      });
      hideMenu();
    };

    events.contextMenu.onOpen(handleOpen);
    document.addEventListener('mousedown', handleCancel);

    return () => {
      events.contextMenu.offOpen(handleOpen);
      document.removeEventListener('mousedown', handleCancel);
    };
  }, [menuRef.current]);

  return (
    <div ref={menuRef} className="context-menu-container">
      <ul className="context-menu">
        {menuConfig?.menuItems.map((item, idx) => {
          switch (item.type) {
            case 'separator':
              return (
                <li key={idx} className="context-menu-separator">
                  <hr />
                </li>
              );
            case 'normal':
            default:
              return (
                <li
                  key={idx}
                  className="context-menu-item"
                  onClick={(ev) => {
                    handleSelectItem(ev, item);
                  }}
                >
                  {item.label}
                </li>
              );
          }
        })}
      </ul>
    </div>
  );
};

export const create = (
  target: HTMLElement,
  config: menu.ContextMenuPayload
) => {
  return new Promise<rq.ApiResult>((resolve) => {
    const container = document.getElementById('app') as HTMLElement;

    if (!container) {
      resolve({
        error: true,
        message: 'Unable to create context menu: container element not found',
        data: config,
      });
      return;
    }

    const closeHandler = (ev) => {
      resolve({
        error: false,
        data: ev.detail,
      });
    };

    events.contextMenu.onClose(closeHandler);
    events.contextMenu.open(target, config);
  });
};

export default {
  Menu,
  create,
};
