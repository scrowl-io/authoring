import { Projects } from '../../models';

export type StartNewCommons = {
  hasProjects: boolean;
};

export type StartNewProps = Partial<StartNewCommons> &
  React.AllHTMLAttributes<HTMLDivElement>;

export type RecentProjectsCommons = {
  projects: Array<Projects.ProjectFile>;
};

export type RecentProjectsProps = RecentProjectsCommons &
  React.AllHTMLAttributes<HTMLDivElement>;