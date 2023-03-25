import { default as axios } from '@src/interceptors/axiosCoreInterceptor';
import { AboutYouData } from '@src/models/AboutYouData';
import { AxiosResponse, CancelTokenSource } from 'axios';

export const GetAboutYouData = async (
  cancelToken: CancelTokenSource | undefined | null = null,
): Promise<AboutYouData> => {
  const endpoint = '/misc/aboutyoudata';
  try {
    const response = await axios.get<null, AxiosResponse<AboutYouData>>(
      endpoint,
      { cancelToken: cancelToken?.token },
    );
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
