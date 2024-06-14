import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AppLayout() {
  return (
    <main className="grid grid-cols-[4rem_1fr]">
      <div></div>
      <Navbar />
      <Outlet />
    </main>
  );
}
