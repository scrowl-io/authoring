import React from 'react';
import { OutlineModulesProps, OutlineModuleItemProps } from './outline.types';
import { OutlineLessons } from './outline-lessons';
import { Projects } from '../../../../../../models';

export const OutlineModuleItem = ({
  module,
  moduleIdx,
  ...props
}: OutlineModuleItemProps) => {
  return (
    <div {...props}>
      <div>{module.name}</div>
      <OutlineLessons moduleIdx={moduleIdx} />
    </div>
  );
};

export const OutlineModules = ({ ...props }: OutlineModulesProps) => {
  const modules = Projects.useModules();

  return (
    <div {...props}>
      {modules.map((module, idx) => {
        return <OutlineModuleItem key={idx} module={module} moduleIdx={idx} />;
      })}
    </div>
  );
};

export default {
  OutlineModules,
  OutlineModuleItem,
};
