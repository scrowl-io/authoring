export type SlidePosition = {
  moduleIdx: number;
  lessonIdx: number;
  slideIdx: number;
};

export interface CanvasHeaderCommons {
  onUpdate: (title?: string) => void;
}

export type CanvasHeaderProps = CanvasHeaderCommons &
  React.HTMLAttributes<HTMLDivElement>;
