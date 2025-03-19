import React, {useState} from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [isAuth, setAuth] = useState(false);

    const addAuth = (user) => {
        setAuth(true);
        setUser(user);
    };

    const removeAuth = () => {
        setAuth(false);
        setUser({});
    };

    return (
    <AuthContext.Provider value={{ user, isAuth, addAuth, removeAuth }}>
        {children}
      </AuthContext.Provider>
      );
};