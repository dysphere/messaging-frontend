import React, { useState } from 'react';
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
            await fetch("https://messaging-backend.fly.dev/login",
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
    <div>
        <form onSubmit={handleSignup}>
            <TextInput
            label="Username"/>
            <PasswordInput
            label="Password"/>
            <Button>Sign Up</Button>
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