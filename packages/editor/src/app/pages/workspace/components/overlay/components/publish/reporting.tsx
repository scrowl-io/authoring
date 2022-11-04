import React from 'react';
import { Accordion } from '../../../../../../components';

export const Reporting = ({ data, onChange }) => {
  const { id, reportStatus, lmsIdentifier } = data;

  const handleUpdateReportStatus = (ev: React.FormEvent<HTMLSelectElement>) => {
    const val = ev.currentTarget.value;
    const update = {
      reportStatus: val,
    };

    onChange(update);
  };

  const handleUpdateLmsIdentifie = (ev: React.FormEvent<HTMLInputElement>) => {
    const val = ev.currentTarget.value;
    const update = {
      lmsIdentifier: id === val ? '' : val,
    };

    onChange(update);
  };

  return (
    <Accordion title="Reporting & Tracking">
      <div className="row mb-2">
        <label
          htmlFor="reporting-status"
          className="col-5 form-label col-form-label col-form-label-sm"
        >
          Report Status to LMS as
        </label>
        <div className="col-7">
          <select
            id="reporting-status"
            name="reporting-status"
            className="form-select form-select-sm"
            value={reportStatus}
            onChange={handleUpdateReportStatus}
          >
            <option value="Passed/Incomplete">Passed/Incomplete</option>
          </select>
        </div>
      </div>
      <div className="row mb-2">
        <label
          htmlFor="reporting-lms-identifier"
          className="col-5 form-label col-form-label col-form-label-sm"
        >
          LMS Identifier
        </label>
        <div className="col-7">
          <input
            id="reporting-lms-identifier"
            name="reporting-lms-identifier"
            type="text"
            className="form-control form-control-sm"
            value={lmsIdentifier}
            onChange={handleUpdateLmsIdentifie}
          />
        </div>
      </div>
    </Accordion>
  );
};

export default {
  Reporting,
};
