import React, { useRef, useEffect } from 'react';
import { Accordion } from '../../../../../components';
import { Projects } from '../../../../../models';
import { Elem } from '../../../../../utils';

export type CourseSettingsProps = {
  data: Projects.ProjectScorm;
  onChange: (value?: any) => void;
  onRollback: (value: any) => void;
  onSubmit: (ev: React.FormEvent) => void;
  errors: {
    [key: string]: string;
  };
  isOpen: boolean;
};

export const CourseSettings = ({
  data,
  onChange,
  onRollback,
  onSubmit,
  errors,
  isOpen,
}: CourseSettingsProps) => {
  const inputRefName = useRef<HTMLInputElement>(null);
  let timerFocusName = useRef<ReturnType<typeof setTimeout>>();
  const { name, description, authors, organization } = data;

  const project = Projects.useData();
  const placeholderName = project.meta.name;

  const handleFormUpdate = () => {
    onChange();
  };

  const handleUpdateName = (ev: React.FormEvent<HTMLInputElement>) => {
    const val = ev.currentTarget.value;
    const update = {
      name: val,
    };

    onChange(update);
  };

  const handleInputName = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    switch (ev.key) {
      case 'Escape':
        Elem.stopEvent(ev);
        onRollback('name');
        ev.currentTarget.blur();
        break;
    }
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

  const handleInputDescription = (
    ev: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    switch (ev.key) {
      case 'Escape':
        Elem.stopEvent(ev);
        onRollback('description');
        ev.currentTarget.blur();
        break;
    }
  };

  const handleUpdateAuthors = (ev: React.FormEvent<HTMLInputElement>) => {
    const val = ev.currentTarget.value;
    const update = {
      authors: val,
    };

    onChange(update);
  };

  const handleInputAuthors = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    switch (ev.key) {
      case 'Enter':
        if (ev.ctrlKey || ev.metaKey) {
          onSubmit(ev);
        }
        break;
      case 'Escape':
        Elem.stopEvent(ev);
        onRollback('authors');
        ev.currentTarget.blur();
        break;
    }
  };

  const handleUpdateOrganization = (ev: React.FormEvent<HTMLInputElement>) => {
    const val = ev.currentTarget.value;
    const update = {
      organization: val,
    };

    onChange(update);
  };

  const handleInputOrganization = (
    ev: React.KeyboardEvent<HTMLInputElement>
  ) => {
    switch (ev.key) {
      case 'Escape':
        Elem.stopEvent(ev);
        onRollback('organization');
        ev.currentTarget.blur();
        break;
    }
  };

  useEffect(() => {
    const setFocusOnName = () => {
      if (timerFocusName.current) {
        clearTimeout(timerFocusName.current);
      }

      timerFocusName.current = setTimeout(() => {
        if (inputRefName.current) {
          inputRefName.current.focus();
        }
      }, 250);
    };

    if (isOpen) {
      setFocusOnName();
    }

    return () => {
      if (timerFocusName.current) {
        clearTimeout(timerFocusName.current);
      }
    };
  }, [isOpen]);

  return (
    <Accordion title="Course Settings" show={true}>
      <div className="mb-2">
        <label htmlFor="course-settings-name" className="form-label">
          Course Name
        </label>
        <input
          ref={inputRefName}
          type="text"
          id="course-settings-name"
          name="course-settings-name"
          className={`form-control form-control-sm${
            errors.name ? ' is-invalid' : ''
          }`}
          placeholder={placeholderName}
          onChange={handleUpdateName}
          onKeyDown={handleInputName}
          onBlur={handleFormUpdate}
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>
      <div className="mb-2">
        <label htmlFor="course-settings-description" className="form-label">
          Course Description
        </label>
        <textarea
          id="course-settings-description"
          name="course-settings-description"
          className="form-control form-control-sm"
          placeholder="Describe the Course"
          value={description}
          onChange={handleUpdateDescription}
          onKeyDown={handleInputDescription}
          onBlur={handleFormUpdate}
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
          onKeyDown={handleInputAuthors}
          onBlur={handleFormUpdate}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="course-settings-organization" className="form-label">
          Organization
        </label>
        <input
          id="course-settings-organization"
          name="course-settings-organization"
          type="text"
          className="form-control form-control-sm"
          placeholder="Organization Name"
          value={organization}
          onChange={handleUpdateOrganization}
          onKeyDown={handleInputOrganization}
          onBlur={handleFormUpdate}
        />
      </div>
    </Accordion>
  );
};

export default {
  CourseSettings,
};
