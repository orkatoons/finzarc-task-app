import React from "react";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
    

    const handleLogout = async (e) => {
        e.preventDefault();
        localStorage.clear();
        navigate('/');

    }

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        return <p>Please Login to view your dashboard</p>
    }

    return (
        <div>
           <h1>Welcome to your dashboard {user.id} </h1>
           <br>
           </br>
           <button type="submit" onClick={handleLogout}>Logout</button>
        </div>


    )
}

export default Dashboard;