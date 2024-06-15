import { ReactNode, createContext, useContext } from "react";

type TAuthContextValues = {
  token: string;
  setToken: string;
};

const AuthContext = createContext<TAuthContextValues | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be used inside of it's Provider's scope");
  return context;
}
