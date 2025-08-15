import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  CogIcon,
  DocumentTextIcon,
  PlusCircleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(false); // mobile par menu click hone ke baad close ho
  };

  return (
    <>
      {/* Top Navbar - Mobile */}
      <div className="bg-gray-800 text-white flex items-center justify-between p-4 md:hidden fixed top-0 left-0 right-0 z-40">
        <h1 className="text-lg font-bold">Admin Dashboard</h1>
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-md hover:bg-gray-700 transition-colors"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar - Mobile & Desktop */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:static transition-transform duration-300 ease-in-out z-50
        md:z-auto`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <button 
            className="md:hidden p-2 rounded-md hover:bg-gray-700 transition-colors" 
            onClick={() => setIsOpen(false)}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard"
                onClick={handleMenuClick}
                className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <HomeIcon className="h-5 w-5 mr-3" />
                Dashboard
              </Link>
            </li>

            {/* Forms Section */}
            <li className="pt-2 mt-2 border-t border-gray-700">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Forms</span>
            </li>
            <li>
              <Link
                to="/forms"
                onClick={handleMenuClick}
                className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <DocumentTextIcon className="h-5 w-5 mr-3" />
                All Forms
              </Link>
            </li>
            <li>
              <Link
                to="/forms/create"
                onClick={handleMenuClick}
                className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <PlusCircleIcon className="h-5 w-5 mr-3" />
                Create Form
              </Link>
            </li>
            <li>
              <Link
                to="/onboarding"
                onClick={handleMenuClick}
                className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <ClipboardDocumentListIcon className="h-5 w-5 mr-3" />
                Onboarding
              </Link>
            </li>

            {/* Officer Section */}
            <li className="pt-2 mt-2 border-t border-gray-700">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Officer</span>
            </li>
            <li>
              <Link
                to="/officer"
                onClick={handleMenuClick}
                className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <UserGroupIcon className="h-5 w-5 mr-3" />
                Officer Management
              </Link>
            </li>

            {/* Settings Section */}
            <li className="pt-2 mt-2 border-t border-gray-700">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">System</span>
            </li>
            <li>
              <Link
                to="/settings"
                onClick={handleMenuClick}
                className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <CogIcon className="h-5 w-5 mr-3" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Backdrop for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
