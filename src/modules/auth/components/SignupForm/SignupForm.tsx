import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FormattedMessage } from 'react-intl';

import './style.scss';
import Input from '../../../../components/Forms/Input';
import Select from '../../../../components/Forms/Select';
import { IGenders, ILocations } from '../../../../models/user';
import { ISignupParams } from '../../../../models/auth';

const validate = Yup.object({
  email: Yup.string().email('emailInvalid').required('emailRequire'),
  password: Yup.string().min(4, 'minPasswordInvalid').required('passwordRequire'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'matchPasswordInvalid')
    .required('passwordRequire'),
  name: Yup.string().required('nameRequire'),
  gender: Yup.string().required('genderRequire'),
  region: Yup.string().required('regionRequire'),
  state: Yup.string().required('stateRequire'),
});

interface Props {
  Genders: IGenders[];
  Regions: ILocations[] | undefined;
  States: ILocations[] | undefined;
  setIdLocations: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  onSignup(values: ISignupParams): Promise<void>;
}

const SignupForm = (props: Props) => {
  const { Genders, Regions, States, setIdLocations, loading, onSignup } = props;

  // reder options
  const rederOptions = (options: IGenders[] | ILocations[] | undefined) => {
    const arrRender: JSX.Element[] = [
      <option disabled selected value={''} key={''}>
        {''}
        -- select an option --
        {''}
      </option>,
    ];

    if (options) {
      options.map((option, i) => {
        if ('value' in option) {
          arrRender.push(
            <option value={option.value} key={i}>
              {option.label}
            </option>,
          );
        } else {
          arrRender.push(
            <option value={option.id} key={i}>
              {option.name}
            </option>,
          );
        }
      });
    }
    return arrRender;
  };

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const nameChange = (e.target as HTMLInputElement).name;
    const valueChange = (e.target as HTMLInputElement).value;

    if (nameChange === 'region') {
      setIdLocations(valueChange);
    }
  };

  return (
    <div className="signup-container">
      <Formik
        initialValues={{
          email: '',
          password: '',
          repeatPassword: '',
          name: '',
          gender: '',
        }}
        validationSchema={validate}
        onSubmit={(values: ISignupParams) => {
          onSignup(values);
        }}
      >
        <Form onChange={(e) => handleChange(e)}>
          <Input label="email" name="email" type="email" placeholder="Type your email address..." />
          <Input label="password" name="password" type="password" placeholder="Type your password..." />
          <Input label="repeatPassword" name="repeatPassword" type="password" placeholder="Repeat your password..." />
          <Input label="name" name="name" type="text" placeholder="Type your name..." />
          <Select label="gender" name="gender">
            {rederOptions(Genders)}
          </Select>
          <Select label="region" name="region">
            {rederOptions(Regions)}
          </Select>
          <Select label="state" name="state">
            {rederOptions(States)}
          </Select>

          <button className="btn btn-primary" type="submit">
            {!loading && <span>Submit</span>}
            {loading && <span>Loading...</span>}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default SignupForm;
