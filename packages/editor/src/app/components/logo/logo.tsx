import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as css from './_logo.scss';
import { LogoProps } from './logo.types';

export const Logo = ({
  className,
  sizing,
  isAnimated,
  animationDelay,
  asLink,
  ...props
}: LogoProps) => {
  const getSize = () => {
    if (!sizing) {
      return 50;
    }

    switch (sizing) {
      case 'sm':
        return 32;
      default:
        return 50;
    }
  };

  const classes = `${css.logo} ${className}`;
  const dim = getSize();
  const motionOpts = {
    whileHover: {
      scale: 1.08,
      transition: { type: 'spring', bounce: 0.8, duration: 0.8 },
    },
    initial: !isAnimated ? {} : { marginTop: '-80px' },
    animate: !isAnimated ? {} : { marginTop: '0px' },
    transition: !isAnimated
      ? {}
      : {
          marginTop: {
            delay: animationDelay ? animationDelay + 0.1 : 0.1,
            type: 'spring',
            bounce: 0.52,
          },
        },
  };
  const svg = (
    <svg
      viewBox="0 0 125 125"
      xmlns="http://www.w3.org/2000/svg"
      width={dim}
      height={dim}
    >
      <path
        d="m98.85 98.56c.77.86 2.12.89 2.93.06 11.67-11.98 12.29-31.21.83-43.71-6.92-7.55-21.31-1.72-32.93 8.14-.87.74-.97 2.03-.21 2.88z"
        fill="#fff"
        className={css.wings}
      />
      <path d="m69.63 63.09.05-.04c11.61-9.86 26.01-15.69 32.93-8.14 11.46 12.5 10.84 31.73-.83 43.71-.03.03-.06.06-.1.09-.81.73-2.09.68-2.83-.15l-29.38-32.63c-.75-.83-.66-2.1.16-2.84m-5.35-5.95c-4.11 3.7-4.45 10.04-.76 14.14l29.38 32.63c3.69 4.1 10.03 4.43 14.13.74.16-.15.32-.3.48-.46 14.77-15.17 15.2-39.19.99-54.7-9.37-10.22-26.64-7.29-44 7.45-.07.06-.15.13-.22.19z" />
      <path
        d="m26.15 98.56c-.77.86-2.12.89-2.93.06-11.67-11.98-12.29-31.21-.83-43.71 6.92-7.55 21.31-1.72 32.93 8.14.87.74.97 2.03.21 2.88z"
        fill="#fff"
        className={css.wings}
      />
      <path d="m55.37 63.09c.82.74.91 2.01.16 2.84l-29.38 32.63c-.74.83-2.02.88-2.83.15-.03-.03-.06-.06-.1-.09-11.67-11.98-12.29-31.21-.83-43.71 6.92-7.55 21.31-1.72 32.93 8.14zm5.35-5.95c-.07-.07-.15-.13-.22-.2-17.36-14.74-34.63-17.66-44-7.45-14.21 15.5-13.78 39.53.99 54.7.15.16.31.31.47.46 4.1 3.69 10.44 3.36 14.13-.74l29.38-32.63c3.69-4.1 3.35-10.44-.76-14.14z" />
      <circle cx="62.5" cy="69.22" fill="#fff" className={css.body} r="36" />
      <path d="m62.5 33.22c19.88 0 36 16.12 36 36s-16.12 36-36 36-36-16.12-36-36 16.12-36 36-36m0-8c-24.26 0-44 19.74-44 44s19.74 44 44 44 44-19.74 44-44-19.74-44-44-44z" />
      <path d="m74.23 9.32h-.01c-3.63-1.43-7.58-2.22-11.72-2.22s-8.09.79-11.72 2.22h-.01c-10.74 4.07-26.63 4.36-38.07.82-1.78-.55-3.26 1.44-2.25 3l10.68 16.45c.37.57 1 .91 1.68.91h79.38c.68 0 1.31-.34 1.68-.91l10.68-16.45c1.01-1.56-.47-3.55-2.25-3-11.44 3.54-27.34 3.25-38.07-.82z" />
      <path d="m76.28 35.69h-27.57c-1.59 0-2.54 1.76-1.67 3.09l13.78 21.15c.79 1.21 2.56 1.21 3.35 0l13.78-21.15c.87-1.33-.09-3.09-1.67-3.09z" />
      <path d="m82.5 20.6c8.84 0 16.08 7.16 16 16-.05 5.35-8.03 8.01-16 8.01s-16.04-2.68-16-8.01c.08-8.84 7.16-16 16-16m0-8c-13.12 0-23.89 10.74-24 23.93-.03 3.58 1.35 6.87 3.98 9.53 5.86 5.91 15.95 6.54 20.02 6.54 14.27 0 23.92-6.4 24-15.93.06-6.38-2.39-12.4-6.9-16.95-4.55-4.6-10.63-7.13-17.1-7.13z" />
      <path d="m42.5 20.6c8.84 0 16.08 7.16 16 16-.05 5.35-8.03 8.01-16 8.01s-16.04-2.68-16-8.01c.08-8.84 7.16-16 16-16m0-8c-13.12 0-23.89 10.74-24 23.93-.03 3.58 1.35 6.87 3.98 9.53 5.86 5.91 15.95 6.54 20.02 6.54 14.27 0 23.92-6.4 24-15.93.06-6.38-2.39-12.4-6.9-16.95-4.55-4.6-10.63-7.13-17.1-7.13z" />
      <path
        d="m98.5 36.6c-.1 10.73-32.09 10.62-32 0 .08-8.84 7.16-16 16-16s16.08 7.16 16 16z"
        fill="#fff"
        className={css.eyes}
      />
      <path
        d="m58.5 36.6c-.1 10.73-32.09 10.62-32 0 .08-8.84 7.16-16 16-16s16.08 7.16 16 16z"
        fill="#fff"
        className={css.eyes}
      />
      <path d="m83.45 37.99c-.04 4.03-12.03 3.98-12 0 .03-3.31 2.69-6 6-6s6.03 2.69 6 6z" />
      <path d="m53.61 37.99c-.04 4.03-12.03 3.98-12 0 .03-3.31 2.69-6 6-6s6.03 2.69 6 6z" />
    </svg>
  );

  if (!asLink) {
    const divProps = props as React.AllHTMLAttributes<HTMLDivElement>;

    return (
      <div className={classes} aria-label="Scrowl Logo" {...divProps}>
        {svg}
      </div>
    );
  }

  const { href, ...anchorProps } =
    props as React.AllHTMLAttributes<HTMLAnchorElement>;

  return (
    <motion.div
      initial={motionOpts.initial}
      animate={motionOpts.animate}
      transition={motionOpts.transition}
    >
      <Link
        to={href || ''}
        className={classes}
        aria-label="Scrowl Logo"
        {...anchorProps}
      >
        {svg}
      </Link>
    </motion.div>
  );
};

export default {
  Logo,
};
