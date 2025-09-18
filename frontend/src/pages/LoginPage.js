import '../styles/LoginPage.css';
import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

function LoginPage({onLoginSuccess, switchToRegister}){
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
            onLoginSuccess();
        }
    }, [onLoginSuccess]);

    //submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_URL}/api/user/login`, {
                email: email,
                password: password
            });

            if(response.data.token){
                localStorage.setItem("token", response.data.token);
                onLoginSuccess();
            }
            else {
                alert('login failed') ;
            }

        } catch (err) {
             alert('Login failed: ' + (err.response?.data?.message || err.message));
        }
               
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>Welcome back</h2>
            <input 
                type='email'
                placeholder='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input 
                type='password'
                placeholder='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <div className='container'>
            <button type='submit'>Login</button>
                <p>
                    New user? 
                    <span className="link" onClick={switchToRegister}>Register</span>
                </p>
            </div>
            
        </form>
        
    )


}

export default LoginPage;