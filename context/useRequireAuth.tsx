import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthProvider } from "./useAuth";

const useRequireAuth = () => {
  const auth = useAuthProvider();
  const router = useRouter();

  useEffect(() => {
    if (!auth.user) {
      router.push("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.user]);

  return auth;
};

export default useRequireAuth;
