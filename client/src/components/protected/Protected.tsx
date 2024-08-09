import React, { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

const Protected = ({ children }: { children: React.ReactNode }) => {
  const { isAuth } = useContext(AuthContext);
  const router = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      router("/auth?mode=login");
    }
  }, [isAuth, router]);

  if (!isAuth) return null;
  return children;
};

export default Protected;
