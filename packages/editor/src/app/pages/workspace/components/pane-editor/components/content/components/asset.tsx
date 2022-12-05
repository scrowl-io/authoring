import React, { useEffect, useState } from 'react';
import { Icon } from '@owlui/lib';
import { InputAssetProps } from '../../../pane-editor.types';
import { useContentFocus } from '../../../../../page-workspace-hooks';
import { AssetBrowser, AssetProps } from '../../../../../components';

export const Asset = ({
  field,
  type,
  value,
  displayValue,
  label,
  hint,
  disabled,
  focus,
  validationError,
  onChange,
  onValidate,
  onFocus,
  onBlur,
  placeholder,
  assetTypes,
  ...props
}: InputAssetProps) => {
  const contentFocus = useContentFocus();
  const isFocused = contentFocus === field;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const formattedValue = displayValue
    ? displayValue
    : value
    ? value.replace('./assets/', '')
    : '';
  const [assetName, setAssetName] = useState(formattedValue);
  const [isOpenAssetBrowser, setIsOpenAssetBrowser] = useState(false);
  const isInvalid =
    validationError !== null &&
    validationError !== undefined &&
    validationError.length;
  const inputId = `input-checkbox-${field.replace(/\./g, '-')}`;

  const showAssetBrowser = () => {
    setIsOpenAssetBrowser(true);

    if (onFocus) {
      onFocus(field);
    }
  };

  const closeAssetBrowser = () => {
    setIsOpenAssetBrowser(false);

    if (onBlur) {
      onBlur(field);
    }
  };

  const handleAssetSelected = (asset: AssetProps) => {
    const displayValue = asset.sourceFilename;

    setAssetName(displayValue);
    setIsOpenAssetBrowser(false);

    if (onChange) {
      onChange(field, asset.filename);
      onChange(field, displayValue, 'displayValue');
    }

    if (onBlur) {
      onBlur(field);
    }
  };

  const handleAssetFocus = () => {
    showAssetBrowser();
  };

  const handleButtonFocus = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.currentTarget.blur();

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  let inputClasses = 'form-control form-control-sm';

  if (isInvalid) {
    inputClasses += ' is-invalid';
  }

  const inputProps: any = {
    type: 'text',
    ref: inputRef,
    className: inputClasses,
    style: { cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis' },
    value: assetName,
    placeholder: placeholder,
    disabled: disabled,
    readOnly: true,
    tabIndex: '-1',
    onFocus: handleAssetFocus,
  };

  let controlClasses = 'control-asset mb-2 template-content-input';
  let groupClasses = 'input-group input-group-sm';

  if (disabled) {
    controlClasses += ' disabled';
  }

  if (isInvalid) {
    groupClasses += ' is-invalid';
  }

  const handleRemoveAsset = () => {
    setAssetName('');

    if (onChange) {
      onChange(field, '');
      onChange(field, '', 'displayValue');
    }

    if (onBlur) {
      onBlur(field);
    }
  };

  useEffect(() => {
    if (inputRef.current && isFocused) {
      inputRef.current.focus();
    }
  }, [contentFocus, inputRef]);

  return (
    <>
      <div className={controlClasses}>
        <label htmlFor={inputId} className="form-label">
          {label}
        </label>
        <div className={groupClasses}>
          {assetName ? (
            <button
              style={{ width: '26px', paddingLeft: '5px' }}
              className="btn btn-outline-primary post"
              type="button"
              disabled={disabled}
              onClick={handleRemoveAsset}
            >
              <Icon icon="close" pxScale="Sm" />
            </button>
          ) : null}

          <input id={inputId} {...inputProps} />

          <button
            style={{ width: '25%', maxWidth: '75px' }}
            className="btn btn-outline-primary post"
            type="button"
            disabled={disabled}
            onFocus={handleAssetFocus}
            onClick={handleButtonFocus}
          >
            Select
          </button>
        </div>
        {isInvalid ? (
          <div className="invalid-feedback">{validationError}</div>
        ) : (
          <></>
        )}
      </div>
      <AssetBrowser
        isOpen={isOpenAssetBrowser}
        onClose={closeAssetBrowser}
        onSelected={handleAssetSelected}
        assetTypes={assetTypes}
      />
    </>
  );
};

export default {
  Asset,
};
