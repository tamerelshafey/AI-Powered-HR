
import React from 'react';
import AiInsightCard from '../../../components/dashboard/AiInsightCard';
import { useI18n } from '../../../context/I18nContext';

const AttendanceAiInsights: React.FC = () => {
    const { t } = useI18n();
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <i className="fas fa-brain text-purple-600 me-2"></i>
                    {t('page.attendance.aiInsights.title')}
                </h3>
            </div>
            <div className="p-6 space-y-4">
                <AiInsightCard icon="fas fa-chart-line" color="blue" title={t('page.attendance.aiInsights.patternDetection.title')} description={t('page.attendance.aiInsights.patternDetection.desc')} />
                <AiInsightCard icon="fas fa-exclamation-triangle" color="orange" title={t('page.attendance.aiInsights.lateTrend.title')} description={t('page.attendance.aiInsights.lateTrend.desc')} />
                <AiInsightCard icon="fas fa-thumbs-up" color="green" title={t('page.attendance.aiInsights.improvement.title')} description={t('page.attendance.aiInsights.improvement.desc')} />
            </div>
        </div>
    );
};

export default AttendanceAiInsights;
