import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', username); // save username to localStorage
        navigate('/');  // redirect to dashboard
        window.location.reload();
      } else {
        alert('Login failed. Token not received.');
      }
    } catch (err) {
      console.error(err);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">MyBooks</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-lg font-bold mb-4">Login</h2>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="block w-full border p-2 mb-4" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full border p-2 mb-4" />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mb-4 block w-full">Login</button>
        <div className="text-center">
          <Link to="/register" className="text-blue-500">Don't have an account? Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
