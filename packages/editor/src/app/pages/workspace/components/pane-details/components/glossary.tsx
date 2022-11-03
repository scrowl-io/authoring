import React, { useEffect, useState } from 'react';
import { Button, Icon } from '@owlui/lib';
import * as css from '../_pane-details.scss';
import { Projects } from '../../../../../models';
import { Elem } from '../../../../../utils';
import { menu } from '../../../../../services';

export const Glossary = () => {
  const [isOpenGlossaryForm, setIsOpenGlossaryForm] = useState(false);
  const glossaryTerms = Projects.useGlossary();
  const sortedTerms = glossaryTerms
    .slice()
    .sort((a: any, b: any) =>
      a.word.toLowerCase().localeCompare(b.word.toLowerCase())
    );
  const terms = {};
  const glossaryMenu: Array<menu.ContextMenuItem> = [
    {
      label: 'Edit Term',
      click: () => {
        console.log('edit glossary term');
      },
    },
    { type: 'separator' },
    {
      label: 'Remove Term',
      click: () => {
        console.log('remove glossary term');
      },
    },
  ];
  let heading = '';
  let headings: Array<string> = [];

  sortedTerms.forEach((item, idx: number) => {
    heading = item.word.substring(0, 1).toUpperCase();

    if (terms[heading] === undefined) {
      headings.push(heading);
      terms[heading] = [item];
    } else {
      terms[heading].push(item);
    }
  });

  const handleOpenGlossaryForm = () => {
    setIsOpenGlossaryForm(true);
  };

  const handleGlossaryMenu = (ev: React.MouseEvent) => {
    console.log('glossary menu', ev);
    ev.preventDefault();
    ev.stopPropagation();

    const target = ev.target as HTMLElement;
    const position = Elem.getPosition(target);

    menu.API.contextMenu(glossaryMenu, position).then((result) => {
      console.log('menu close', result);
      target.blur();
    });
  };

  return (
    <div>
      <dl className={css.tabGlossaryList}>
        {headings.map((h, hIdx: number) => {
          return (
            <div key={hIdx}>
              <header className={css.tabGlossaryHeader}>{h}</header>
              {terms[h].map((item, iIdx: number) => {
                return (
                  <div key={iIdx} className={css.tabGlossaryTerm}>
                    <div
                      className="d-flex justify-content-between"
                      onClick={handleOpenGlossaryForm}
                      onContextMenu={handleGlossaryMenu}
                    >
                      <dt className={css.tabGlossaryTermWord}>{item.word}</dt>
                      <Button
                        className={css.actionMenu}
                        variant="ghost"
                        onClick={handleGlossaryMenu}
                        onContextMenu={handleGlossaryMenu}
                      >
                        <Icon
                          display="rounded"
                          icon="more_vert"
                          opsz={20}
                          filled
                        />
                      </Button>
                    </div>
                    <dd className={css.tabGlossaryTermDefinition}>
                      {item.description}
                    </dd>
                  </div>
                );
              })}
            </div>
          );
        })}
      </dl>
      <div className="owl-sticky-add-item">
        <button
          className="owl-sticky-add-item__button"
          onContextMenu={handleOpenGlossaryForm}
          onClick={handleOpenGlossaryForm}
        >
          <span className="txt-placeholder">Add a new glossary term...</span>
          <Icon display="rounded" icon="add_circle" opsz={20} filled />
        </button>
      </div>
    </div>
  );
};

export default {
  Glossary,
};
