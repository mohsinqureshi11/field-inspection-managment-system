const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300">
            <span className="sr-only">Notifications</span>
            <span className="h-6 w-6">🔔</span>
          </button>
          <div className="flex items-center">
            <img
              className="h-8 w-8 rounded-full"
              src="https://via.placeholder.com/40"
              alt="User profile"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;