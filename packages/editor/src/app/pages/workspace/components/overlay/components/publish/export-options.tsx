import React from 'react';
import { Accordion } from '../../../../../../components';

export const ExportOptions = ({ data, onChange }) => {
  const { outputFormat, optomizeMedia } = data;

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
      optomizeMedia: val,
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
          >
            <option value="scorm_2004">SCORM 2004</option>
            <option value="pdf" disabled>
              PDF
            </option>
          </select>
        </div>
      </div>
      <div className="row mb-2">
        <label
          htmlFor="export-options-optomize-media"
          className="col-5 form-label col-form-label col-form-label-sm"
        >
          Optomize Media
        </label>
        <div className="col-7">
          <select
            id="export-options-optomize-media"
            name="export-options-optomize-media"
            className="form-select form-select-sm"
            value={optomizeMedia}
            onChange={handleUpdateOptomizeMedia}
          >
            <option value="none" disabled>
              None
            </option>
            <option value="recommended">Recommended</option>
            <option value="maximum" disabled>
              Maximum
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
