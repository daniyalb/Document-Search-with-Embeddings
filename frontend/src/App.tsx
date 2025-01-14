import "./App.css";
import { createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import { useEffect, useState } from "react";
import { Session, createClient } from "@supabase/supabase-js";
import SupabaseAuth from "./components/SupabaseAuth";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const UserContext = createContext<{ userToken: string }>({
  userToken: "",
});

function App() {
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
      <Routes>
        <Route path="/" element={<Home session={session} />} />
        <Route
          path="/dashboard"
          element={
            session ? (
              <>
                <UserContext.Provider
                  value={{ userToken: session.access_token }}
                >
                  <Dashboard user={session.user} supabase={supabase} />
                </UserContext.Provider>
              </>
            ) : (
              <SupabaseAuth />
            )
          }
        />
        <Route path="*" element={<Home session={session} />} />
      </Routes>
    </div>
  );
}

export default App;
