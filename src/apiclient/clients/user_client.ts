import { default as axios } from '@src/interceptors/axiosCoreInterceptor';
import { AuthResource } from '@src/models/AuthResource';
import { UserDataResource } from '@src/models/UserResource';
import { AxiosResponse, CancelTokenSource } from 'axios';

export const GetUserData = async (
  cancelToken: CancelTokenSource | undefined | null = null,
): Promise<UserDataResource> => {
  const endpoint = '/user';
  try {
    const response = await axios.get<
      AuthResource,
      AxiosResponse<UserDataResource>
    >(endpoint, { cancelToken: cancelToken?.token });
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
