import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import { TextField, Button } from '@mui/material';
import { useState } from 'react';

export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function login() {
        try {
            let formData = { email, password };
            const formDataToSend = new FormData();
            for (let key in formData) {
                formDataToSend.append(key, formData[key]);
            }
            const url = process.env.REACT_APP_BASE_URL;
            console.log(formData);
            const response = await fetch(`${url}api/v1/login`, {
                method: 'POST',
                body: formDataToSend
            });
            if (!response.ok) {
                throw new Error('Invalid email or password');
            }
            const data = await response.json();
            if (data.success === 1 && data.data.token) {
                localStorage.setItem('token', data.data.token);
                navigate('/contact');
            } else {
                throw new Error('Login failed');
            }
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
                    id="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant='contained' onClick={login} >Log In</Button>

                {error ? <p style={{ color: 'red' }}>{error}</p> : <p></p>}
            </div>
        </>
    )
}
