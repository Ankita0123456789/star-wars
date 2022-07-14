import Cookies from 'universal-cookie'

const cookies = new Cookies();

export const setCookie = (key: string, value: string, options?: any) => {
  cookies.set(key, value, options ?? { path: "/" });
};

export const setAllCookies = (cookies: any) => {
  const keys = Object.keys(cookies);
  if (keys && keys.length > 0) {
    keys.forEach((key) => {
      removeCookie(key);
      setCookie(key, cookies[key], { path: "/" });
    });
  }
  // cookies.forEach((value: string, key: string, options?: any) => {
  //   setCookie(key, value, options ?? { path: ""/"" });
  // });
};

export const getCookie = (key: string) => {
  return cookies.get(key);
};

export const getAllCookies = () => {
  return cookies.getAll();
};

export const removeCookie = (key: string) => {
  cookies.remove(key);
};

export const isSignedIn = () => {
  return !!getCookie("token");
};
