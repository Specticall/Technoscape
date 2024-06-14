import useCompanyQuery from "../../service/useCompanyQuery";
import { ScrollArea } from "../general.tsx/ScrollArea";
import CompanyCard from "./CompanyCard";

export default function CompanyList() {
  const { companyData } = useCompanyQuery();

  console.log(companyData);

  return (
    <div className="flex-1">
      <ScrollArea className="h-0 min-h-full">
        <div className="">
          {companyData?.map((company) => {
            return (
              <CompanyCard
                name={company.name}
                description={"Company description here..."}
              />
            );
          })}
          {/* <CompanyCard highlighted />
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
          <CompanyCard /> */}
        </div>
      </ScrollArea>
    </div>
  );
}
