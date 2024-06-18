import { useCompany } from "../../context/CompanyContext";
import useCompanyQuery from "../../service/useCompanyQuery";
import { ScrollArea } from "../general.tsx/ScrollArea";
import CompanyCard from "./CompanyCard";

export default function CompanyList() {
  const { companyData } = useCompanyQuery();
  const { selectedCompany, setSelectedCompany } = useCompany();

  return (
    <div className="flex-1">
      <ScrollArea className="h-0 min-h-full">
        <div className="">
          {companyData?.map((company) => {
            return (
              <CompanyCard
                key={company.id}
                highlighted={
                  selectedCompany && selectedCompany.id === company.id
                }
                onClick={() => setSelectedCompany(company)}
                name={company.name}
                description={"Company description here..."}
              />
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
