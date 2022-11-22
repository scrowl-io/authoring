import React, { useState, useRef } from 'react';
import { Button, Icon } from '@owlui/lib';
import * as css from '../_pane-details.scss';
import { Projects } from '../../../../../models';
import { Elem } from '../../../../../utils';
import { menu } from '../../../../../services';
import { GlossaryOverlay } from '../../overlay';
import { ContextMenuResult, GlossaryItem } from '../pane-details.types';

export const Glossary = () => {
  const [isOpenGlossaryForm, setIsOpenGlossaryForm] = useState(false);
  const newTerm = {
    id: -1,
    word: '',
    definition: '',
  };
  const selectedTerm = useRef(newTerm);
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
        handleOpenGlossaryForm();
      },
    },
    { type: 'separator' },
    {
      label: 'Remove Term',
      click: (menuItem) => {
        const res = menuItem as unknown as ContextMenuResult;
        const editTerm = res.data.item as GlossaryItem;

        Projects.removeGlossaryItem(editTerm);
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

  const handleOpenGlossaryForm = (term?: Projects.ProjectGlossaryItem) => {
    setIsOpenGlossaryForm(true);

    if (term) {
      selectedTerm.current = term;
    }
  };

  const handleGlossaryMenu = (
    ev: React.MouseEvent,
    term?: Projects.ProjectGlossaryItem
  ) => {
    ev.preventDefault();
    ev.stopPropagation();

    const target = ev.target as HTMLElement;
    const position = Elem.getPosition(target);

    if (term) {
      selectedTerm.current = term;
    }

    menu.API.contextMenu(glossaryMenu, position, { item: term }).then(
      (result) => {
        target.blur();
      }
    );
  };

  const handleCloseGlossaryForm = () => {
    setIsOpenGlossaryForm(false);
  };

  const handleSubmitGlossaryForm = (term) => {
    setIsOpenGlossaryForm(false);

    if (term.id === -1) {
      Projects.addGlossaryItem(term);
    } else {
      Projects.setGlossaryItem(term);
    }
  };

  return (
    <>
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
                        onClick={() => {
                          handleOpenGlossaryForm(item);
                        }}
                        onContextMenu={(ev) => {
                          handleGlossaryMenu(ev, item);
                        }}
                      >
                        <dt className={css.tabGlossaryTermWord}>{item.word}</dt>
                        <Button
                          className={css.actionMenu}
                          variant="ghost"
                          onClick={(ev) => {
                            handleGlossaryMenu(ev, item);
                          }}
                          onContextMenu={(ev) => {
                            handleGlossaryMenu(ev, item);
                          }}
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
                        {item.definition}
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
            onContextMenu={() => {
              handleOpenGlossaryForm(newTerm);
            }}
            onClick={() => {
              handleOpenGlossaryForm(newTerm);
            }}
          >
            <span className="txt-placeholder">Add a new glossary term...</span>
            <Icon
              display="rounded"
              icon="add_circle"
              opsz={20}
              filled
              pxScale="Lg"
            />
          </button>
        </div>
      </div>
      <GlossaryOverlay
        isOpen={isOpenGlossaryForm}
        onClose={handleCloseGlossaryForm}
        onSubmit={handleSubmitGlossaryForm}
        term={selectedTerm.current}
      />
    </>
  );
};

export default {
  Glossary,
};
