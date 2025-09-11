
import React from 'react';
import { PortalNavItem } from '../../../types';

interface PortalSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  navItems: PortalNavItem[];
  activeSection: string;
  setActiveSection: (sectionId: any) => void;
}

const PortalSidebar: React.FC<PortalSidebarProps> = ({ isOpen, setIsOpen, navItems, activeSection, setActiveSection }) => {
  return (
    <aside
      className={`fixed lg:static inset-y-0 start-0 w-64 bg-white shadow-lg transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-300 ease-in-out z-40 overflow-y-auto`}
    >
      <div className="p-6">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setIsOpen(false);
              }}
              className={`w-full flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg transition-colors duration-200 text-start ${
                activeSection === item.id
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <i className={`${item.icon} w-6 text-center`}></i>
              <span>{item.name}</span>
              {item.badge && (
                <span className={`ms-auto text-white text-xs px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default PortalSidebar;
