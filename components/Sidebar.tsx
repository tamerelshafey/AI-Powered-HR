

import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';
import { NavItem, OptionalModuleKey } from '../types';
import { useUser } from '../context/UserContext';
import { ROLE_PERMISSIONS } from '../permissions';
import { useI18n } from '../context/I18nContext';
import { useModules } from '../App';

const MODULE_PATHS: Record<OptionalModuleKey, string> = {
    payroll: '/payroll',
    documents: '/documents',
    recruitment: '/recruitment',
    performance: '/performance',
    learning: '/learning',
    onboarding: '/onboarding-offboarding',
    assets: '/assets',
    support: '/support-tickets',
    help_center: '/help-center',
    recognition: '/recognition',
    surveys: '/surveys',
    missions: '/missions',
    succession: '/succession',
    expenses: '/expenses',
    workforce_planning: '/workforce-planning',
};

const Sidebar: React.FC = () => {
  const { currentUser } = useUser();
  const { activeModules } = useModules();
  const { t } = useI18n();
  const allowedPaths = ROLE_PERMISSIONS[currentUser.role] || [];
  
  const visibleNavItems = NAV_ITEMS.filter(item => {
    if (!allowedPaths.includes(item.path)) {
      return false;
    }
    
    const moduleKey = Object.keys(MODULE_PATHS).find(
        key => MODULE_PATHS[key as OptionalModuleKey] === item.path
    ) as OptionalModuleKey | undefined;

    // If it's an optional module, check if it's active
    if (moduleKey) {
        return activeModules[moduleKey];
    }

    // If it's a core module/page, it's visible if it's in allowedPaths
    return true;
  });

  return (
    <aside
      className={`bg-white shadow-lg h-screen flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out w-20 lg:w-64`}
    >
      <div className="flex items-center justify-center lg:justify-start h-20 border-b border-gray-100 px-6">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <i className="fas fa-brain text-white text-base"></i>
        </div>
        <span
          className="text-xl font-bold text-gray-900 ms-3 whitespace-nowrap overflow-hidden hidden lg:inline"
        >
          Bokra
        </span>
      </div>

      <nav className="flex-1 py-6 space-y-2 overflow-y-auto" aria-label="Main Navigation">
        <div className="px-2 lg:px-4">
          {visibleNavItems.map((item: NavItem) => (
            <NavLink
              key={item.path}
              to={item.path}
              title={t(item.nameKey)}
              className={({ isActive }) =>
                `flex items-center justify-center lg:justify-start lg:space-x-3 lg:space-x-reverse p-3 lg:py-3 lg:px-4 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              {item.icon}
              <span className="whitespace-nowrap overflow-hidden hidden lg:inline">
                {t(item.nameKey)}
              </span>
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
