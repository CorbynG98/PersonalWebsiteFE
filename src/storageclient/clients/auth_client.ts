import Cookies from 'universal-cookie';

export const setAuthCookie = (username: string, token: string) => {
  const cookies = new Cookies();
  cookies.set('cgAuthData', { username: username, token: token });
};

export const getCookie = (cookieName: string) => {
  const cookies = new Cookies();
  return cookies.get(cookieName);
};

export const removeCookie = (cookieName: string) => {
  const cookies = new Cookies();
  cookies.remove(cookieName);
};
