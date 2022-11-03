import React, { useEffect, useState } from 'react';
import { InputAssetProps } from '../../../pane-editor.types';
import {
  setWorkspace,
  useContentFocus,
} from '../../../../../page-workspace-hooks';
import { AssetBrowser } from '../../../../../components';

export const ImageAsset = ({
  field,
  type,
  value,
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
  assetType,
  ...props
}: InputAssetProps) => {
  const contentFocus = useContentFocus();
  const isFocused = contentFocus === field;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [assetName, setAssetName] = useState(value);
  const [isOpenAssetBrowser, setIsOpenAssetBrowser] = useState(false);
  const isInvalid =
    validationError !== null &&
    validationError !== undefined &&
    validationError.length;

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

  const handleAssetSelected = (data) => {
    setAssetName(data.name);
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

  useEffect(() => {
    if (inputRef.current && isFocused) {
      inputRef.current.focus();
    }
  }, [contentFocus, inputRef]);

  return (
    <>
      <div className={controlClasses}>
        <label className="form-label">{label}</label>
        <div className={groupClasses}>
          {assetName ? (
            <button
              style={{ width: '26px', paddingLeft: '5px' }}
              className="btn btn-outline-primary post"
              type="button"
              disabled={disabled}
              onClick={handleButtonFocus}
            >
              <span
                style={{
                  fontSize: '15px',
                }}
                className="material-symbols-sharp"
              >
                close
              </span>
            </button>
          ) : null}

          <input {...inputProps} />

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
      />
    </>
  );
};

export default {
  ImageAsset,
};
