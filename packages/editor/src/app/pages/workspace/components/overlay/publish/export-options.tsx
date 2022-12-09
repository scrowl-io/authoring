import React from 'react';
import { Accordion } from '../../../../../components';

export const ExportOptions = ({ data, onChange }) => {
  const { outputFormat, optimizeMedia } = data;

  const handleFormUpdate = () => {
    onChange();
  };

  const handleUpdateOutpuFormat = (ev: React.FormEvent<HTMLSelectElement>) => {
    const val = ev.currentTarget.value;
    const update = {
      outputFormat: val,
    };

    onChange(update);
  };

  const handleUpdateOptomizeMedia = (
    ev: React.FormEvent<HTMLSelectElement>
  ) => {
    const val = ev.currentTarget.value;
    const update = {
      optimizeMedia: val,
    };

    onChange(update);
  };

  return (
    <Accordion title="Export Options">
      <div className="row mb-2">
        <label
          htmlFor="export-options-output-format"
          className="col-5 form-label col-form-label col-form-label-sm"
        >
          Output Format
        </label>
        <div className="col-7">
          <select
            id="export-options-output-format"
            name="export-options-output-format"
            className="form-select form-select-sm"
            value={outputFormat}
            onChange={handleUpdateOutpuFormat}
            onBlur={handleFormUpdate}
          >
            <option value="1.2">SCORM 1.2</option>
            <option value="2004.3" disabled>
              SCORM 2004 3rd Edition
            </option>
            <option value="2004.4" disabled>
              SCORM 2004 4th Edition
            </option>
            <option value="pdf" disabled>
              PDF
            </option>
          </select>
        </div>
      </div>
      <div className="row mb-2">
        <label
          htmlFor="export-options-optimize-media"
          className="col-5 form-label col-form-label col-form-label-sm"
        >
          Optomize Media
        </label>
        <div className="col-7">
          <select
            id="export-options-optimize-media"
            name="export-options-optimize-media"
            className="form-select form-select-sm"
            value={optimizeMedia}
            onChange={handleUpdateOptomizeMedia}
            onBlur={handleFormUpdate}
          >
            <option value="low" disabled>
              Low
            </option>
            <option value="recommended">Recommended</option>
            <option value="high" disabled>
              High
            </option>
            <option value="original" disabled>
              Original
            </option>
          </select>
        </div>
      </div>
    </Accordion>
  );
};

export default {
  ExportOptions,
};
