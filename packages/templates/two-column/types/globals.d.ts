import { BlockTextProps, BlockTextLayout } from '../src';

declare global {
  interface Window {
    TwoColumn: (props: BlockTextProps) => JSX.Element;
    BlockTextSchema: BlockTextLayout;
  }
}
