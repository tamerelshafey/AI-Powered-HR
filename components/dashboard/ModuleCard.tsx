
import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../context/I18nContext';

interface ModuleCardProps {
    icon: string;
    name: string;
    description: string;
    isCore?: boolean;
    isActive?: boolean;
    onToggle?: () => void;
    isToggleable?: boolean;
    path?: string;
    actions?: React.ReactNode;
}

const ModuleCard: React.FC<ModuleCardProps> = React.memo(({ icon, name, description, isCore = false, isActive, onToggle, isToggleable = false, path, actions }) => {
    const { t } = useI18n();

    const isNavigable = path && (isCore || isActive);

    const coreStyling = "p-4 rounded-lg border border-transparent bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex flex-col h-full";
    const optionalStyling = `p-4 rounded-lg border border-gray-200 bg-white flex flex-col h-full ${isActive ? '' : 'opacity-70 bg-gray-50'}`;
    const hoverStyling = "transition-all duration-300 transform hover:scale-105 hover:shadow-lg";

    const baseClasses = isCore ? coreStyling : optionalStyling;
    const finalClasses = `${baseClasses} ${isNavigable ? hoverStyling : ''}`;

    const cardContent = (
        <>
            {isCore ? (
                <>
                    <div className="flex items-center justify-between mb-2">
                        <i className={`${icon} text-lg`}></i>
                        <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">{t('dashboard.module.active')}</span>
                    </div>
                    <h5 className="font-medium mb-1">{name}</h5>
                    <p className="text-xs opacity-90 flex-grow">{description}</p>
                </>
            ) : (
                <>
                    <div className="flex items-center justify-between mb-2">
                        <i className={`${icon} text-lg ${isActive ? 'text-blue-600' : 'text-gray-600'}`}></i>
                        {isToggleable ? (
                             <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={isActive} onChange={onToggle} onClick={(e) => e.stopPropagation()} />
                                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        ) : (
                            <span className={`text-xs px-2 py-1 rounded-full ${isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>
                                {isActive ? t('dashboard.module.active') : t('dashboard.module.inactive')}
                            </span>
                        )}
                    </div>
                    <h5 className={`font-medium mb-1 ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>{name}</h5>
                    <p className="text-xs text-gray-600 flex-grow">{description}</p>
                </>
            )}
            {actions && (
                 <div className={`mt-3 pt-3 border-t ${isCore ? 'border-white border-opacity-20' : 'border-gray-200'}`}>
                    {actions}
                </div>
            )}
        </>
    );

    if (isNavigable) {
        return (
            <Link to={path!} className={finalClasses}>
                {cardContent}
            </Link>
        );
    }

    return (
        <div className={baseClasses}>
            {cardContent}
        </div>
    );
});

export default ModuleCard;
