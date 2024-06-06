import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
// import { useEffect } from "react";
// import axios from "axios";
import Home from "./components/Home";

function App() {
  // useEffect(() => {
  //   const generateEmbedding = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:8080/api/generate/embedding",
  //         {
  //           headers: { Authorization: localStorage.getItem("token") },
  //         }
  //       );
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   generateEmbedding();
  // }, []);

  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
