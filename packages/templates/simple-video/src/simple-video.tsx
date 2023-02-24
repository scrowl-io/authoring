import React from 'react';
import './_index.scss';
import { TwoColumnProps } from './simple-video.types';

const Column = ({ field, className, heading, body, isEdit, focusElement }) => {
  const Scrowl = window['Scrowl'];
  const Markdown = Scrowl.core.Markdown;
  let headingClasses = `can-focus`;
  let bodyClasses = `can-focus`;

  if (focusElement === `${field}.heading`) {
    headingClasses += ' hasFocus';
  }

  if (focusElement === `${field}.body`) {
    bodyClasses += ' hasFocus';
  }

  const handleFocusHeading = () => {
    if (isEdit) {
      Scrowl.core.host.sendMessage({
        type: 'focus',
        field: `${field}.heading`,
      });
    }
  };

  const handleFocusBody = () => {
    if (isEdit) {
      Scrowl.core.host.sendMessage({
        type: 'focus',
        field: `${field}.body`,
      });
    }
  };

  return (
    <div className={className}>
      <h2 className={headingClasses} onMouseDown={handleFocusHeading}>
        {heading.value}
      </h2>
      <div className={bodyClasses} onMouseDown={handleFocusBody}>
        <Markdown>{body.value}</Markdown>
      </div>
    </div>
  );
};

export const SimpleVideo = ({ id, schema, ...props }: TwoColumnProps) => {
  const Scrowl = window['Scrowl'];
  let classes = `template-two-columns`;
  let columnClasses = 'column-wrapper';
  const editMode = props.editMode ? true : false;
  const focusElement = editMode ? props.focusElement : null;
  const contentId = `${id}-two-column`;
  const options = schema.content.options;
  const alignment = options.content.alignment.value;
  const numberOfColumns = options.content.numberOfColumns.value;
  const stackOnMobile = options.content.stackOnMobile.value;
  const firstColumn = schema.content.firstColumn.content;
  const secondColumn = schema.content.secondColumn.content;
  const thirdColumn = schema.content.thirdColumn.content;

  if (stackOnMobile) {
    switch (numberOfColumns) {
      case 3:
        columnClasses += ' stacked-view-wide';
        break;
      case 2:
        columnClasses += ' stacked-view-narrow';
        break;
      case 1:
        columnClasses += ' stacked-view-single';
        break;
    }
  }

  if (alignment) {
    columnClasses += ` ${alignment}`;
  }

  return (
    <Scrowl.core.Template
      id={`slide-${contentId}`}
      className={classes}
      {...props}
    >
      <div id={contentId}>
        <div className={columnClasses}>
          <Column
            isEdit={editMode}
            focusElement={focusElement}
            className="column first-column"
            field="firstColumn"
            heading={firstColumn.heading}
            body={firstColumn.body}
          />
          {numberOfColumns >= 2 && (
            <Column
              isEdit={editMode}
              focusElement={focusElement}
              className="column second-column"
              field="secondColumn"
              heading={secondColumn.heading}
              body={secondColumn.body}
            />
          )}
          {numberOfColumns >= 3 && (
            <Column
              isEdit={editMode}
              focusElement={focusElement}
              className="column third-column"
              field="thirdColumn"
              heading={thirdColumn.heading}
              body={thirdColumn.body}
            />
          )}
        </div>
      </div>
    </Scrowl.core.Template>
  );
};

export default {
  SimpleVideo,
};
