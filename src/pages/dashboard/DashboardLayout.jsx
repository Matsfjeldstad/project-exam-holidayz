import { Outlet } from "react-router-dom";
import DashBoardNav from "../../components/ui/DashBoardNav";

export default function DashboardLayout() {
  return (
    <div className="flex flex-col font-poppins md:flex-row">
      <DashBoardNav />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}
