import { CompanyProvider } from "../../context/CompanyContext";
import { Outlet } from "react-router-dom";
import { DialogComponents, DialogProvider } from "./Dialog";
import NewCompany from "../Dialog/NewCompany";
import PopupProvider from "./Popup";
import { AuthProvider } from "../../context/AuthContext";
import ForgotPassword from "../Dialog/ForgotPassword";
import ActionLanguageDialog from "../action/action-dialog/language/ActionLanguageDialog";
import { ActionProvider } from "../../context/ActionContext";

const dialog: DialogComponents = [
  {
    name: "newCompany",
    component: <NewCompany />,
    options: {
      collapseWhenClickOutside: true,
    },
  },
  {
    name: "forgotPassword",
    component: <ForgotPassword />,
    options: {
      collapseWhenClickOutside: true,
    },
  },
  {
    name: "action-language",
    component: <ActionLanguageDialog />,
    options: {
      collapseWhenClickOutside: true,
    },
  },
];

export default function ContextPool() {
  return (
    <CompanyProvider>
      <AuthProvider>
        <PopupProvider>
          <ActionProvider>
            <DialogProvider components={dialog}>
              <Outlet />
            </DialogProvider>
          </ActionProvider>
        </PopupProvider>
      </AuthProvider>
    </CompanyProvider>
  );
}
