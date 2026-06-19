import { Outlet } from "react-router-dom";
import SideNavBar from "../components/sideBar";

function ProtectedLayout() {
  return (
    <div className="flex h-screen">
      <SideNavBar />
      <Outlet />
    </div>
  );
}

export default ProtectedLayout;
