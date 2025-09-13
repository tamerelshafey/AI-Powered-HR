

import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { User } from '../types';
import { useI18n } from '../context/I18nContext';

const UserSwitcher: React.FC = () => {
    const { currentUser, availableUsers, switchUser } = useUser();
    const { t } = useI18n();
    const [isOpen, setIsOpen] = useState(false);

    const handleSelectUser = (user: User) => {
        switchUser(user);
        setIsOpen(false);
    };

    if (!currentUser) {
        return null;
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 space-x-reverse px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                aria-label={t('header.switchUserAria')}
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <i className="fas fa-user-cog"></i>
                <span className="hidden sm:inline text-sm font-medium">{t('header.switchUser')}</span>
            </button>

            {isOpen && (
                <div 
                    className="absolute end-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50 border border-gray-100"
                    onMouseLeave={() => setIsOpen(false)}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-switcher-button"
                >
                    <div className="p-4 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{t('userSwitcher.title')}</p>
                        <p className="text-xs text-gray-500">{t('userSwitcher.viewAs')}</p>
                    </div>
                    <div className="py-2 max-h-72 overflow-y-auto">
                        {availableUsers.map(user => (
                            <button
                                key={user.id}
                                onClick={() => handleSelectUser(user)}
                                className={`w-full text-start px-4 py-2 text-sm flex items-center space-x-3 space-x-reverse ${
                                    currentUser.id === user.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                                role="menuitem"
                            >
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-8 h-8 rounded-full object-cover"
                                    loading="lazy"
                                />
                                <div>
                                    <p className="font-medium">{user.name}</p>
                                    <p className="text-xs">{t(`enum.userRole.${user.role}`)}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserSwitcher;