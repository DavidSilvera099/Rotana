import { Link } from "react-router-dom";

interface NavItem {
  icon: React.ReactNode;
  text: string;
  link: string;
}

interface NavbarProps {
  logo: string;
  items: NavItem[];
}

export const Navbar = ({ logo, items }: NavbarProps)  => {
  return (
    <div className="fixed z-10 h-full w-72 left-0">
      <nav>
        <div className="flex flex-col h-screen bg-transparent">
          {/* Logo section */}
          <div className="h-52">
            <div className="h-full w-full flex justify-center items-center">
              <div className="flex justify-center items-center w-56 h-56">
                <img src={logo} alt="logo ufinet" />
              </div>
            </div>
          </div>
          {/* Navigation items */}
          <div className="flex-auto w-full py-6">
            <ul className="flex flex-col gap-2 px-2">
              {items.map((item, idx) => (
                <li key={idx} >
                  <Link
                    to={item.link}
                    className="flex items-center gap-4 px-6 py-3 rounded-lg transition
                      hover:bg-blue-700 group"
                  >
                    <span className="text-2xl text-slate-100 group-hover:text-white transition">
                      {item.icon}
                    </span>
                    <span className="text-base font-semibold text-slate-100 group-hover:text-white transition">
                      {item.text}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};