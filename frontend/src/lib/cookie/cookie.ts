import { Cookies } from 'react-cookie';

interface CookieOption {
  path: string;
  secure: boolean;
}

const cookies = new Cookies();

export const setCookie = (
  name: string,
  value: string,
  option?: CookieOption
) => {
  return cookies.set(name, value, { ...option });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};
