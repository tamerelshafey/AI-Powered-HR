

import React, { useState } from 'react';
// FIX: Switched to namespace import for react-router-dom to resolve module resolution errors.
import * as ReactRouterDOM from 'react-router-dom';
import { NAV_ITEMS } from '../constants';
import { NavItem } from '../types';
import { useUser } from '../context/UserContext';
import { ROLE_PERMISSIONS } from '../permissions';
import { useI18n } from '../context/I18nContext';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { currentUser } = useUser();
  const { t, language } = useI18n();
  const allowedPaths = ROLE_PERMISSIONS[currentUser.role] || [];
  const visibleNavItems = NAV_ITEMS.filter(item => allowedPaths.includes(item.path));
  
  const isRTL = language === 'ar';
  const collapseIcon = isRTL ? 'fa-chevron-right' : 'fa-chevron-left';
  const expandIcon = isRTL ? 'fa-chevron-left' : 'fa-chevron-right';

  return (
    <aside
      className={`bg-white shadow-lg h-screen flex flex-col sticky top-0 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex items-center h-20 border-b border-gray-100 px-6">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <i className="fas fa-brain text-white text-base"></i>
        </div>
        <span
          className={`text-xl font-bold text-gray-900 ms-3 whitespace-nowrap overflow-hidden transition-all duration-200 ${
            isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
          }`}
        >
          Bokra
        </span>
      </div>

      <nav className="flex-1 py-6 space-y-2 overflow-y-auto" aria-label="Main Navigation">
        <div className={`${isCollapsed ? 'px-2' : 'px-4'}`}>
          {visibleNavItems.map((item: NavItem) => (
            <ReactRouterDOM.NavLink
              key={item.path}
              to={item.path}
              title={isCollapsed ? t(item.nameKey) : undefined}
              className={({ isActive }) =>
                `flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isCollapsed ? 'justify-center' : ''
                } ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              {item.icon}
              <span
                className={`whitespace-nowrap overflow-hidden transition-opacity duration-200 ${
                  isCollapsed ? 'w-0 opacity-0' : 'opacity-100'
                }`}
              >
                {t(item.nameKey)}
              </span>
            </ReactRouterDOM.NavLink>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <i className={`fas ${isCollapsed ? expandIcon : collapseIcon}`}></i>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;