import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import { useEffect, useState } from "react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Auth } from "@supabase/auth-ui-react";
import { Session, createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL || "",
  process.env.REACT_APP_SUPABASE_ANON_KEY || ""
);

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

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    });

    const { data: { subscription }, } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }
  , []);

  if (!session) {
    return (
      <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
    );
  } else {
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
}

export default App;
