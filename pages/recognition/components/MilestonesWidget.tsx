import React from 'react';
import { Milestone } from '../../../types';
import { useI18n } from '../../../context/I18nContext';

interface MilestonesWidgetProps {
    milestones: Milestone[];
}

const MilestonesWidget: React.FC<MilestonesWidgetProps> = ({ milestones }) => {
    const { t } = useI18n();

    const getIconForType = (type: Milestone['type']) => {
        return type === 'ANNIVERSARY' 
            ? { icon: 'fas fa-calendar-star', color: 'bg-green-100 text-green-600' }
            : { icon: 'fas fa-birthday-cake', color: 'bg-purple-100 text-purple-600' };
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">{t('page.recognition.milestones.title')}</h3>
            </div>
            <div className="p-6">
                <div className="space-y-4">
                    {milestones.length > 0 ? milestones.map(milestone => {
                        const { icon, color } = getIconForType(milestone.type);
                        const title = milestone.type === 'ANNIVERSARY' 
                            ? `${milestone.years} ${t('page.recognition.milestones.anniversary')}`
                            : t('page.recognition.milestones.birthday');
                        
                        return (
                            <div key={milestone.id} className="flex items-center space-x-3 space-x-reverse">
                                <div className={`w-10 h-10 ${color} rounded-full flex items-center justify-center flex-shrink-0`}>
                                    <i className={icon}></i>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-800">{`${milestone.employee.firstName} ${milestone.employee.lastName}`}</p>
                                    <p className="text-xs text-gray-500">{title} - {milestone.date}</p>
                                </div>
                            </div>
                        );
                    }) : (
                        <p className="text-sm text-gray-500 text-center">لا توجد مناسبات قادمة هذا الأسبوع.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MilestonesWidget;
