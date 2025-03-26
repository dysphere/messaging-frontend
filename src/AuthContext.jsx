import { createContext } from "react";

export const AuthContext = createContext({
    user: {},
    token: "",
    isAuth: false,
    addAuth: () => {},
    removeAuth: () => {},
  });