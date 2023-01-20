import React, { useState, useRef, useEffect } from 'react';
import { ui } from '@scrowl/ui';
import * as css from '../_pane-details.scss';
import { Projects } from '../../../../../models';
import { menu, sys } from '../../../../../services';
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

        sys
          .messageDialog({
            message: 'Are you sure?',
            buttons: ['Remove Term', 'Cancel'],
            detail: editTerm.word,
          })
          .then((res) => {
            if (res.error) {
              console.error(res);
              return;
            }

            if (res.data.response === 0) {
              Projects.removeGlossaryItem(editTerm);
            }
          });
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
    const target = ev.target as HTMLElement;

    if (term) {
      selectedTerm.current = term;
    }

    menu.API.contextMenu(
      ev,
      glossaryMenu,
      { item: term },
      { alignment: 'left-bottom' }
    ).then((result) => {
      target.blur();
    });
  };

  const handleCloseGlossaryForm = () => {
    setIsOpenGlossaryForm(false);
  };

  const handleSubmitGlossaryForm = (term) => {
    if (term.id === -1) {
      Projects.addGlossaryItem(term);
    } else {
      Projects.setGlossaryItem(term);
    }

    setIsOpenGlossaryForm(false);
  };

  useEffect(() => {
    const handleControls = (ev: KeyboardEvent) => {
      switch (ev.code) {
        case 'Escape':
          setIsOpenGlossaryForm(false);
          break;
      }
    };

    if (isOpenGlossaryForm) {
      window.addEventListener('keydown', handleControls);
    } else {
      window.removeEventListener('keydown', handleControls);
    }

    return () => {
      window.removeEventListener('keydown', handleControls);
    };
  }, [isOpenGlossaryForm]);

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
                    <div
                      key={iIdx}
                      className={css.tabGlossaryTerm}
                      onClick={() => {
                        handleOpenGlossaryForm(item);
                      }}
                      onContextMenu={(ev) => {
                        handleGlossaryMenu(ev, item);
                      }}
                    >
                      <div className="d-flex justify-content-between">
                        <dt className={css.tabGlossaryTermWord}>{item.word}</dt>
                        <ui.Button
                          className={css.actionMenu}
                          variant="ghost"
                          onClick={(ev) => {
                            handleGlossaryMenu(ev, item);
                          }}
                          onContextMenu={(ev) => {
                            handleGlossaryMenu(ev, item);
                          }}
                        >
                          <ui.Icon
                            display="rounded"
                            icon="more_vert"
                            opsz={20}
                            filled
                          />
                        </ui.Button>
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
          <ui.Button
            className="owl-sticky-add-item__button"
            onContextMenu={() => {
              handleOpenGlossaryForm(newTerm);
            }}
            onClick={() => {
              handleOpenGlossaryForm(newTerm);
            }}
          >
            <span className="txt-placeholder">Add a new glossary term...</span>
            <ui.Icon
              display="rounded"
              icon="add_circle"
              opsz={20}
              filled
              pxScale="Lg"
            />
          </ui.Button>
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
