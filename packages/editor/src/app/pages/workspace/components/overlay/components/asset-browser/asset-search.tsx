import React from 'react';

export interface AssetSearchProps
  extends React.AllHTMLAttributes<HTMLInputElement> {}

export const AssetSearch = ({ value, onChange }: AssetSearchProps) => {
  const handleSubmit = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === 'Enter') {
      ev.currentTarget.blur();
    }
  };

  return (
    <div className="mt-1">
      <input
        id="asset-search-input"
        type="search"
        className="form-control form-control-sm"
        placeholder="Search files..."
        autoComplete="off"
        value={value}
        onChange={onChange}
        onKeyDown={handleSubmit}
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
