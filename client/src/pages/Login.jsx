import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



function Login() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
        try{
            const res = await fetch('http://localhost:5000/api/login', {
                method:'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({ id, password }),
                })
            
            const data = await res.json();

            if (res.status === 200) {
                console.log("Login Successful");
                localStorage.setItem('user', JSON.stringify({ id }));
                navigate('/dashboard');
              } else if (res.status === 404) {
                alert("User Not Found ❌");
              } else {
                alert("Login failed 🚫");
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
                Username: <input name="Username" value={id} onChange={(e) => setId(e.target.value)}/>
                <br></br>
                Password: <input type="password" name="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br></br>
                <button type='submit'>Login</button>
            </form>
            Don't Have an Account? 
            <Link to='/register'>Click Here</Link>
            
        </div>
    )
};

export default Login;

