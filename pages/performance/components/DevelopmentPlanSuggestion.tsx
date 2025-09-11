import React from 'react';
import { IndividualDevelopmentPlan } from '../../../types';

interface DevelopmentPlanSuggestionProps {
  plan: IndividualDevelopmentPlan;
  onApprove: () => void;
}

const DevelopmentPlanSuggestion: React.FC<DevelopmentPlanSuggestionProps> = ({ plan, onApprove }) => {
    return (
        <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg border">
                <h5 className="font-semibold text-gray-800 mb-3 text-green-600">
                    <i className="fas fa-thumbs-up me-2"></i>نقاط القوة
                </h5>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                    {plan.strengths.map((strength, index) => (
                        <li key={index}>{strength}</li>
                    ))}
                </ul>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border">
                <h5 className="font-semibold text-gray-800 mb-3 text-orange-600">
                    <i className="fas fa-lightbulb me-2"></i>مجالات التحسين
                </h5>
                 <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                    {plan.areasForImprovement.map((area, index) => (
                        <li key={index}>{area}</li>
                    ))}
                </ul>
            </div>

             <div className="p-4 bg-gray-50 rounded-lg border">
                <h5 className="font-semibold text-gray-800 mb-3 text-blue-600">
                    <i className="fas fa-bullseye me-2"></i>الأهداف المقترحة
                </h5>
                <div className="space-y-3">
                    {plan.goals.map(goal => (
                        <div key={goal.id} className="p-3 bg-white rounded-md border">
                            <p className="font-medium text-sm text-gray-800">{goal.description}</p>
                            <p className="text-xs text-gray-500 mt-1">التاريخ المستهدف: {goal.targetDate}</p>
                            {goal.resources && goal.resources.length > 0 && (
                                <div className="mt-2 pt-2 border-t">
                                    <h6 className="text-xs font-semibold text-gray-600">الموارد المقترحة:</h6>
                                    <ul className="list-disc list-inside text-xs text-blue-700 mt-1">
                                        {goal.resources.map((res, i) => (
                                            <li key={i}>{res.title} ({res.type})</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            
             <button onClick={onApprove} className="w-full px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold">
                الموافقة على الخطة ومشاركتها مع الموظف
            </button>
        </div>
    );
};

export default DevelopmentPlanSuggestion;
