import { UserPlus, LogIn, Home } from "lucide-react";
import { NavLink } from "react-router-dom";

const linkTab = [
  { title: "Sign In", href: "sign-in", icon: <LogIn size={16} /> },
  { title: "Sign Up,", href: "sign-up", icon: <UserPlus size={16} /> },
];

const AuthNav = () => {
  return (
    <header className="w-full overflow-x-hidden">
      <div
        className="max-w-6xl w-full mx-auto px-4 py-4 md:px-8 flex flex-col 
        items-center"
      >
        <nav className="flex items-center gap-2">
          {linkTab.map((link) => {
            return (
              <NavLink
                key={link.title}
                to={`/authentication/${link.href}`}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-2 px-6 bg-gray-50 rounded-lg ${
                    isActive ? "shadow-md bg-white" : ""
                  }`
                }
              >
                <span className="text-[10px] text-gray-600">{link.icon}</span>
                <span className="text-base text-gray-600 font-medium">
                  {link.title}
                </span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default AuthNav;
