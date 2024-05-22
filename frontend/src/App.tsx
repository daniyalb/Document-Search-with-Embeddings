import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
// import Login from './routes/Login';
import Home from './routes/Home'

function App() {
  useEffect(() => {
    const generateEmbedding = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/generate/embedding');
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    generateEmbedding();
  }
  , []);

  return (
    <div className="App">
      <nav>
        <Link to="/login">Login</Link>
        {/* <Link to="/logout" onClick={handleLogout}>Logout</Link> */}
        <Link to="/">Home</Link>
      </nav>
      <Routes>
        {/* <Route path="/login" element={<Login setAuth={setAuth} />} /> */}
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;