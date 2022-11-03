import React, { useState } from 'react';

export const AssetSearch = (props: any) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(searchTerm);
    props.onChange(ev.currentTarget.value);
  };

  const handleSumbit = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === 'Enter') {
      ev.currentTarget.blur();
    }
  };

  return (
    <div className="mt-1">
      <input
        type="search"
        className="form-control form-control-sm"
        placeholder="Search files..."
        autoComplete="off"
        value={searchTerm}
        onChange={handleSearch}
        onKeyDown={handleSumbit}
      />
      <label htmlFor="searchField" className="visually-hidden">
        Search
      </label>
    </div>
  );
};

export default {
  AssetSearch,
};
