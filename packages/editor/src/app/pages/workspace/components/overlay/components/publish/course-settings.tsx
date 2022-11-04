import React from 'react';
import { Accordion } from '../../../../../../components';

export const CourseSettings = ({ data, onChange }) => {
  const { name, description, authors, organization } = data;

  const handleUpdateName = (ev: React.FormEvent<HTMLInputElement>) => {
    const val = ev.currentTarget.value;
    const update = {
      name: val,
    };

    onChange(update);
  };

  const handleUpdateDescription = (
    ev: React.FormEvent<HTMLTextAreaElement>
  ) => {
    const val = ev.currentTarget.value;
    const update = {
      description: val,
    };

    onChange(update);
  };

  const handleUpdateAuthors = (ev: React.FormEvent<HTMLInputElement>) => {
    const val = ev.currentTarget.value;
    const update = {
      authors: val,
    };

    onChange(update);
  };

  const handleUpdateOrganization = (ev: React.FormEvent<HTMLInputElement>) => {
    const val = ev.currentTarget.value;
    const update = {
      organization: val,
    };

    onChange(update);
  };

  return (
    <Accordion title="Course Settings" show={true}>
      <div className="mb-2">
        <label htmlFor="course-settings-name" className="form-label">
          Course Name
        </label>
        <input
          type="text"
          id="course-settings-name"
          name="course-settings-name"
          className="form-control form-control-sm"
          placeholder="Course Name"
          value={name}
          onChange={handleUpdateName}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="course-settings-description" className="form-label">
          Course Description
        </label>
        <textarea
          id="course-settings-description"
          name="course-settings-description"
          className="form-control form-control-sm"
          placeholder="Describe the Project"
          value={description}
          onChange={handleUpdateDescription}
        ></textarea>
      </div>
      <div className="mb-2">
        <label htmlFor="course-settings-authors" className="form-label">
          Authors
        </label>
        <input
          id="course-settings-authors"
          name="course-settings-authors"
          type="text"
          className="form-control form-control-sm"
          placeholder="Course Authors"
          value={authors}
          onChange={handleUpdateAuthors}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="course-settings-organization" className="form-label">
          Authors
        </label>
        <input
          id="course-settings-organization"
          name="course-settings-organization"
          type="text"
          className="form-control form-control-sm"
          placeholder="Organization name"
          value={organization}
          onChange={handleUpdateOrganization}
        />
      </div>
    </Accordion>
  );
};

export default {
  CourseSettings,
};
