
import React from 'react';
import { ActivityItem } from '../../../types';
import { useI18n } from '../../../context/I18nContext';

interface RecentActivityProps {
    activities: ActivityItem[];
}

const colorClasses: Record<string, { bg: string, text: string }> = {
    green: { bg: 'bg-green-100', text: 'text-green-600' },
    blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
    red: { bg: 'bg-red-100', text: 'text-red-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
};

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
    const { t } = useI18n();
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">{t('page.leaves.recentActivity.title')}</h3>
            </div>
            <div className="p-6">
                <div className="space-y-4 max-h-80 overflow-y-auto">
                    {activities.map(activity => {
                        const colors = colorClasses[activity.iconColor] || colorClasses.blue;
                        return (
                            <div key={activity.id} className="flex items-start space-x-3 space-x-reverse">
                                <div className={`w-8 h-8 ${colors.bg} rounded-full flex items-center justify-center flex-shrink-0`}>
                                    <i className={`${activity.icon} ${colors.text} text-sm`}></i>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-900">
                                        {t(activity.title.text, { highlight: '' })}
                                        {activity.title.highlight && <span className="font-medium">{activity.title.highlight}</span>}
                                    </p>
                                    <p className="text-xs text-gray-500">{activity.subtitle}</p>
                                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default RecentActivity;
