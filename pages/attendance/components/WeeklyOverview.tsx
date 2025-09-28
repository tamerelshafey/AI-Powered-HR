

import React from 'react';
import { WeeklyStat } from '../../../types';
import { useI18n } from '../../../context/I18nContext';

interface WeeklyOverviewProps {
    stats: WeeklyStat[];
}

const WeeklyOverview: React.FC<WeeklyOverviewProps> = ({ stats }) => {
    const { t } = useI18n();
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">{t('page.attendance.weeklyOverview.title')}</h3>
            </div>
            <div className="p-6">
                <div className="space-y-4">
                    {stats.map(stat => (
                        <div key={stat.day} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 w-20">
                                {t(stat.day)}
                                {stat.day === 'weekdays.Thursday' && <span className="text-xs text-blue-600 font-bold ms-1">({t('page.attendance.weeklyOverview.halfDay')})</span>}
                            </span>
                            <div className="flex items-center space-x-2 space-x-reverse flex-grow">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className={`${stat.percentage >= 90 ? 'bg-green-500' : 'bg-yellow-500'} h-2 rounded-full transition-all duration-300`} 
                                        style={{ width: `${stat.percentage}%` }}
                                    ></div>
                                </div>
                                <span className="text-sm font-medium text-gray-900 w-8 text-end">{stat.percentage}%</span>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-gray-500 mt-4 text-center border-t pt-3">
                    <i className="fas fa-info-circle me-1"></i>
                    {t('page.attendance.weeklyOverview.lawUpdateInfo')}
                </p>
            </div>
        </div>
    );
};

export default WeeklyOverview;