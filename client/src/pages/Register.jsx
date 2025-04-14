import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Register.jsx
function Register() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!email) newErrors.email = 'Email required';
        else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Invalid email';
        
        if (!id) newErrors.id = 'Username required';
        else if (id.length < 3) newErrors.id = 'Too short (min 3 chars)';
        
        if (!password) newErrors.password = 'Password required';
        else if (password.length < 6) newErrors.password = 'Too weak (min 6 chars)';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, password, email }),
            });

            const data = await res.json();

            if (res.status === 200) {
                alert("Registration successful! 🎉");
                navigate('/');
            } else if (res.status === 409) {
                setErrors({ server: 'User already exists ❌' });
            } else {
                setErrors({ server: data.message || 'Registration failed 🚫' });
            }
        } catch (err) {
            setErrors({ server: 'Network error - try again' });
            console.error('Fetch error:', err);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2 className="auth-title">Register</h2>
                
                {errors.server && <div className="error-message">{errors.server}</div>}

                <div className="input-group">
                    <label>Email:</label>
                    <input 
                        name="EmailID" 
                        value={email} 
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors({...errors, email: ''});
                        }}
                        className={`auth-input ${errors.email ? 'input-error' : ''}`}
                    />
                    {errors.email && <div className="field-error">{errors.email}</div>}
                </div>

                <div className="input-group">
                    <label>Username:</label>
                    <input 
                        name="Username" 
                        value={id} 
                        onChange={(e) => {
                            setId(e.target.value);
                            setErrors({...errors, id: ''});
                        }}
                        className={`auth-input ${errors.id ? 'input-error' : ''}`}
                    />
                    {errors.id && <div className="field-error">{errors.id}</div>}
                </div>

                <div className="input-group">
                    <label>Password:</label>
                    <input 
                        type="password" 
                        name="Password" 
                        value={password} 
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setErrors({...errors, password: ''});
                        }}
                        className={`auth-input ${errors.password ? 'input-error' : ''}`}
                    />
                    {errors.password && <div className="field-error">{errors.password}</div>}
                </div>

                <button type='submit' className="auth-button">Register</button>
                <br></br>
                <div className="auth-footer">
                    Already Have an Account? 
                    <Link to='/' className="auth-link">Click Here</Link>
                </div>
            </form>
        </div>
    );
}

export default Register;

