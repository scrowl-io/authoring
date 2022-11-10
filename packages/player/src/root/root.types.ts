import React from 'react';

export type PlayerTemplateList = {
  [key: string]: () => JSX.Element;
};

export interface PlayerRootCommons {
  templateList?: PlayerTemplateList;
}

export type PlayerRootProps = PlayerRootCommons & React.AllHTMLAttributes<HTMLDivElement>;

// export interface PlayerRoutesCommons {
//   config: Array<Pages.PageDefinition>;
//   templateList?: PlayerTemplateList;
// }

// export type PlayerRoutesProps = PlayerRoutesCommons;