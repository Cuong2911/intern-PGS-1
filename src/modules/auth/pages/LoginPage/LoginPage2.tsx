import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import Cookies from 'js-cookie';
import { replace } from 'connected-react-router';

import './style.scss';
import logo from '../../../../assets/logo-420-x-108.png';
import { ILoginParams } from '../../../../models/auth';
import { AppState } from '../../../../redux/reducer';
import { fetchThunk } from '../../../common/redux/thunk';
import { API_PATHS } from '../../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../../utils/httpResponseCode';
import { setUserInfo } from '../../redux/authReducer';
import { ACCESS_TOKEN_KEY } from '../../../../utils/constants';
import { ROUTES } from '../../../../configs/routes';
import { getErrorMessageResponse } from '../../../../utils';
import LoginForm2 from '../../components/LoginForm/LoginForm2';

const LoginPage2 = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrorMessage] = useState('');

  const onLogin = React.useCallback(
    async (values: ILoginParams) => {
      setErrorMessage('');
      setLoading(true);

      const json = await dispatch(
        fetchThunk(API_PATHS.signIn, 'post', { email: values.email, password: values.password }),
      );

      setLoading(false);

      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        dispatch(setUserInfo(json.data));
        Cookies.set(ACCESS_TOKEN_KEY, json.data.token, { expires: values.rememberMe ? 7 : undefined });
        dispatch(replace(ROUTES.home));
        return;
      } else {
        setErrorMessage(getErrorMessageResponse(json));
      }
    },
    [dispatch],
  );

  return (
    <div className="login-page">
      <img className="login-page-logo" src={logo} alt="logo" />
      {errMessage && <div className="login-err">{errMessage}</div>}
      <LoginForm2 onLogin={onLogin} loading={loading} errMessage={errMessage} />
      <a href="/sign-up">sign up</a>
    </div>
  );
};

export default LoginPage2;
