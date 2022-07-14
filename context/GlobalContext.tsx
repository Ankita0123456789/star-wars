/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, createContext } from "react";

import {
  isSignedIn,
  setAllCookies,
  getAllCookies,
  getCookie,
} from "../utils/helper";

export const GlobalContext = createContext({ user: null } as any);
// const { Provider } = authContext;

// Provider hook that creates an auth object and handles it's state
const GlobalContextProvider: any = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);

  const signIn = (email?: string, password?: string) => {
    const cookieEmail = getCookie("email");
    const cookiePassword = getCookie("password");

    if (email && password) {
      if (email === cookieEmail) {
        if (password === cookiePassword) {
          return { success: true, message: "User already signed in" };
        }
        return { success: false, message: "Wrong password" };
      }
      setAllCookies({ email, password });
      setUser({ email, password });
      return { success: true, message: "User signed in" };
    }
    return { success: false };
  };

  const getUserDetails = () => {
    const user = getAllCookies();
    setUser(user);
  };

  const storeAllCookies = (cookies: any) => {
    setAllCookies(cookies);
    getUserDetails();
  };

  const signOut = () => {
    setUser(null);
    return { success: true };
  };

  useEffect(() => {
    if (isSignedIn()) {
      getUserDetails();
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        user,
        signIn,
        signOut,
        storeAllCookies,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;

// export function AuthProvider(props: { children: ReactNode }): JSX.Element {
//   const [user, setUser] = useState(null);
//   return <Provider value={{ user, setUser }}>{props.children}</Provider>;
// }
