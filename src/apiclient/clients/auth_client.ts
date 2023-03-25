import { default as axios } from '@src/interceptors/axiosCoreInterceptor';
import { AuthData, AuthResource } from '@src/models/AuthResource';
import { SessionResource } from '@src/models/SessionResource';
import { AxiosResponse, CancelTokenSource } from 'axios';

export const Authenticate = async (
  data: AuthResource,
  cancelToken: CancelTokenSource | undefined | null = null,
): Promise<AuthData> => {
  let body = new FormData();
  body.append('username', data.username ?? '');
  body.append('password', data.password ?? '');
  const endpoint = '/user/login';
  try {
    const response = await axios.post<AuthResource, AxiosResponse<AuthData>>(
      endpoint,
      body,
      { cancelToken: cancelToken?.token },
    );
    var auth = {
      username: response.data.username,
      sessionToken: response.data.sessionToken,
    } as AuthData;
    return Promise.resolve(auth);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const Signout = async (
  cancelToken: CancelTokenSource | undefined | null = null,
) => {
  const endpoint = '/user/logout';
  try {
    await axios.post<null, AxiosResponse<null>>(endpoint, null, {
      cancelToken: cancelToken?.token,
    });
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
};

export const CheckAuth = async (
  cancelToken: CancelTokenSource | undefined | null = null,
) => {
  const endpoint = '/user/verifysession';
  try {
    var response = await axios.post<null, AxiosResponse<boolean>>(
      endpoint,
      null,
      {
        cancelToken: cancelToken?.token,
      },
    );
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const GetSessions = async (
  cancelToken: CancelTokenSource | undefined | null = null,
) => {
  const endpoint = '/session';
  try {
    var response = await axios.get<null, AxiosResponse<SessionResource[]>>(
      endpoint,
      {
        cancelToken: cancelToken?.token,
      },
    );
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const RevokeSession = async (
  sessionId: string,
  cancelToken: CancelTokenSource | undefined | null = null,
) => {
  const endpoint = `/session/revoke/${sessionId}`;
  try {
    await axios.delete<null, AxiosResponse>(endpoint, {
      cancelToken: cancelToken?.token,
    });
    return Promise.resolve('Session revoked');
  } catch (err) {
    return Promise.reject(err);
  }
};
