import "./App.css";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Home from "./routes/Home";
import Login from "./routes/Login";
import { AuthProvider, useAuth } from "./authContext";

function App() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const generateEmbedding = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/generate/embedding",
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    generateEmbedding();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    navigate("/login");
  };

  return (
    <div className="App">
      <nav>
        {auth ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
        <Link to="/">Home</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { auth } = useAuth();
  if (!auth) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

const AppWrapper: React.FC = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWrapper;
