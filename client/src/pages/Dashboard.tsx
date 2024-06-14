import Top from "../components/Top";
import CompanyList from "../components/dashboard/CompanyList";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-[1fr_2fr]">
      <CompanyList />
      <Top />
    </div>
  );
}
