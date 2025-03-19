import React, {useState, useEffect} from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({children}) => {
    const [username, setUsername] = useState("");
    const [isAuth, setAuth] = useState(false);

    return (
    <AuthContext.Provider value={{ username, isAuth, setAuth, setUsername }}>
        {children}
      </AuthContext.Provider>
      );
};