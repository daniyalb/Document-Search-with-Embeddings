import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import { useEffect, useState } from "react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Auth } from "@supabase/auth-ui-react";
import { Session, createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

console.log(SUPABASE_URL, SUPABASE_ANON_KEY);

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* protected routes like /dashboard */}
        <Route
          path="/dashboard"
          element={
            session ? (
              <Dashboard />
            ) : (
              <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                providers={["google"]}
              />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
