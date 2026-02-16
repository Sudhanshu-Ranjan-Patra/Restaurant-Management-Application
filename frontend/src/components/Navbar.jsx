function Navbar() {
    return (
        <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Dashboard</h2>

          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search Order ID"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
              A
            </div>
          </div>
        </header>
    )
}

export default Navbar;