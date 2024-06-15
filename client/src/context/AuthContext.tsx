import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type TAuthContextValues = {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  handleSetToken: (token: string) => void;
};

const AuthContext = createContext<TAuthContextValues | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState("");

  const handleSetToken = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    setToken(token);
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, handleSetToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be used inside of it's Provider's scope");
  return context;
}
