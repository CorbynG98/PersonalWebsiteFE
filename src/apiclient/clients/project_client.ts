import { ProjectData } from '../../models/ProjectData';
import { AxiosResponse, CancelTokenSource } from 'axios';
import { default as axios } from '../../interceptors/axiosCoreInterceptor';

export const GetProjects = async (
  cancelToken: CancelTokenSource | undefined | null = null,
): Promise<ProjectData[]> => {
  const endpoint = '/project';
  try {
    var response = await axios.get<null, AxiosResponse<ProjectData[]>>(
      endpoint,
      { cancelToken: cancelToken?.token },
    );
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
