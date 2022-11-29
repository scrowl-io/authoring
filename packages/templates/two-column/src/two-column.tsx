import React from 'react';
import Scrowl from '@scrowl/template-core';
import * as css from './_index.scss';
import { TwoColumnProps } from './two-column.types';

const Column = ({ field, className, heading, body, isEdit, focusElement }) => {
  return (
    <div className={className}>
      <h2
        className={
          'can-focus ' + (focusElement === `${field}.heading` && ' has-focus')
        }
        onMouseDown={() => {
          if (isEdit) {
            Scrowl.core.host.sendMessage({
              type: 'focus',
              field: `${field}.heading`,
            });
          }
        }}
      >
        {heading.value}
      </h2>
      <p
        className={
          'can-focus ' + (focusElement === `${field}.body` && ' has-focus')
        }
        onMouseDown={() => {
          if (isEdit) {
            Scrowl.core.host.sendMessage({
              type: 'focus',
              field: `${field}.body`,
            });
          }
        }}
      >
        <Scrowl.core.Markdown children={body.value} />
      </p>
    </div>
  );
};

export const TwoColumn = ({ schema, ...props }: TwoColumnProps) => {
  let classes = `${css.templateTwoColumn}`;
  const editMode = props.editMode ? true : false;
  const focusElement = editMode ? props.focusElement : null;
  const options = schema.content.options;
  let alignment = options.content.alignment.value;
  const numberOfColumns = options.content.numberOfColumns.value;
  const stackOnMobile = options.content.stackOnMobile.value;
  const firstColumn = schema.content.firstColumn.content;
  const secondColumn = schema.content.secondColumn.content;
  const thirdColumn = schema.content.thirdColumn.content;

  return (
    <Scrowl.core.Template {...props} className={classes}>
      <div className="slide-container">
        <div
          className={`column-wrapper ${
            stackOnMobile && numberOfColumns === 3
              ? 'stacked-view-wide'
              : stackOnMobile && numberOfColumns === 2
              ? 'stacked-view-narrow'
              : stackOnMobile && numberOfColumns === 1
              ? 'stacked-view-single'
              : ''
          } ${
            alignment === 'left'
              ? 'align-left'
              : alignment === 'right'
              ? 'align-right'
              : alignment === 'center'
              ? 'align-center'
              : alignment === 'justify'
              ? 'align-justify'
              : ''
          }`}
        >
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
  TwoColumn,
};
