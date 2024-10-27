import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link, useLocation } from 'react-router-dom';

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('title');
  const [newBook, setNewBook] = useState({ title: '', author: '', isbn: '', category: '' });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem('username'); // 从 localStorage 获取用户名

  useEffect(() => {

    // get all books
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/books', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBooks(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBooks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');  // redirect to login page
    window.location.reload();  // reload the page
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/books', newBook, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBooks([...books, response.data]);
      setNewBook({ title: '', author: '', isbn: '', category: '' });
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert('Failed to add book.');
    }
  };

  const filteredBooks = books.filter(book => book[filter].toLowerCase().includes(search.toLowerCase()));

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

      <div className="flex justify-between items-center mb-4">
        <div className="flex">
          <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="border p-2 mb-4" />
          <select onChange={(e) => setFilter(e.target.value)} className="border p-2 mb-4 ml-2">
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="isbn">ISBN</option>
            <option value="category">Category</option>
          </select>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-green-500 text-white py-2 px-4 rounded">Add Book</button>
      </div>

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Author</th>
            <th className="px-4 py-2">ISBN</th>
            <th className="px-4 py-2">Category</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map(book => (
            <tr key={book._id}>
              <td className="border px-4 py-2">{book.title}</td>
              <td className="border px-4 py-2">{book.author}</td>
              <td className="border px-4 py-2">{book.isbn}</td>
              <td className="border px-4 py-2">{book.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Add New Book</h2>
            <form onSubmit={handleAddBook}>
              <input type="text" placeholder="Title" value={newBook.title} onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} className="block w-full border p-2 mb-2" />
              <input type="text" placeholder="Author" value={newBook.author} onChange={(e) => setNewBook({ ...newBook, author: e.target.value })} className="block w-full border p-2 mb-2" />
              <input type="text" placeholder="ISBN" value={newBook.isbn} onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })} className="block w-full border p-2 mb-2" />
              <input type="text" placeholder="Category" value={newBook.category} onChange={(e) => setNewBook({ ...newBook, category: e.target.value })} className="block w-full border p-2 mb-2" />
              <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">Add Book</button>
              <button onClick={() => setShowModal(false)} className="bg-gray-500 text-white py-2 px-4 rounded ml-2">Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
