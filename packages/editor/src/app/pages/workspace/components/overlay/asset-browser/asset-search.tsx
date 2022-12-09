import React, { useEffect, useState, useRef } from 'react';
import { Elem } from '../../../../../utils';

export interface AssetSearchProps
  extends Omit<React.AllHTMLAttributes<HTMLInputElement>, 'onSubmit'> {
  isOpen: boolean;
  onSubmit: (value: string) => void;
}

export const AssetSearch = ({ onSubmit, isOpen }: AssetSearchProps) => {
  const inputRefSearch = useRef<HTMLInputElement>(null);
  let timerFocusSearch = useRef<ReturnType<typeof setTimeout>>();
  const [searchValue, setSearchValue] = useState('');
  const [rollbackValue, setRollbackValue] = useState('');

  const handleFormUpdate = (ev: React.FocusEvent<HTMLInputElement>) => {
    const newValue = ev.currentTarget.value;

    setRollbackValue(newValue);
  };

  const handleUpdateSearch = (ev: React.FormEvent<HTMLInputElement>) => {
    const newValue = ev.currentTarget.value;

    setSearchValue(newValue);

    if (!newValue) {
      onSubmit(newValue);
    }
  };

  const handleInputSearch = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    switch (ev.key) {
      case 'Enter':
        const newValue = ev.currentTarget.value;

        ev.currentTarget.blur();
        onSubmit(newValue);
        break;
      case 'Escape':
        Elem.stopEvent(ev);
        setSearchValue(rollbackValue);
        ev.currentTarget.blur();
        break;
    }
  };

  useEffect(() => {
    const setFocusOnSearch = () => {
      if (timerFocusSearch.current) {
        clearTimeout(timerFocusSearch.current);
      }

      timerFocusSearch.current = setTimeout(() => {
        if (inputRefSearch.current) {
          inputRefSearch.current.focus();
        }
      }, 250);
    };

    if (isOpen) {
      setSearchValue('');
      setRollbackValue('');
      setFocusOnSearch();
    }
  }, [isOpen]);

  return (
    <div className="mt-1">
      <input
        ref={inputRefSearch}
        id="asset-search-input"
        type="search"
        className="form-control form-control-sm"
        placeholder="Search files..."
        autoComplete="off"
        value={searchValue}
        onChange={handleUpdateSearch}
        onKeyDown={handleInputSearch}
        onBlur={handleFormUpdate}
      />
      <label htmlFor="asset-search-input" className="visually-hidden">
        Search
      </label>
    </div>
  );
};

export default {
  AssetSearch,
};
