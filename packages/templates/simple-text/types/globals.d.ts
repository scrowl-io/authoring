import { SimpleTextProps, SimpleTextSchemaProps } from '../src';

declare global {
  interface Window {
    SimpleText: (props: SimpleTextProps) => JSX.Element;
    SimpleTextSchema: SimpleTextSchemaProps;
  }
}
