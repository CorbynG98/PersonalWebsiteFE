import { default as axios } from '@src/interceptors/axiosCoreInterceptor';
import { AuthActivityResource } from '@src/models/AuthActivityResource';
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
  const endpoint = '/auth/login';
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
  const endpoint = '/auth/logout';
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
  const endpoint = '/auth/verifysession';
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
  pageSize: number = 10,
  page: number = 1,
  cancelToken: CancelTokenSource | undefined | null = null,
) => {
  const endpoint = `/auth/sessions?page=${page}&pageSize=${pageSize}`;
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

export const GetActivities = async (
  pageSize: number = 10,
  page: number = 1,
  cancelToken: CancelTokenSource | undefined | null = null,
) => {
  const endpoint = `/auth/authactivities?page=${page}&pageSize=${pageSize}`;
  try {
    var response = await axios.get<null, AxiosResponse<AuthActivityResource[]>>(
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
  const endpoint = `/auth/sessions/revoke/${sessionId}`;
  try {
    await axios.delete<null, AxiosResponse>(endpoint, {
      cancelToken: cancelToken?.token,
    });
    return Promise.resolve('Session revoked');
  } catch (err) {
    return Promise.reject(err);
  }
};
