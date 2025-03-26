import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, TextInput, PasswordInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { AuthContext } from "./AuthContext";
import Header from './Header';

const LoginForm = () => {

    const { addAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            username: '',
            password: '',
        },
    
        });

    const handleLogin = async (event) => {
        try {
            event.preventDefault();
            const formData = form.getValues();
            const response = await fetch("https://messaging-backend-m970.onrender.com/login",
                {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify(formData),
                }
            );
            const data = await response.json();
            addAuth(data.token);
            navigate("/chatroom");

        }
        catch(err) {
            console.error('Error logging in', err);
        }
    }

    return (
         <div>
                <form onSubmit={handleLogin}>
                    <TextInput
                    label="Username"
                    aria-label="Username"
                    name="username"
                    {...form.getInputProps('username')}
                    key={form.key('username')}
                    required/>
                    <PasswordInput
                    label="Password"
                    aria-label="Password"
                    name="password"
                    {...form.getInputProps('password')}
                    key={form.key('password')}
                    required/>
                    <Button type="submit">Log In</Button>
                </form>
            </div>
    );
}

const Login = () => {

    return (
        <div>
            <Flex direction="column">
            <Header></Header>
            <LoginForm></LoginForm>
            </Flex>
        </div>
    )

}

export default Login;