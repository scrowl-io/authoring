import { TwoColumnProps, TwoColumnLayout } from '../src';

declare global {
  interface Window {
    TwoColumn: (props: TwoColumnProps) => JSX.Element;
    TwoColumnSchema: TwoColumnLayout;
  }
}
