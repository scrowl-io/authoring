import React from 'react';
import { InputAssetProps } from '../../../pane-editor.types';
import { Projects } from '../../../../../../../models';
import {
  setWorkspace,
  useContentFocus,
} from '../../../../../page-workspace-hooks';

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
  const inputRef: any = React.useRef();
  const lastFocusState: any = React.useRef(false);
  const assets = Projects.useAssets();
  const isInvalid =
    validationError !== null &&
    validationError !== undefined &&
    validationError.length;

  const showAssetBrowser = () => {
    if (onFocus) {
      onFocus();
    }
    setWorkspace({ isOpenAssetBrowser: true });
    // ::TODO:: fix this state
    // dispatch(
    //   uiActions.showOverlay({
    //     type: "AssetBrowser",
    //     data: { filter: props.assetType || "" },
    //     callback: (params) => {
    //       if (typeof params === "object") {
    //         const { asset } = params;
    //         // Handle Asset Browser Results

    //         window.requestAnimationFrame(() => {
    //           props.onChange(asset);
    //           props.onValidate(asset);
    //           props.onBlur();
    //         });
    //       } else {
    //         window.requestAnimationFrame(() => {
    //           props.onBlur();
    //         });
    //       }
    //     },
    //   })
    // );
  };

  if (inputRef.current && lastFocusState.current !== focus) {
    lastFocusState.current = focus;

    if (focus) {
      // requestAnimationFrame fixes a state update bug
      window.requestAnimationFrame(() => {
        showAssetBrowser();
      });
    }
  }

  const valueHash = value ? value.split('.').shift() : '';
  const assetName = '';
  // const assetName = assets.reduce((a, p) => {
  //   return p.fileHash === valueHash ? p.fileName : a;
  // }, '');

  let inputClasses = 'form-control form-control-sm';

  if (isInvalid) {
    inputClasses += ' is-invalid';
  }

  const inputProps: any = {
    type: 'text',
    className: inputClasses,
    style: { cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis' },
    value: assetName,
    placeholder: placeholder,
    disabled: disabled,
    tabIndex: '-1',

    onChange: (ev: React.FormEvent<HTMLInputElement>) => {},
    onFocus: (ev: React.FocusEvent<HTMLInputElement>) => {
      ev.preventDefault();
      ev.target.blur();
    },

    onClick: (ev: React.MouseEvent) => {
      showAssetBrowser();
    },
  };

  let controlClasses = 'control-asset mb-2 template-content-input';
  let groupClasses = 'input-group input-group-sm';

  if (disabled) {
    controlClasses += ' disabled';
  }

  if (isInvalid) {
    groupClasses += ' is-invalid';
  }

  return (
    <div className={controlClasses}>
      <label className="form-label">{label}</label>
      <div className={groupClasses}>
        {assetName ? (
          <button
            style={{ width: '26px', paddingLeft: '5px' }}
            className="btn btn-outline-primary post"
            type="button"
            disabled={disabled}
            onClick={(e: any) => {
              if (onChange) {
                onChange(field, '');
              }
              if (onValidate) {
                onValidate(field, '');
              }
            }}
            onMouseUp={(e: any) => {
              e.target.blur();
            }}
            onBlur={() => {
              if (onBlur) {
                onBlur(field, '');
              }
            }}
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
          ref={inputRef}
          style={{ width: '25%', maxWidth: '75px' }}
          className="btn btn-outline-primary post"
          type="button"
          disabled={disabled}
          onClick={(ev: React.MouseEvent<HTMLButtonElement>) => {
            showAssetBrowser();
          }}
          onMouseUp={(ev: React.MouseEvent<HTMLButtonElement>) => {
            ev.currentTarget.blur();
          }}
          onBlur={(ev: React.FocusEvent<HTMLButtonElement>) => {
            if (onBlur) {
              onBlur(field, '');
            }
          }}
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
  );
};

export default {
  ImageAsset,
};
