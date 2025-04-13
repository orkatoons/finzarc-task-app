import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Register() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            const res = await fetch('http://localhost:5000/api/register', {
                method:'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({ id, password, email }),
                })
            
            const data = await res.json();

            if (res.status === 200) {
                alert("Registration successful! 🎉");
                navigate('/');
              } else if (res.status === 409) {
                alert("User already exists ❌");
              } else {
                alert("Registration failed 🚫");
                console.error(data);
              }
            
        }
        catch (err) {
            console.error('Fetch error:', err);
            alert("Something went wrong :/");
          }
      };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                EmailID: <input name="EmailID" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <br></br>
                Username: <input name="Username" value={id} onChange={(e) => setId(e.target.value)}/>
                <br></br>
                Password: <input type="password" name="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br></br>
                <button type='submit'>Register</button>
            </form>
        </div>
    )
};

export default Register;

