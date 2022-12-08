export type StylesProp = Record<string, string>;

export interface ThemePrefixesProps {
  [key: string]: string;
}

export type LookupConfigCss = {
  module: StylesProp;
  base: string;
  modifiers?: Array<{
    base: string;
    value?: string;
  }>;
};
