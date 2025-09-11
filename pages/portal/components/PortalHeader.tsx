
import React from 'react';
import { useUser } from '../../../context/UserContext';
import UserSwitcher from '../../../components/UserSwitcher';

interface PortalHeaderProps {
  onSidebarToggle: () => void;
}

const PortalHeader: React.FC<PortalHeaderProps> = ({ onSidebarToggle }) => {
  const { currentUser } = useUser();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4 space-x-reverse">
          <button onClick={onSidebarToggle} className="lg:hidden text-gray-600 hover:text-gray-900" aria-label="Toggle sidebar">
            <i className="fas fa-bars text-xl"></i>
          </button>
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <i className="fas fa-user-circle text-white text-lg"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">بوابة الموظف</h1>
              <p className="text-xs text-gray-500">مرحباً بعودتك، {currentUser.name.split(' ')[0]}!</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="hidden md:flex items-center space-x-2 space-x-reverse bg-green-50 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-700 font-medium">متصل</span>
          </div>
          
          <UserSwitcher />
          
          <button className="relative p-2 text-gray-600 hover:text-gray-900" aria-label="Notifications">
            <i className="fas fa-bell text-lg"></i>
            <span className="absolute top-0 end-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">5</span>
          </button>

          <button className="p-2 text-gray-600 hover:text-gray-900" aria-label="Search">
            <i className="fas fa-search text-lg"></i>
          </button>
          
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="text-start hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
              <p className="text-xs text-gray-500">{currentUser.jobTitle}</p>
            </div>
            <div className="w-8 h-8 bg-cover bg-center rounded-full" style={{ backgroundImage: `url(${currentUser.avatar})` }}>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PortalHeader;
