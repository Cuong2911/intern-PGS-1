import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormattedMessage } from 'react-intl';

import './style.scss';
import Input from '../../../../components/Forms/Input';
import { ILoginValidation } from '../../../../models/auth';

const validate = Yup.object({
  email: Yup.string().email('emailInvalid').required('emailRequire'),
  password: Yup.string().min(4, 'minPasswordInvalid').required('passwordRequire'),
});

interface Props {
  onLogin(value: ILoginValidation): void;
  loading: boolean;
  errMessage: string;
}

const LoginForm2 = (props: Props) => {
  const { onLogin, loading, errMessage } = props;

  return (
    <div className="Login-container">
      <Formik
        initialValues={{
          email: '',
          password: '',
          rememberMe: true,
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          onLogin({
            email: values.email,
            password: values.password,
          });
        }}
      >
        <Form>
          <Input label="email" name="email" type="email" placeholder="Type your email address..." />

          <Input label="password" name="password" type="password" placeholder="Type your password..." />

          <Input label="" name="rememberMe" type="checkbox">
            <FormattedMessage id="rememberMe" />
          </Input>

          <button className="btn btn-primary" type="submit">
            {!loading && <span>Submit</span>}
            {loading && <span>Loading...</span>}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm2;
