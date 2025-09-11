import React from 'react';
import { Survey, SurveyStatus } from '../../../types';
import { useI18n } from '../../../context/I18nContext';

interface SurveyListProps {
  surveys: Survey[];
}

const statusClasses: Record<SurveyStatus, string> = {
    [SurveyStatus.ACTIVE]: 'bg-green-100 text-green-800',
    [SurveyStatus.CLOSED]: 'bg-gray-100 text-gray-800',
    [SurveyStatus.DRAFT]: 'bg-yellow-100 text-yellow-800',
};

const SurveyList: React.FC<SurveyListProps> = ({ surveys }) => {
    const { t } = useI18n();

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">{t('page.surveys.list.title')}</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('dashboard.module.employeesDesc')}</th>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.surveys.list.status')}</th>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.surveys.list.completion')}</th>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.surveys.list.endDate')}</th>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('common.actions')}</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {surveys.map(survey => (
                            <tr key={survey.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <p className="text-sm font-medium text-gray-900">{survey.title}</p>
                                    <p className="text-sm text-gray-500">{survey.participantCount} مشارك</p>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[survey.status]}`}>
                                        {survey.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-full bg-gray-200 rounded-full h-2 me-3">
                                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${survey.completionRate}%` }}></div>
                                        </div>
                                        <span className="text-sm text-gray-600">{survey.completionRate}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{survey.endDate || '-'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button className="text-blue-600 hover:text-blue-900 me-3">عرض النتائج</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SurveyList;
