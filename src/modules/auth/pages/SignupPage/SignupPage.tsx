import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { replace } from 'connected-react-router';
import Cookies from 'js-cookie';

import './style.scss';
import logo from '../../../../assets/logo-420-x-108.png';
import SignupForm from '../../components/SignupForm/SignupForm';
import { IGenders, ILocations, IUser } from '../../../../models/user';
import { AppState } from '../../../../redux/reducer';
import { fetchThunk } from '../../../common/redux/thunk';
import { API_PATHS } from '../../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../../utils/httpResponseCode';
import { setUserInfo } from '../../redux/authReducer';
import { ACCESS_TOKEN_KEY } from '../../../../utils/constants';
import { getErrorMessageResponse } from '../../../../utils';
import { ROUTES } from '../../../../configs/routes';
import { ISignupParams } from '../../../../models/auth';

const GENDERS: IGenders[] = [
  {
    value: 'Man',
    label: 'Nam',
  },
  {
    value: 'Woman',
    label: 'Nu',
  },
];

const SignupPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = React.useState(false);
  const [errMessage, setErrMessage] = React.useState('');
  const [regions, setRegions] = React.useState<ILocations[]>();
  const [states, setStates] = React.useState<ILocations[]>();
  const [idLocations, setIdLocations] = React.useState('');

  const getLocations = React.useCallback(async (id?: string) => {
    if (id) {
      console.log('get states');

      setLoading(true);
      const json = await dispatch(fetchThunk(API_PATHS.getLocation + id, 'get'));
      setLoading(false);

      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        setStates(json.data);
        return;
      }
    } else {
      console.log('get regions');

      setLoading(true);
      const json = await dispatch(fetchThunk(API_PATHS.getLocation, 'get'));
      setLoading(false);

      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        setRegions(json.data);
        return;
      }
    }
  }, []);

  React.useEffect(() => {
    getLocations(idLocations);
  }, [idLocations]);

  const onSignup = React.useCallback(
    async (values: ISignupParams) => {
      setErrMessage('');
      setLoading(true);

      const json = await dispatch(fetchThunk(API_PATHS.signUp, 'post', values));

      setLoading(false);

      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        console.log(json.data);

        alert('Dang ky thanh cong!');
        dispatch(replace(ROUTES.login));
        return;
      } else {
        setErrMessage(getErrorMessageResponse(json));
      }
    },
    [dispatch],
  );

  return (
    <div className="signup-page">
      <img className="signup-page-logo" src={logo} alt="logo" />
      {errMessage && <div className="signup-err">{errMessage}</div>}
      <SignupForm
        Genders={GENDERS}
        Regions={regions}
        States={states}
        setIdLocations={setIdLocations}
        loading={loading}
        onSignup={onSignup}
      />
      <a href="/login">Login</a>
    </div>
  );
};

export default SignupPage;
