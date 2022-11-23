import { Projects } from '../../models';

export interface ProjectSearchProps
  extends React.AllHTMLAttributes<HTMLInputElement> {}

export interface FormattedProjectFile extends Projects.ProjectFile {
  project: Projects.ProjectMeta;
};
  