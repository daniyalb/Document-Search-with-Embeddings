import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Login from './routes/Login';
import Home from './routes/Home'

function App() {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (auth) console.log('Authenticated');
      if (!token) {
        setAuth(false);
        return;
      }
      try {
        await axios.get('http://localhost:8080/api/validate', {
          headers: { Authorization: token },
        });
        setAuth(true);
      } catch {
        setAuth(false);
        localStorage.removeItem('token');
      }
    };
    checkAuth();
  }, []);

  const handleLogout = () => {
    setAuth(false);
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div className="App">
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/logout" onClick={handleLogout}>Logout</Link>
        <Link to="/">Home</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;