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
interface IFormsSelect extends IForms {}

const Select = ({ label, ...props }: IFormsSelect) => {
  const [field, meta] = useField(props);

  return (
    <div className="form-item">
      <div className="form-control">
        {!!label && (
          <label htmlFor={props.id || props.name}>
            <FormattedMessage id={label} />
          </label>
        )}
        <select className="form-input-wrap" {...field} {...props} />
      </div>
      {meta.touched && meta.error ? (
        <small className="error">{!!meta.error && <FormattedMessage id={meta.error} />}</small>
      ) : null}
    </div>
  );
};

export default Select;
