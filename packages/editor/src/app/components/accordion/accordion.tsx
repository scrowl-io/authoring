import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Accordion = ({ title, children, ...props }) => {
  const [isExpanded, setIsExpanded] = useState(props.show ? true : false);

  const bodyAnimations = {
    expanded: {
      display: 'block',
      height: 'auto',
    },
    collapsed: {
      display: 'block',
      height: '0',
      transitionEnd: {
        display: 'none',
      },
    },
  };

  return (
    <div
      className={
        'accordion-item ' + (props.disableCollapse ? ' collapse-disabled' : '')
      }
    >
      <h2 className="accordion-header" id="panelsStayOpen-headingOne">
        <button
          className={'accordion-button ' + (isExpanded ? '' : 'collapsed')}
          type="button"
          aria-expanded={isExpanded ? 'true' : 'false'}
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          {title}
        </button>
      </h2>
      <motion.div
        style={{
          overflow: 'hidden',
          height: props.disableCollapse ? 'auto' : 0,
        }}
        className={'accordion-collapse collapse show'}
        variants={bodyAnimations}
        animate={isExpanded ? 'expanded' : 'collapsed'}
      >
        <div className="accordion-body">{children}</div>
      </motion.div>
    </div>
  );
};

export default {
  Accordion,
};
