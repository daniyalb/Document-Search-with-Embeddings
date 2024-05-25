import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import axios from "axios";

// Define the shape of the context
interface AuthContextType {
  auth: boolean;
  setAuth: (auth: boolean) => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | null>(null);

// Define a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          await axios.get("http://localhost:8080/api/validate", {
            headers: { Authorization: token },
          });
          setAuth(true);
        } catch {
          setAuth(false);
        }
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
