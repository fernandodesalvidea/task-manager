import '../styles/RegisterPage.css';
import { useState } from 'react';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

function RegisterPage({onLoginSuccess, switchToLogin}){
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")

    //submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_URL}api/user/register`, {email, password});

            if(response.status === 201){
                alert('Registration successful! Please log in');
                switchToLogin();
            }

        } catch (err) {
             alert('registration failed: ' + (err.response?.data?.message || err.message));
        }
               
    }

    return(
        <form onSubmit={handleSubmit} id='register'>
            <h2>Create your account</h2>
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
            <button type='submit'>Register</button>
            <p>
                Already registered? 
                <span className="link" onClick={switchToLogin}>Log in</span>
            </p>
        </form>
    )


}

export default RegisterPage;