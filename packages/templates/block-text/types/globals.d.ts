import { BlockTextProps, BlockTextSchemaProps } from '../src';

declare global {
  interface Window {
    BlockText: (props: BlockTextProps) => JSX.Element;
    BlockTextSchema: BlockTextSchemaProps;
  }
}
