import React from 'react';
import { useField } from 'formik';

import './style.scss';
import { FormattedMessage } from 'react-intl';
/* eslint-disable react/react-in-jsx-scope */
interface IForms {
  label?: string;
  id?: string;
  name: string;
  placeholder?: string;
  children?: React.ReactNode;
}

interface IFormsInput extends IForms {
  type: string;
}
interface IFormsSelect extends IForms {}

const Input = ({ label, children, ...props }: IFormsInput) => {
  const [field, meta] = useField(props);

  return (
    <div className="form-item">
      <div className="form-control">
        {!!label && (
          <label className="form-control-label" htmlFor={props.id || props.name}>
            <FormattedMessage id={label} />
          </label>
        )}
        <span className={`form-input-wrap ${props.type === 'checkbox' && 'no-border'}`}>
          <input className="form-control-input" id={props.id || props.name} {...field} {...props} />
          <label htmlFor={props.id || props.name}>{children}</label>
        </span>
      </div>
      {meta.touched && meta.error ? (
        <small className="error">{!!meta.error && <FormattedMessage id={meta.error} />}</small>
      ) : null}
    </div>
  );
};

export default Input;
