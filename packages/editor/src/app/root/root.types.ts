export type PageModule = {
  Path: string;
  Page: () => JSX.Element;
};

export type Pages = {
  [key: string]: PageModule;
};
