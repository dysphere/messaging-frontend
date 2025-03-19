import React, { useState, useEffect } from 'react';

const Login = () => {

    useEffect(() => {
        fetch("https://messaging-backend.fly.dev/login", { mode: "cors" })
          .then((response) => {
            if (response.status >= 400) {
              throw new Error("server error");
            }
            return response.json();
          })
          .then((response) => setAuth(true))
          .catch((error) => setError(error));
      }, []);

    useEffect(() => {
    fetch("https://messaging-backend.fly.dev/user", 
        { mode: "cors" })
        .then((response) => {
        if (response.status >= 400) {
            throw new Error("server error");
        }
        return response.json();
        })
        .then((response) => setUsername(response.username))
        .catch((error) => setError(error));
    }, []);

}

export default Login;