import * as React from 'react';
import ContactList from './ContactList';
import "../App.css";
import { TextField, Button } from '@mui/material';
import { useState } from 'react';

export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function login() {
        try {
            const url = process.env.REACT_APP_BASE_URL
            const response = await fetch(`${url}api/v1/login`, {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
            if (!response.ok) {
                throw new Error('Invalid email or password');
            }
            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('user-type', data.role);
            console.log(data);
        } catch (error) {
            // Handle login errors
            setError(error.message);
        }
    }

    return (
        <>
            <div className='login-container'>
                <h2>Log In</h2>
                <TextField
                    id="outlined-required"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant='contained' onClick={login} >Log In</Button>

                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
            {/* <ContactList /> */}
        </>
    )
}