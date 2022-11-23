import React from 'react';
import { ProjectSearchProps } from './project-browser.types';

export const ProjectSearch = ({ value, onChange }: ProjectSearchProps) => {
  const handleSubmit = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === 'Enter') {
      ev.currentTarget.blur();
    }
  };

  return (
    <div className="project-searchbar mt-1">
      <input
        id="project-search-input"
        type="search"
        className="form-control form-control-sm"
        placeholder="Search Projects..."
        autoComplete="off"
        value={value}
        onChange={onChange}
        onKeyDown={handleSubmit}
      />
      <label htmlFor="project-search-input" className="visually-hidden">
        Search
      </label>
    </div>
  );
};

export default {
  ProjectSearch,
};
