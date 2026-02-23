import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, ShoppingCart, List, Utensils, Store, Tags, User } from "lucide-react";

function Navbar() {
  const location = useLocation();

  const navLinks = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      to: "/order",
      label: "Orders",
      icon: <List size={20} />,
    },
    {
      to: "/food",
      label: "Foods",
      icon: <Utensils size={20} />,
    },
    {
      to: "/restaurants",
      label: "Restaurants",
      icon: <Store size={20} />,
    },
    {
      to: "/categories",
      label: "Categories",
      icon: <Tags size={20} />,
    },
    {
      to: "/placeorder",
      label: "Place Order",
      icon: <ShoppingCart size={20} />,
    },
    {
      to: "/profile",
      label: "Profile",
      icon: <User size={20} />,
    },
  ];

  // You can add role-based filtering here if needed

  return (
    <nav className="bg-white border-b flex items-center justify-between px-6 py-3">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-purple-600 text-white font-semibold">
          R
        </span>
        <div className="flex flex-col">
          <div className="font-semibold text-gray-900 text-sm">
            RedX Restaurant Manager
          </div>
          <div className="text-xs text-gray-500">
            {location.pathname === "/dashboard" ? "Overview" : "Admin Panel"}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-colors ${
                isActive
                  ? "bg-purple-100 text-purple-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}

        <NavLink
          to="/profile"
          className="inline-flex md:hidden items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-gray-700"
        >
          <User size={18} />
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;