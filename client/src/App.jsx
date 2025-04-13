// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login.jsx';
import PrivateRoute from './PrivateRoute.jsx';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard"/> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute>  <Dashboard /> </PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;