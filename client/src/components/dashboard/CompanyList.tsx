import { ScrollArea } from "../general.tsx/ScrollArea";
import CompanyCard from "./CompanyCard";

export default function CompanyList() {
  return (
    <div className="flex-1">
      <ScrollArea className="h-0 min-h-full">
        <div className="">
          <CompanyCard highlighted />
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
          <CompanyCard />
        </div>
      </ScrollArea>
    </div>
  );
}
