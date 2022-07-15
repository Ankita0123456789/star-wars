/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, createContext } from "react";

import { isSignedIn, setAllCookies, getAllCookies } from "../utils/helper";

// const authContext = createContext({ user: null } as any);
// const { Provider } = authContext;

export const GlobalContext = createContext({ user: null } as any);
// Provider hook that creates an auth object and handles it's state
export const UseAuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);

  const signIn = (name?: string) => {
    // const cookieEmail = getCookie("name");
    // const cookiePassword = getCookie");
    if (name) {
      setUser({ name });
      return {success: true}
    }
    return {success: false}
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
    <GlobalContext.Provider value={{ user, signIn, signOut, storeAllCookies }}>
      {children}
    </GlobalContext.Provider>
  );
};

// export function AuthProvider(props: { children: ReactNode }): JSX.Element {
//   const [user, setUser] = useState(null);
//   return <Provider value={{ user, setUser }}>{props.children}</Provider>;
// }
