import { Link } from 'react-router-dom';
import { 
  HomeIcon,
  ClipboardDocumentIcon,
  UserGroupIcon,
  CogIcon,
  DocumentTextIcon,
  PlusCircleIcon ,
  ClipboardDocumentListIcon 
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link to="/dashboard" className="flex items-center p-2 rounded hover:bg-gray-700">
              <HomeIcon className="h-5 w-5 mr-3" />
              Dashboard
            </Link>
          </li>
          
          {/* Forms Section */}
          <li className="pt-2 mt-2 border-t border-gray-700">
            <span className="text-xs font-semibold text-gray-400 uppercase">Forms</span>
          </li>
          <li>
            <Link to="/forms" className="flex items-center p-2 rounded hover:bg-gray-700">
              <DocumentTextIcon className="h-5 w-5 mr-3" />
              All Forms
            </Link>
          </li>
          <li>
            <Link to="/forms/create" className="flex items-center p-2 rounded hover:bg-gray-700">
              <PlusCircleIcon className="h-5 w-5 mr-3" />
              Create Form
            </Link>
          </li>
           {/* Onboarding Section */}
          <li>
            <Link to="/onboarding" className="flex items-center p-2 rounded hover:bg-gray-700">
              <ClipboardDocumentListIcon className="h-5 w-5 mr-3" />
              Onboarding
            </Link>
          </li>

          {/* Users Section */}
          <li className="pt-2 mt-2 border-t border-gray-700">
            <span className="text-xs font-semibold text-gray-400 uppercase">Users</span>
          </li>
          <li>
            <Link to="/users" className="flex items-center p-2 rounded hover:bg-gray-700">
              <UserGroupIcon className="h-5 w-5 mr-3" />
              User Management
            </Link>
          </li>

          {/* Settings Section */}
          <li className="pt-2 mt-2 border-t border-gray-700">
            <span className="text-xs font-semibold text-gray-400 uppercase">System</span>
          </li>
          <li>
            <Link to="/settings" className="flex items-center p-2 rounded hover:bg-gray-700">
              <CogIcon className="h-5 w-5 mr-3" />
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;