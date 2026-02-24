import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, List, Utensils, User } from "lucide-react";

function Navbar() {
  const location = useLocation();

  const navLinks = [
    {
      to: "/place-order",
      label: "Order Food",
      icon: <ShoppingCart size={20} />,
      role: "customer",
    },
    {
      to: "/order-management",
      label: "Order Management",
      icon: <List size={20} />,
      role: "admin",
    },
    {
      to: "/food-management",
      label: "Food Management",
      icon: <Utensils size={20} />,
      role: "admin",
    },
    {
      to: "/profile",
      label: "Profile",
      icon: <User size={20} />,
      role: "all",
    },
  ];

  // You can add role-based filtering here if needed

  return (
    <nav className="bg-white shadow flex items-center px-6 py-3">
      <div className="font-bold text-xl text-purple-700 mr-8">Restaurant App</div>
      <div className="flex gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-2 px-3 py-2 rounded transition text-gray-700 hover:bg-purple-100 hover:text-purple-700 ${
              location.pathname === link.to ? "bg-purple-100 text-purple-700" : ""
            }`}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;