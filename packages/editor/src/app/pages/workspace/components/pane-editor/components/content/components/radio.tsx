import React from 'react';
import { Form } from 'react-bootstrap';

export const Radio = (props) => {
  console.log(props);
  console.log(props.options);

  const checkSelected = (option) => {
    if (option.value === props.value) {
      return true;
    }
  };

  const onChange = (ev: React.FormEvent<HTMLInputElement>) => {
    const val = ev.currentTarget;

    props.onChange(props.field, parseInt(val.id));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span>{props.label}</span>
      {props.options.map((option, index) => {
        console.log(option);
        return (
          <Form.Check
            inline
            type={props.type}
            name={props.field}
            label={option.label}
            key={index}
            checked={checkSelected(option)}
            onChange={onChange}
            onClick={onChange}
            id={option.value}
          />
        );
      })}
    </div>
  );
};

export default {
  Radio,
};
