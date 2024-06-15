import { ReactNode, createContext, useContext, useState } from "react";
import { Company } from "../service/useCompanyQuery";

type TCompanyContextValues = {
  selectedCompany: Company | undefined;
  setSelectedCompany: React.Dispatch<React.SetStateAction<Company | undefined>>;
};

const CompanyContext = createContext<TCompanyContextValues | null>(null);

export function CompanyProvider({ children }: { children: ReactNode }) {
  const [selectedCompany, setSelectedCompany] = useState<undefined | Company>();

  return (
    <CompanyContext.Provider value={{ selectedCompany, setSelectedCompany }}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (!context)
    throw new Error("useCompany must be used inside of it's Provider's scope");
  return context;
}
