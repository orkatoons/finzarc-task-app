import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

// Login.jsx
function Login() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!id || !password) {
            setError('Both fields are required!');
            return;
        }

        try {
            const res = await fetch(`https://finzarc-task-app.onrender.com/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, password }),
            });

            const data = await res.json();

            if (res.status === 200) {
                localStorage.setItem('user', JSON.stringify({ id }));
                navigate('/dashboard');
            } else if (res.status === 404) {
                setError('User Not Found ❌');
            } else {
                setError(data.message || 'Login failed 🚫');
            }
        } catch (err) {
            setError('Network error - try again later');
            console.error('Fetch error:', err);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2 className="auth-title">Finzarc Task Manager Login</h2>
                
                <div className="input-group">
                    <label>Username:</label>
                    <input 
                        name="Username" 
                        value={id} 
                        onChange={(e) => {
                            setId(e.target.value);
                            setError('');
                        }}
                        className="auth-input"
                    />
                </div>

                <div className="input-group">
                    <label>Password:</label>
                    <input 
                        type="password" 
                        name="Password" 
                        value={password} 
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError('');
                        }}
                        className="auth-input"
                    />
                </div>

                {error && <div className="error-message">{error}</div>}

                <button type='submit' className="auth-button">Login</button>

                <div className="auth-footer">
                    Don't Have an Account? 
                    <Link to='/register' className="auth-link">Click Here</Link>
                    <br></br>
                    <p style={{ color: 'red' }}>Quick & Dirty Prototype</p>
                </div>
            </form>
        </div>
    );
}
export default Login;

