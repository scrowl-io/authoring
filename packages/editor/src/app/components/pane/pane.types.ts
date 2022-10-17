import { HTMLMotionProps } from 'framer-motion';

export interface PaneCommons {
  side: 'left' | 'right';
}

export type PaneProps = Partial<PaneCommons> & HTMLMotionProps<'div'>;
