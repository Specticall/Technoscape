import { PropsWithChildren } from "react";
import { CompanyProvider } from "../../context/CompanyContext";
import { Outlet } from "react-router-dom";
import { DialogComponents, DialogProvider } from "./Dialog";

const dialog: DialogComponents = [
  {
    name: "newCompany",
  },
];

export default function ContextPool() {
  return (
    <CompanyProvider>
      <DialogProvider>
        <Outlet />
      </DialogProvider>
    </CompanyProvider>
  );
}
