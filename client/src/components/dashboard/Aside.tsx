import SearchBar from "../general.tsx/SearchBar";
import CompanyList from "./CompanyList";
import SearchNavigator from "./SearchNavigator";

export default function Aside() {
  return (
    <div className="row-span-2 border-r border-slate-200 min-h-screen p-5 flex flex-col">
      <div className="mb-4 flex gap-4 items-center justify-center">
        <h2 className="font-semibold text-lg flex-1">Your Inbox</h2>
        <i className="bx bx-plus text-lg bg-slate-800 text-white rounded-sm w-5 h-5 flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-slate-600"></i>
        <i className="bx bx-sidebar text-2xl transition-all duration-200 hover:text-slate-600 text-slate-900 cursor-pointer"></i>
      </div>

      <SearchBar />
      <SearchNavigator />
      <CompanyList />
    </div>
  );
}
