import React, { useEffect, useRef, useState } from 'react';
import { ui } from '@scrowl/ui';
import { Form } from 'react-bootstrap';
import * as css from './_module-editor.scss';
import { Modal } from '../../../../../components';
import { Projects } from '../../../../../models';
import {
  useModuleEditor,
  closeModuleEditor,
  useActiveSlide,
} from '../../../page-workspace-hooks';

export const ModuleEditor = () => {
  const title = 'Edit Module';
  const isOpen = useModuleEditor();
  const threshold = useRef(0);
  const [stateThreshold, setStateThreshold] = useState(0);
  let project = Projects.useData();
  const activeSlide = useActiveSlide();

  let module;
  let passingThreshold;

  if (project && project.modules) {
    module = project.modules[activeSlide.moduleId];
  }

  if (module) {
    passingThreshold = module.passingThreshold;
    threshold.current = passingThreshold;
  }

  const handleChange = (ev) => {
    const target = ev.target as HTMLInputElement;
    threshold.current = parseFloat(target.value);
    setStateThreshold(threshold.current);
  };

  const handleClose = () => {
    closeModuleEditor();
  };

  const handleSubmit = () => {
    if (project.modules) {
      const newModule = { ...module, passingThreshold: stateThreshold };

      const mods = [...project.modules];

      mods[activeSlide.moduleId] = newModule;

      const newProj = {
        ...project,
        modules: mods,
      };

      Projects.setData(newProj);
      closeModuleEditor();
    }
  };

  useEffect(() => {
    if (isOpen) {
      setStateThreshold(threshold.current);
    }
  }, [isOpen]);

  console.log('project: ', project);

  return (
    <Modal
      className="modal-template-browser"
      title={title}
      isOpen={isOpen}
      onClose={handleClose}
    >
      <div className={css.moduleEditorContainer}>
        <div className={css.moduleEditorContent}>
          {passingThreshold && (
            <div>
              <h3>Passing Threshold:</h3>
              <h3>{stateThreshold}</h3>
              <Form.Range value={stateThreshold} onChange={handleChange} />
            </div>
          )}
        </div>
      </div>
      <footer className="d-flex justify-content-end">
        <ui.Button variant="link" onClick={handleClose}>
          Cancel
        </ui.Button>
        <ui.Button variant="success" onClick={handleSubmit}>
          Save Module
        </ui.Button>
      </footer>
    </Modal>
  );
};

export default {
  ModuleEditor,
};
