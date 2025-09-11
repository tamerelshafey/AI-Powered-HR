
import React from 'react';
import { useI18n } from '../../context/I18nContext';

interface StatsCardProps {
    icon: string;
    labelKey: string;
    value: string;
    change?: string;
    changeColor?: string;
    iconBgColor: string;
    iconColor: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, labelKey, value, change, changeColor, iconBgColor, iconColor }) => {
    const { t } = useI18n();
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600 mb-1">{t(labelKey)}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                    {change && <p className={`text-xs mt-1 ${changeColor}`}>{change}</p>}
                </div>
                <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center`}>
                    <i className={`${icon} ${iconColor} text-xl`}></i>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
