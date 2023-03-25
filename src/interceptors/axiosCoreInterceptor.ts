import { signOut } from '@src/context/slices/auth_slice';
import { store } from '@src/context/store';
import { getCookie } from '@src/storageclient/storageclient';
import axios from 'axios';
import { Notyf } from 'notyf';
import appSettings from './appsettings.json';

const axiosCoreInstance = axios.create({
  baseURL: appSettings.apiUrl,
});

const notyf = new Notyf({
  dismissible: true,
  position: { x: 'right', y: 'top' },
});

axiosCoreInstance.interceptors.request.use(async (config: any) => {
  // Get data from async storage for processing reasons
  let auth = await getCookie('cgAuthData');
  if (auth != null && auth.token != null) {
    config.headers.Authorization = `${auth.token}`;
  }
  return config;
});

axiosCoreInstance.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    if (axios.isCancel(error)) return Promise.reject('Cancelled request');
    else {
      if (error.response == null) {
        notyf.error('Network error. Try again later!');
        return Promise.reject('Network error');
      }
      if (error.response.status === 401 || error.response.status === 403) {
        notyf.error('Authentication error.');
        store.dispatch(signOut()); // Rejection handled on next in few lines anyways. No need to reject here too.
      }
      return Promise.reject(error || 'Something went wrong');
    }
  },
);

export default axiosCoreInstance;
