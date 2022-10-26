import { BlockTextProps, BlockTextLayout } from '../src';

declare global {
  interface Window {
    BlockText: (props: BlockTextProps) => JSX.Element;
    BlockTextSchema: BlockTextLayout;
  }
}
