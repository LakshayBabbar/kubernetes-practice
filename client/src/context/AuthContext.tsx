import React, { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/usefetch";

interface AuthContextType {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  setIsAuth: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data } = useFetch("/auth");
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setIsAuth(data.isAuth);
    }
  }, [data]);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
