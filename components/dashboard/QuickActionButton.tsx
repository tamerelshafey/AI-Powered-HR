
import React from 'react';
import { useI18n } from '../../context/I18nContext';

interface QuickActionButtonProps {
    icon: string;
    labelKey: string;
    color: string;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = React.memo(({ icon, labelKey, color }) => {
    const { t } = useI18n();
    return (
        <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <i className={`${icon} ${color} text-xl mb-2`}></i>
            <span className="text-sm font-medium text-gray-900">{t(labelKey)}</span>
        </button>
    );
});

export default QuickActionButton;
