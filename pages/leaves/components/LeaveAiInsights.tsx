
import React from 'react';
import AiInsightCard from '../../../components/dashboard/AiInsightCard';
import { useI18n } from '../../../context/I18nContext';

const LeaveAiInsights: React.FC = () => {
    const { t } = useI18n();
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <i className="fas fa-brain text-purple-600 me-2"></i>
                    {t('page.leaves.aiInsights.title')}
                </h3>
            </div>
            <div className="p-6 space-y-4">
                <AiInsightCard icon="fas fa-chart-line" color="blue" title={t('page.leaves.aiInsights.peakTime.title')} description={t('page.leaves.aiInsights.peakTime.desc')} />
                <AiInsightCard icon="fas fa-robot" color="green" title={t('page.leaves.aiInsights.autoApproval.title')} description={t('page.leaves.aiInsights.autoApproval.desc')} />
                <AiInsightCard icon="fas fa-exclamation-triangle" color="orange" title={t('page.leaves.aiInsights.coverageAlert.title')} description={t('page.leaves.aiInsights.coverageAlert.desc')} />
            </div>
        </div>
    );
};

export default LeaveAiInsights;
