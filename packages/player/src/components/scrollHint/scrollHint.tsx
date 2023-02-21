import React, { useEffect, useState } from 'react';
import utils from '../../utils';
import * as _css from './_scrollHint.scss';

const css = utils.css.removeMapPrefix(_css);

export const ScrollHint = () => {
  const [visible, setVisible] = useState(false);
  const [noticeVisible, setNoticeVisible] = useState(false);
  const [busy, setBusy] = useState(false);

  let secondsSinceIdle = 0;

  const onScroll = () => {
    updateBusy();

    if (visible) {
      hide();
    }

    secondsSinceIdle = 0;
  };

  const updateBusy = () => {
    if (visible) {
      hide();
    }

    setBusy(true);
  };

  const checkIdleStatus = () => {
    secondsSinceIdle++;

    if (!visible && secondsSinceIdle > 5) {
      show();
    }

    if (!noticeVisible && secondsSinceIdle > 10) {
      showNotice();
    }
  };

  const show = () => {
    setBusy(false);
    setVisible(true);
  };

  const showNotice = () => {
    if (noticeVisible) {
      return;
    }

    setNoticeVisible(true);
  };

  const hide = () => {
    if (!visible && !noticeVisible) {
      return;
    }

    setVisible(false);
    setNoticeVisible(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    setInterval(checkIdleStatus, 1000);
  }, [busy]);

  return (
    <div className={css.scrollHint + (visible ? ' visible' : '')}>
      <div
        className={css.hintText + (visible && noticeVisible ? ' visible' : '')}
      >
        <span>Scroll To Continue</span>
      </div>
      <div className={css.iconScroll}></div>
    </div>
  );
};

export default {
  ScrollHint,
};
