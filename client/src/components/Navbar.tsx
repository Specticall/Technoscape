import { useLocation, useNavigate } from "react-router-dom";
import Icons from "./Icons";
import { cn } from "../utils/helper";
import { Icon } from "lucide-react";

const navbarList = [
  {
    icon: <i className="bx bxs-inbox"></i>,
    route: "/app/dashboard/inbox",
  },
  {
    icon: <i className="bx bx-star"></i>,
    route: "/app/dashboard/starred",
  },
  {
    icon: <i className="bx bxs-archive-in"></i>,
    route: "/app/dashboard/archived",
  },
  {
    icon: <i className="bx bx-bar-chart-alt-2"></i>,
    route: "/app/statistics",
  },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed left-0 w-[4rem] bg-gray-200 top-0 bottom-0">
      <ul className="grid gap-3 justify-center w-full">
        <div className="pt-8 scale-[75%] w-full flex items-center justify-center">
          <Icons icon="logo" />
        </div>
        {navbarList.map((navbar) => {
          const isSelected = pathname === navbar.route;
          return (
            <li
              className={cn(
                "[&>i]:text-3xl cursor-pointer w-[4rem] flex items-center justify-center py-3 relative [&>i]:transition-all [&>i]:duration-200 transition-all duration-200 hover:[&>i]:opacity-30 [&>i]:text-slate-900",
                isSelected && "bg-white"
              )}
              onClick={() => navigate(navbar.route)}
            >
              <div
                className={cn(
                  "h-full w-[4px] bg-gray-400 absolute left-0 transition-all duration-200",
                  !isSelected && "opacity-0"
                )}
              ></div>
              {navbar.icon}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
