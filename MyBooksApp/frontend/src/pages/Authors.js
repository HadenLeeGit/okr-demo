import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useLocation } from 'react-router-dom';

function Authors() {
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem('username'); // 从 localStorage 获取用户名

  useEffect(() => {

    // get all authors
    const fetchAuthors = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/books', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const uniqueAuthors = [...new Set(response.data.map(book => book.author))];
        setAuthors(uniqueAuthors);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAuthors();
  }, []);

  // logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');  // redirect to login page
    window.location.reload();  // reload the page
  };

  return (
    <div className="container mx-auto p-4">
      <nav className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <Link to="/" className={`text-lg ${location.pathname === '/' ? 'font-bold' : ''}`}>My Books</Link>
          <Link to="/authors" className={`text-lg ${location.pathname === '/authors' ? 'font-bold' : ''}`}>All Authors</Link>
        </div>
        <div className="flex items-center space-x-4">
          <span>Welcome, {username}</span>
          <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded">Logout</button>
        </div>
      </nav>

      <ul className="list-disc list-inside">
        {authors.map((author, index) => (
          <li key={index}>{author}</li>
        ))}
      </ul>
    </div>
  );
}

export default Authors;
