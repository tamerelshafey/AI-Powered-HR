

import React from 'react';
import { SuccessionPlan, JobTitle, SuccessorReadiness } from '../../../types';
import { useI18n } from '../../../context/I18nContext';

interface PlanCardProps {
    plan: SuccessionPlan;
    onNominateClick: (jobTitle: JobTitle) => void;
}

const readinessClasses: Record<SuccessorReadiness, string> = {
    [SuccessorReadiness.READY_NOW]: 'bg-green-100 text-green-800',
    [SuccessorReadiness.READY_1_2_YEARS]: 'bg-blue-100 text-blue-800',
    [SuccessorReadiness.FUTURE_POTENTIAL]: 'bg-purple-100 text-purple-800',
};

const PlanCard: React.FC<PlanCardProps> = ({ plan, onNominateClick }) => {
    const { t } = useI18n();

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">{plan.jobTitle.name}</h3>
                <p className="text-sm text-gray-600">{plan.jobTitle.department}</p>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Incumbent */}
                <div>
                    <h4 className="font-semibold text-gray-800 mb-3">{t('page.succession.planCard.incumbent')}</h4>
                    <div className="flex items-center space-x-3 space-x-reverse p-3 bg-gray-50 rounded-lg">
                         <div className={`w-10 h-10 ${plan.incumbent.avatarColor} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}>
                            {plan.incumbent.avatarInitials}
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800">{`${plan.incumbent.firstName} ${plan.incumbent.lastName}`}</p>
                            <p className="text-sm text-gray-600">{plan.incumbent.jobTitle}</p>
                        </div>
                    </div>
                </div>

                {/* Successors */}
                <div className="md:col-span-2">
                     <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-800">{t('page.succession.planCard.successors')}</h4>
                        <button onClick={() => onNominateClick(plan.jobTitle)} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700">
                            <i className="fas fa-plus me-1"></i> {t('page.succession.planCard.nominate')}
                        </button>
                    </div>
                    {plan.successors.length > 0 ? (
                        <div className="overflow-x-auto border rounded-lg">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-start font-medium text-gray-600">المرشح</th>
                                        <th className="px-4 py-2 text-start font-medium text-gray-600">{t('page.succession.planCard.readiness')}</th>
                                        <th className="px-4 py-2 text-start font-medium text-gray-600">{t('page.succession.planCard.performance')}</th>
                                        <th className="px-4 py-2 text-start font-medium text-gray-600">{t('page.succession.planCard.potential')}</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y">
                                    {plan.successors.map(s => (
                                        <tr key={s.employee.id}>
                                            <td className="px-4 py-3 font-medium">{`${s.employee.firstName} ${s.employee.lastName}`}</td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${readinessClasses[s.readiness]}`}>
                                                    {t(`enum.successorReadiness.${s.readiness}`)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">{s.performance}</td>
                                            <td className="px-4 py-3">{s.potential}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                            <p>لا يوجد خلفاء مرشحون لهذا المنصب بعد.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PlanCard;