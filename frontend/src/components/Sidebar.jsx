import { NavLink } from "react-router-dom";

function Sidebar() {
  const baseClasses =
    "w-full text-left px-4 py-2 rounded-lg transition-colors duration-150";

  return (
    <aside className="w-64 bg-white shadow-md hidden md:block">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-purple-600">RedX</h1>
      </div>

      <nav className="px-4 space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100 text-gray-800"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/food"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100 text-gray-800"
            }`
          }
        >
          Foods
        </NavLink>

        <NavLink
          to="/order"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100 text-gray-800"
            }`
          }
        >
          Orders
        </NavLink>

        <NavLink
          to="/restaurants"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100 text-gray-800"
            }`
          }
        >
          Restaurants
        </NavLink>

        <NavLink
          to="/categories"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100 text-gray-800"
            }`
          }
        >
          Categories
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;

