export type AspectRatios = {
  '4:3': {
    label: 'Standard 4:3';
    width: 1920;
    height: 1440;
  };
  '16:9': {
    label: 'Widescreen 16:9';
    width: 1920;
    height: 1080;
  };
  '16:10': {
    label: 'Widescreen 16:10';
    width: 1920;
    height: 1200;
  };
};

export type SlideCommons = {
  aspect: keyof AspectRatios;
};

export type SlideProps = React.HTMLAttributes<HTMLDivElement> & {
  options: SlideCommons;
};
