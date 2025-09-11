import React, { useRef, useEffect } from 'react';
import { SurveyAnalytics } from '../../../types';
import StatsCard from '../../../components/dashboard/StatsCard';
import { useI18n } from '../../../context/I18nContext';
import AiFeedbackAnalysis from './AiFeedbackAnalysis';

declare var Chart: any;

interface AnalyticsDashboardProps {
    analytics: SurveyAnalytics;
}

const QuestionChart: React.FC<{ result: SurveyAnalytics['questionResults'][0] }> = ({ result }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<any>(null);

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: Object.keys(result.results),
                    datasets: [{
                        label: 'عدد الاستجابات',
                        data: Object.values(result.results),
                        backgroundColor: 'rgba(59, 130, 246, 0.5)',
                        borderColor: 'rgba(59, 130, 246, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
                }
            });
        }
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [result]);
    
    return (
        <div className="bg-white rounded-lg border p-4">
             <h4 className="font-medium text-gray-800 text-sm mb-2">{result.questionText}</h4>
            <div className="relative h-48">
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
};


const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ analytics }) => {
    const { t } = useI18n();

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">{t('page.surveys.analytics.title')}</h3>
            </div>
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatsCard icon="fas fa-users" labelKey="page.surveys.analytics.participation" value={`${analytics.participationRate}%`} change={`${analytics.questionResults[0].results[5]} ${t('page.surveys.analytics.responses')}`} iconBgColor="bg-blue-100" iconColor="text-blue-600" />
                    <StatsCard icon="fas fa-smile-beam" labelKey="page.surveys.analytics.engagementScore" value={`${analytics.engagementScore.toFixed(1)}${t('page.surveys.analytics.engagementScore.outOf5')}`} iconBgColor="bg-green-100" iconColor="text-green-600" />
                    <StatsCard icon="fas fa-comment-dots" labelKey="page.surveys.analytics.aiAnalysis" value={`${analytics.openTextAnalysis.length} ${t('page.surveys.analytics.aiAnalysis.theme')}`} iconBgColor="bg-purple-100" iconColor="text-purple-600" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('page.surveys.analytics.questionResults')}</h3>
                        <div className="space-y-4 max-h-[600px] overflow-y-auto p-2">
                           {analytics.questionResults.map(result => (
                                <QuestionChart key={result.questionId} result={result} />
                           ))}
                        </div>
                    </div>
                    <div>
                        <AiFeedbackAnalysis analysis={analytics.openTextAnalysis} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
