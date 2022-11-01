import { TwoColumnProps, TwoColumnSchemaProps } from '../src';

declare global {
  interface Window {
    TwoColumn: (props: TwoColumnProps) => JSX.Element;
    TwoColumnSchema: TwoColumnSchemaProps;
  }
}
