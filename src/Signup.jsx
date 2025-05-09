import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Button, TextInput, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import Header from './Header';

const Signup = () => {

    const navigate = useNavigate();

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          username: '',
          password: '',
        },
    
      });

    const handleSignup = async (event) => {
        try {
            event.preventDefault();
            const formData = form.getValues();
            await fetch("https://messaging-backend-m970.onrender.com/signup",
                {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify(formData),
                }
            );
            navigate("/login");

        }
        catch(err) {
            console.error('Error signing up', err);
        }
    }

return (
    <div className='flex justify-center'>
        <form onSubmit={handleSignup}>
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
            <Button type="submit">Sign Up</Button>
        </form>
    </div>
);
}

const SignupPage = () => {
    return (
        <div>
            <Flex direction="column">
            <Header></Header>
            <Signup></Signup>
            </Flex>
        </div>
    );
}

export default SignupPage;