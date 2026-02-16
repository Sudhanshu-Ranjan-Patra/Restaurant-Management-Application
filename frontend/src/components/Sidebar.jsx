function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md hidden md:border-l-black">
        <div className="p-6">
            <h1 className="text-2xl font-bold text-purple-600">RedX</h1>
        </div>

        <nav className="px-4 space-y-2">
          <button className="w-full text-left px-4 py-2 rounded-lg bg-blue-600 text-white">
            Dashboard
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">
            Transactions
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">
            Customers
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">
            Orders
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">
            Reports
          </button>
        </nav>
    </aside>
  );
}

export default Sidebar;
