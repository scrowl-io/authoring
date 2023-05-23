import { TemplateSchema as schema } from '@scrowl/template-core';
import { rq } from '../../services';

export type { TemplateSchema, TemplateSchemaContent, InputProps } from '@scrowl/template-core';

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

export type TemplateRecord = {
  name: string;
  source: string;
  manifest: schema;
};

export type TemplateRecords = Array<{TemplateRecord}>;

export interface TemplatesApiLoad
  extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/templates/load';
}

export interface TemplatesApiGet
  extends Omit<rq.RegisterEndpoint, 'name'> {
  name: '/templates/get';
}

export type TemplatesApi = Partial<{
  load: TemplatesApiLoad;
  get: TemplatesApiGet;
}>;

export type TemplatesEndpoints = {
  load: TemplatesApiLoad['name'];
  get: TemplatesApiGet['name'];
};

export type TemplateReqLoad = {
  template: schema;
};
