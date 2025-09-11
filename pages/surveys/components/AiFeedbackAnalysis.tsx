import React from 'react';
import { SurveyAnalytics, Sentiment } from '../../../types';
import { useI18n } from '../../../context/I18nContext';

interface AiFeedbackAnalysisProps {
    analysis: SurveyAnalytics['openTextAnalysis'];
}

const sentimentClasses: Record<Sentiment, string> = {
    Positive: 'bg-green-100 text-green-800',
    Negative: 'bg-red-100 text-red-800',
    Neutral: 'bg-gray-100 text-gray-800',
};

const AiFeedbackAnalysis: React.FC<AiFeedbackAnalysisProps> = ({ analysis }) => {
    const { t } = useI18n();

    return (
        <div className="bg-purple-50 rounded-lg border border-purple-200 p-4 h-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('page.surveys.analytics.aiAnalysis')}</h3>
            <p className="text-sm text-gray-600 mb-4">{t('page.surveys.analytics.aiAnalysis.description')}</p>
            
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-purple-100">
                        <tr>
                            <th className="px-4 py-2 text-start font-semibold text-purple-900">{t('page.surveys.analytics.aiAnalysis.theme')}</th>
                            <th className="px-4 py-2 text-start font-semibold text-purple-900">{t('page.surveys.analytics.aiAnalysis.sentiment')}</th>
                            <th className="px-4 py-2 text-start font-semibold text-purple-900">{t('page.surveys.analytics.aiAnalysis.mentions')}</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {analysis.map((item, index) => (
                            <tr key={index} className="border-b border-purple-100">
                                <td className="px-4 py-3 font-medium text-gray-800">{item.theme}</td>
                                <td className="px-4 py-3">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${sentimentClasses[item.sentiment]}`}>
                                        {item.sentiment}
                                    </span>
                                </td>
                                <td className="px-4 py-3 font-medium text-gray-800">{item.count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AiFeedbackAnalysis;
