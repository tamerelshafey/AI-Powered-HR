

import React from 'react';
import { PortalNavItem } from '../../../types';
import { useI18n } from '../../../context/I18nContext';

interface PortalSidebarProps {
  navItems: PortalNavItem[];
  activeSection: string;
  setActiveSection: (sectionId: any) => void;
}

const PortalSidebar: React.FC<PortalSidebarProps> = ({ navItems, activeSection, setActiveSection }) => {
  const { t } = useI18n();
  return (
    <aside
      className={`bg-white shadow-lg h-screen flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out w-20 lg:w-64`}
    >
      <div className="flex items-center justify-center lg:justify-start h-20 border-b border-gray-100 px-6">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <i className="fas fa-user-circle text-white text-base"></i>
        </div>
        <span
          className="text-xl font-bold text-gray-900 ms-3 whitespace-nowrap overflow-hidden hidden lg:inline"
        >
          Bokra Portal
        </span>
      </div>
      <div className="flex-1 p-2 lg:p-6 overflow-y-auto">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const badgeContent = item.badgeKey ? t(item.badgeKey) : item.badgeCount;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                }}
                title={t(item.nameKey)}
                className={`w-full flex items-center justify-center lg:justify-start lg:space-x-3 lg:space-x-reverse p-3 lg:px-4 lg:py-3 rounded-lg transition-colors duration-200 text-start ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <i className={`${item.icon} w-6 text-center`}></i>
                <span className="hidden lg:inline">{t(item.nameKey)}</span>
                {badgeContent && (
                  <span className={`ms-auto text-white text-xs px-2 py-0.5 rounded-full ${item.badgeColor} hidden lg:inline-block`}>
                    {badgeContent}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>
    </aside>
  );
};

export default PortalSidebar;
