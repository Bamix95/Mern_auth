import { Outlet } from "react-router-dom";
import AuthNav from "../components/AuthNav";

const AuthLayout = () => {
  return (
    <main className="overflow-x-hidden pb-6">
      <AuthNav />
      <Outlet />
    </main>
  );
};

export default AuthLayout;
