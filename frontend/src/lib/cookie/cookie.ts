import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (
  name: string,
  value: string,
  option?: { path: string }
) => {
  return cookies.set(name, value, { ...option });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const removeCookie = (name: string) => {
  return cookies.remove(name);
};
