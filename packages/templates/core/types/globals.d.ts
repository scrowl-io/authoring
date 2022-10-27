import Anime from 'animejs';
import ScrollMagic from 'scrollmagic';
import { TemplateProps } from '../src';

declare global {
  interface Window {
    Scrowl: {
      core: {
        Template: (props: TemplateProps) => JSX.Element;
        Markdown: (props: any) => JSX.Element;
        anime: Anime;
        scroll: ScrollMagic;
      }
    }
  }
}
