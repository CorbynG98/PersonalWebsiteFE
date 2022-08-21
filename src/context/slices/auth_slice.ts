import { Authenticate, Signout } from '@src/apiclient/apiclient';
import { LoginData } from '@src/models/LoginData';
import { State } from '@src/models/State';
import {
  getCookie,
  removeCookie,
  setAuthCookie,
} from '@src/storageclient/storageclient';
import { CancelTokenSource } from 'axios';
import { ThunkAction } from 'redux-thunk';

type appInitData = {
  username: string | null;
  token: string | null;
};

type signinData = {
  username: string;
  token: string;
};

export type Action =
  | { type: 'SIGN_IN'; data: signinData }
  | { type: 'SIGN_OUT' }
  | { type: 'APP_INIT'; data: appInitData };

export const initBaseData =
  (): ThunkAction<void, State, unknown, Action> => async (dispatch) => {
    const authData = await getCookie('cgAuthData');
    dispatch({
      type: 'APP_INIT',
      data: { username: authData?.username, token: authData?.token },
    });
  };

export const signIn =
  (
    loginData: LoginData,
    cancelToken: CancelTokenSource | undefined | null = null,
  ): ThunkAction<void, State, unknown, Action> =>
  async (dispatch) => {
    // Do some other stuff here to actually call API to login
    var result = await Authenticate(loginData, cancelToken);
    await setAuthCookie(result.username ?? '', result.sessionToken ?? '');
    dispatch({
      type: 'SIGN_IN',
      data: {
        username: result.username ?? '',
        token: result.sessionToken ?? '',
      },
    });
  };

export const signOut =
  (
    cancelToken: CancelTokenSource | undefined | null = null,
  ): ThunkAction<void, State, unknown, Action> =>
  async (dispatch) => {
    // Do some stuff here to revoke the access token api side
    await Signout(cancelToken);
    await removeCookie('cgAuthData');
    dispatch({ type: 'SIGN_OUT' });
  };
