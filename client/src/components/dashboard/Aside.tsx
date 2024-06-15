import { useState } from "react";
import SearchBar from "../general.tsx/SearchBar";
import CompanyList from "./CompanyList";
import SearchNavigator from "./SearchNavigator";
import { cn } from "../../utils/helper";
import { useDialog } from "../general.tsx/Dialog";

type Props = {
  onHide: () => void;
  hidden?: boolean;
};

export default function Aside({ onHide, hidden = false }: Props) {
  const { showDialog } = useDialog();

  const handleHide = () => {
    onHide();
  };

  return (
    <div
      className={cn(
        "row-span-2 border-r border-slate-200 min-h-screen flex flex-col overflow-hidden min-w-0 transition-all duration-500",
        hidden && "opacity-0"
      )}
    >
      <div className="p-5 flex flex-col h-full">
        <div className="mb-4 flex gap-4 items-center justify-center">
          <h2 className="font-semibold text-lg flex-1">Your Inbox</h2>
          <i
            className="bx bx-plus text-lg bg-slate-800 text-white rounded-sm w-5 h-5 flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-slate-600"
            onClick={() => showDialog("newCompany")}
          ></i>
          <i
            className="bx bx-sidebar text-2xl transition-all duration-200 hover:text-slate-600 text-slate-900 cursor-pointer"
            onClick={handleHide}
          ></i>
        </div>

        <SearchBar />
        <SearchNavigator />
        <CompanyList />
      </div>
    </div>
  );
}
