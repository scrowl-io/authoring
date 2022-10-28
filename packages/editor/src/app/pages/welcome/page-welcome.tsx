import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as styles from './page-welcome.scss';
import { HelloEnvelope } from './components';
import { Projects } from '../../models';
import { menu } from '../../services';

export const Path = '/welcome';

export const Page = () => {
  const [inProgress, setProgress] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isReady = useRef(false);
  const navigator = useNavigate();

  const handleCreateCourse = () => {
    if (inProgress) {
      return;
    }

    setProgress(true);
    Projects.create().then((result) => {
      if (result.error) {
        console.error(result);
        return;
      }

      menu.API.enableProjectActions().then((result) => {
        console.log('result', result);
        setProgress(false);
        navigator('/workspace');
      });
    });
  };

  useEffect(() => {
    if (isReady.current) {
      return;
    }

    menu.API.disableProjectActions().then(() => {
      isReady.current = false;
      setIsLoading(false);
    });

    return () => {
      isReady.current = true;
    };
  }, [isLoading, isReady]);

  return (
    <motion.div
      className={styles.firstWelcome}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      exit={{ opacity: 0, transition: { delay: 0.2 } }}
      style={inProgress ? { pointerEvents: 'none' } : {}}
    >
      <div className="body">
        <motion.h1
          initial={{ transform: 'translate(0,-80px)' }}
          animate={{ transform: 'translate(0,0px)' }}
          transition={{ duration: 0.5 }}
          exit={{
            transform: 'translate(0,-150px)',
            opacity: 0,
            transition: { delay: 0.1 },
          }}
        >
          Create the future, in Scrowl
        </motion.h1>
        <motion.h2
          initial={{ transform: 'translate(0,-180px)' }}
          animate={{ transform: 'translate(0,0px)' }}
          transition={{ duration: 0.5 }}
          exit={{
            transform: 'translate(0,-110px)',
            opacity: 0,
            transition: { delay: 0.1 },
          }}
        >
          Unleash your imagination and get ready to design your best course
          ever.
        </motion.h2>
        <motion.button
          className="btn btn-primary btn-lg"
          onMouseDown={() => handleCreateCourse()}
          onClick={() => handleCreateCourse()}
          whileHover={{
            scale: 1.03,
            transition: { duration: 0.1 },
          }}
          animate={
            inProgress
              ? { boxShadow: '0 0 0 30px rgba(0, 122, 186, 0)' }
              : { scale: 1 }
          }
          transition={
            inProgress
              ? {
                  boxShadow: {
                    duration: 0.3,
                    from: '0 0 0 4px rgba(0, 122, 186, 0.5)',
                  },
                }
              : {
                  from: 1.03,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 0.7,
                }
          }
        >
          Design My First Course
        </motion.button>

        <motion.div
          className="hello-animation"
          style={{ cursor: 'pointer' }}
          onMouseDown={() => handleCreateCourse()}
          onClick={() => handleCreateCourse()}
          exit={{ transform: 'translate(0,50vh)', transition: { delay: 0.3 } }}
        >
          <HelloEnvelope />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default {
  Path,
  Page,
};
