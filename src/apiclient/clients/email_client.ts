import { AboutYouData } from '../../models/AboutYouData';
import { EmailData } from '../../models/EmailData';
import { AxiosResponse, CancelTokenSource } from 'axios';
import { default as axios } from '../../interceptors/axiosCoreInterceptor';

export const SendContactEmail = async (
  emailData: EmailData,
  cancelToken: CancelTokenSource | undefined | null = null,
) => {
  const endpoint = '/email/contact';
  try {
    await axios.post<EmailData, AxiosResponse<AboutYouData>>(
      endpoint,
      emailData,
      { cancelToken: cancelToken?.token },
    );
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
};
