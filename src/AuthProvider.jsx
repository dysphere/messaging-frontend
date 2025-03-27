import React, {useState, useEffect} from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [token, setToken] = useState("");
    const [isAuth, setAuth] = useState(false);

    const addAuth = (token) => {
        setAuth(true);
        setToken(token);
    };

    const removeAuth = () => {
        setAuth(false);
        setToken("");
    };

    useEffect(() => {
        if (token) {
        fetch("https://messaging-backend-m970.onrender.com/user",
            {
            headers: {
                'Authorization': `Bearer ${token}`
              },
            }
        )
          .then((response) => response.json())
          .then((response) => setUser(response.user))
          .catch((error) => console.error(error));
    }
      }, [isAuth, token]);

    return (
    <AuthContext.Provider value={{ user, token, isAuth, addAuth, removeAuth }}>
        {children}
      </AuthContext.Provider>
      );
};