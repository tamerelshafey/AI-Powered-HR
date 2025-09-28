

import React from 'react';
import { useI18n } from '../../context/I18nContext';

interface ModuleCardProps {
    icon: string;
    name: string;
    description: string;
    isCore?: boolean;
    isActive?: boolean;
    onToggle?: () => void;
    isToggleable?: boolean;
}

const ModuleCard: React.FC<ModuleCardProps> = React.memo(({ icon, name, description, isCore = false, isActive, onToggle, isToggleable = false }) => {
    const { t } = useI18n();
    if (isCore) {
        return (
            <div className="p-4 rounded-lg border border-transparent bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                <div className="flex items-center justify-between mb-2">
                    <i className={`${icon} text-lg`}></i>
                    <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">{t('dashboard.module.active')}</span>
                </div>
                <h5 className="font-medium mb-1">{name}</h5>
                <p className="text-xs opacity-90">{description}</p>
            </div>
        );
    }

    return (
        <div className="module-card p-4 rounded-lg border border-gray-200 bg-white hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between mb-2">
                <i className={`${icon} text-lg ${isActive ? 'text-blue-600' : 'text-gray-600'}`}></i>
                {isToggleable ? (
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={isActive} onChange={onToggle} />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                ) : (
                    <span className={`text-xs px-2 py-1 rounded-full ${isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>
                        {isActive ? t('dashboard.module.active') : t('dashboard.module.inactive')}
                    </span>
                )}
            </div>
            <h5 className={`font-medium mb-1 ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>{name}</h5>
            <p className="text-xs text-gray-600">{description}</p>
        </div>
    );
});

export default ModuleCard;
