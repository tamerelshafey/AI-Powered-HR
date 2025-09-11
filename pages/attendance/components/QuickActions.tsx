
import React from 'react';
import { useI18n } from '../../../context/I18nContext';

const ActionButton: React.FC<{ icon: string; titleKey: string; subtitleKey: string; subtitleParams?: { [key: string]: string | number }; iconBg: string; iconColor: string }> = ({ icon, titleKey, subtitleKey, subtitleParams, iconBg, iconColor }) => {
    const { t } = useI18n();
    return (
        <button className="w-full flex items-center space-x-3 space-x-reverse p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-start">
            <div className={`w-10 h-10 ${iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <i className={`${icon} ${iconColor}`}></i>
            </div>
            <div>
                <p className="font-medium text-gray-900">{t(titleKey)}</p>
                <p className="text-xs text-gray-500">{t(subtitleKey, subtitleParams)}</p>
            </div>
        </button>
    );
};

const QuickActions: React.FC = () => {
    const { t } = useI18n();
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">{t('page.attendance.quickActions.title')}</h3>
            </div>
            <div className="p-6 space-y-4">
                <ActionButton icon="fas fa-sign-in-alt" titleKey="page.attendance.quickActions.manualEntry" subtitleKey="page.attendance.quickActions.manualEntryDesc" iconBg="bg-green-100" iconColor="text-green-600" />
                <ActionButton icon="fas fa-exclamation-circle" titleKey="page.attendance.quickActions.viewViolations" subtitleKey="page.attendance.quickActions.viewViolationsDesc" subtitleParams={{ count: 12 }} iconBg="bg-red-100" iconColor="text-red-600" />
                <ActionButton icon="fas fa-chart-bar" titleKey="page.attendance.quickActions.generateReport" subtitleKey="page.attendance.quickActions.generateReportDesc" iconBg="bg-blue-100" iconColor="text-blue-600" />
                <ActionButton icon="fas fa-calendar-alt" titleKey="page.attendance.quickActions.scheduleSettings" subtitleKey="page.attendance.quickActions.scheduleSettingsDesc" iconBg="bg-purple-100" iconColor="text-purple-600" />
            </div>
        </div>
    );
};

export default QuickActions;
