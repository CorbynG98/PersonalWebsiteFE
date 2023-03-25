import { default as axios } from '@src/interceptors/axiosCoreInterceptor';
import { ProjectResource } from '@src/models/ProjectResource';
import { AxiosResponse, CancelTokenSource } from 'axios';

export const GetProjects = async (
  cancelToken: CancelTokenSource | undefined | null = null,
): Promise<ProjectResource[]> => {
  const endpoint = '/project';
  try {
    var response = await axios.get<null, AxiosResponse<ProjectResource[]>>(
      endpoint,
      { cancelToken: cancelToken?.token },
    );
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
