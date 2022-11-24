export type StartNewCommons = {
  hasProjects?: boolean;
};

export type StartNewProps = Partial<StartNewCommons> &
  React.AllHTMLAttributes<HTMLDivElement>;