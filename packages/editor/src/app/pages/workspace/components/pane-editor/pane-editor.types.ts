export interface BaseInputProps {
  label: string;
  hint?: MIGRATION_HINT; // This is for migrations

  default?: any;

  disabled?: boolean;
  value?: any;
  focus?: boolean;
  validationError?: string;

  // Events
  onChange: Function;
  onValidate: Function;
  onFocus: Function;
  onBlur: Function;
}

export const DefaultInputProps = {
  onChange: () => {},
  onValidate: () => {},
  onFocus: () => {},
  onBlur: () => {},

  validationError: "",
  focus: false,
  disabled: false,
};

export enum LAYOUT_INPUT_TYPE {
  Fieldset = "FIELDSET",
  Asset = "ASSET",
  Checkbox = "CHECKBOX",
  NumberSpinner = "NUMBER_SPINNER",
  Select = "SELECT",
  Textbox = "TEXTBOX",
}

export enum MIGRATION_HINT {
  Header = "HEADER",
  SubHeader = "SUB_HEADER",
  BodyText = "BODY_TEXT",
  BodyAlignment = "BODY_ALIGNMENT",
  BulletPointList = "BULLET_POINT_LIST",
  BulletPointCount = "BULLET_POINT_COUNT",
  BulletPoint = "BULLET_POINT",
  Address = "ADDRESS",
  Hero = "HERO",
  Time = "TIME",
}

export interface InputCheckboxProps extends BaseInputProps {
  type: LAYOUT_INPUT_TYPE.Checkbox;
}
