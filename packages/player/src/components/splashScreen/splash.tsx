import React, { useEffect, useState } from 'react';
import { ClimbingBoxLoader } from 'react-spinners';
import utils from '../../utils';
import * as _css from './_splash.scss';

export const Splash = () => {
  const [isLoading, setIsLoading] = useState(false);
  const css = utils.css.removeMapPrefix(_css);
  const override = {
    marginTop: '3em',
  };

  useEffect(() => {
    const handleSetIsLoading = () => {
      setIsLoading(true);
    };
    document.addEventListener('setIsLoading', handleSetIsLoading);
  }, []);

  useEffect(() => {
    const checkLoaded = () => {
      setTimeout(() => {
        if (document.documentElement.scrollTop === 0) {
          setIsLoading(false);
        } else {
          checkLoaded();
        }
      }, 500);
    };
    checkLoaded();
  }, [isLoading]);

  return (
    <div
      className={`${css.splashContainer} ${
        isLoading ? css.fadeIn : css.fadeOut
      }`}
    >
      <div className={css.innerContent}>
        <h2>Please Wait</h2>
        <p>Reloading Questions...</p>
        <ClimbingBoxLoader
          color="#007aba"
          loading={true}
          cssOverride={override}
          size={25}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
};
