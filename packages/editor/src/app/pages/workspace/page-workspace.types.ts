export type SlidePosition = {
  moduleId: number;
  lessonId: number;
  slideId: number;
};

export interface CanvasHeaderCommons {
  onUpdate: (title?: string) => void;
}

export type CanvasHeaderProps = CanvasHeaderCommons &
  React.HTMLAttributes<HTMLDivElement>;
