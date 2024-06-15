import { PropsWithChildren } from "react";
import { CompanyProvider } from "../../context/CompanyContext";
import { Outlet } from "react-router-dom";
import { DialogComponents, DialogProvider } from "./Dialog";
import NewCompany from "../Dialog/NewCompany";
import PopupProvider from "./Popup";
import { AuthProvider } from "../../context/AuthContext";

const dialog: DialogComponents = [
  {
    name: "newCompany",
    component: <NewCompany />,
    options: {
      collapseWhenClickOutside: true,
    },
  },
];

export default function ContextPool() {
  return (
    <CompanyProvider>
      <AuthProvider>
        <DialogProvider components={dialog}>
          <PopupProvider>
            <Outlet />
          </PopupProvider>
        </DialogProvider>
      </AuthProvider>
    </CompanyProvider>
  );
}
