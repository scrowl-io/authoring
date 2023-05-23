import React, { useEffect, useState } from 'react';
import utils, { CssMapProps } from '../../utils';
import * as _css from './_preview.scss';
// @ts-ignore
import { ThemeProvider, Offcanvas, Button } from 'react-bootstrap';
import { formatResponse } from '../../utils/formatResponse';

export const Preview = () => {
  const css = utils.css.removeMapPrefix(_css);
  const themePrefixes: CssMapProps = {};
  const [show, setShow] = useState(true);

  themePrefixes['offcanvas'] = `owlui-offcanvas`;
  themePrefixes['offcanvas-body'] = `owlui-offcanvas-body`;
  themePrefixes['offcanvas-header'] = `owlui-offcanvas-header`;
  themePrefixes['offcanvas-title'] = `owlui-offcanvas-title`;
  themePrefixes['btn'] = `owlui-btn`;
  themePrefixes['btn-close'] = `owlui-btn-close`;
  themePrefixes['btn-close-white'] = `owlui-btn-close-white`;

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    if (window['API_1484_11']) {
      const value = window['API_1484_11'].GetValue('cmi');
      let p;
      setTimeout(() => {
        p = document.querySelector('#scorm-preview-content');
        if (p) {
          p.textContent = formatResponse(value);
        }
      }, 1);
    }
  }, [show]);

  return (
    <ThemeProvider prefixes={themePrefixes}>
      <Button className={css.previewButton} onClick={handleShow} variant="dark">
        SCORM Preview
      </Button>
      <Offcanvas
        show={show}
        className={css.previewPanel}
        placement="end"
        backdrop={false}
        scroll={true}
        onHide={handleClose}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h3>SCORM Preview</h3>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <pre>window.API_1484_11.cmi = &#123;</pre>
          <pre>"cmi":</pre>
          <pre id="scorm-preview-content"></pre>
        </Offcanvas.Body>
      </Offcanvas>
    </ThemeProvider>
  );
};

export default {
  Preview,
};
