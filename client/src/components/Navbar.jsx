import { Link, NavLink } from "react-router-dom";

const linkTabs = [
  { title: "Home", href: "" },
  { title: "About", href: "about" },
  { title: "Sign In", href: "sign-in" },
];

const Navbar = () => {
  return (
    <header className="bg-gray-50">
      <div className="flex items-center justify-between max-w-6xl w-full mx-auto px-4 py-6">
        <Link to={"/"} className="font-bold text-[#282b33] text-xl md:text-2xl">
          Auth App
        </Link>

        <ul className="flex items-center gap-4 md:gap-8">
          {linkTabs.map((link) => (
            <li key={link.title}>
              <NavLink
                to={link.href === "" ? "/" : `/${link.href}`}
                className={({ isActive }) =>
                  `relative text-sm md:text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-gray-900 after:w-full"
                      : "text-[#282b33] hover:text-gray-600 after:w-0 hover:after:w-full"
                  } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-[#282b33] after:transition-all after:duration-300`
                }
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
