import { Outlet } from "react-router-dom";
import DashBoardNav from "./DashBoardNav";

export default function DashboardLayout() {
  return (
    <div className="flex flex-col px-6 pt-20 font-poppins md:flex-row">
      <DashBoardNav />
      <Outlet />
    </div>
  );
}
