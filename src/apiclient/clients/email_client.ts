import { default as axios } from '@src/interceptors/axiosCoreInterceptor';
import { AboutYouData } from '@src/models/AboutYouData';
import { EmailResource } from '@src/models/EmailResource';
import { AxiosResponse, CancelTokenSource } from 'axios';

export const SendContactEmail = async (
  emailData: EmailResource,
  cancelToken: CancelTokenSource | undefined | null = null,
) => {
  const endpoint = '/email/contact';
  try {
    await axios.post<EmailResource, AxiosResponse<AboutYouData>>(
      endpoint,
      emailData,
      { cancelToken: cancelToken?.token },
    );
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
};
