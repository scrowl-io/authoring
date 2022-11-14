export interface InlineInputTextCommon {
  text: string;
  isEdit: boolean;
  onChange: (value: string) => void;
  containerProps?: React.AllHTMLAttributes<HTMLDivElement>;
}

export type InlineInputTextProps = InlineInputTextCommon &
  React.AllHTMLAttributes<HTMLTextAreaElement>;