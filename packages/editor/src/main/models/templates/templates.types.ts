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

export type TemplateManifestSlide = {
  aspect: keyof AspectRatios;
};

export type TemplateManifestElementText = {
  value: string;
  type: 'text';
  label: string;
};

export type TemplateManifestElementTextarea = {
  value: string;
  type: 'textarea';
  label: string;
};

export type TemplateManifestElementNumber = {
  value: number;
  type: 'number';
  label: string;
};

export type ManifestElementListText = {
  value: Array<string>;
  type: 'listText';
  label: string;
};

export type TemplateManifestElements = {
  [key: string]:
    | TemplateManifestElementText
    | TemplateManifestElementNumber
    | TemplateManifestElementTextarea
    | ManifestElementListText;
};

export interface TemplateManifestMeta {
  name: string;
  filename: string;
  component: string;
}

export interface TemplateManifest {
  version?: string;
  meta: TemplateManifestMeta;
  elements: TemplateManifestElements;
}

export type TemplateRecords = Array<{
  name: string;
  source: string;
  manifest: TemplateManifest;
}>;
