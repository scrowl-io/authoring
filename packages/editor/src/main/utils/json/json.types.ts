export type JSON_VALUE =
  | string
  | number
  | boolean
  | Date
  | undefined
  | JSON_DATA
  | Array<JSON_VALUE>;

export type JSON_DATA = {
  [key: string]: JSON_VALUE;
};

export type JSON_FILTER_Operator = 'EQ';

/**
 * EQ: Equals
 * CT: contains
 */

export type JSON_FILTER_Comparison = {
  field: string;
  op: 'EQ' | 'CT';
  value?: string | number | boolean;
};

export type JSON_FILTER_OR = {
  op: 'OR';
  value: Array<JSON_FILTER_Comparison>;
};

export type JSON_FILTER = JSON_FILTER_Comparison | JSON_FILTER_OR;