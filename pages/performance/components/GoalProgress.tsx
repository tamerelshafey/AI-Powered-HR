
import React from 'react';
import { CompanyGoal } from '../../../types';

interface GoalProgressProps {
    goals: CompanyGoal[];
    onViewGoal: (goal: CompanyGoal) => void;
}

const GoalProgress: React.FC<GoalProgressProps> = ({ goals, onViewGoal }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">تقدم الأهداف</h3>
        </div>
        <div className="p-6 space-y-2">
            {goals.length > 0 ? goals.map(goal => (
                <button 
                    key={goal.id}
                    onClick={() => onViewGoal(goal)}
                    className="w-full text-start p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{goal.title}</span>
                        <span className="text-sm font-bold text-blue-600">{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${goal.progress}%` }}></div>
                    </div>
                     <p className="text-xs text-gray-500 mt-1">{goal.department === 'All' ? 'هدف على مستوى الشركة' : `هدف ${goal.department}`}</p>
                </button>
            )) : (
                 <div className="text-center py-8 text-gray-500">
                    <i className="fas fa-bullseye-pointer text-4xl mb-3"></i>
                    <p>لا توجد أهداف محددة لهذا العرض.</p>
                </div>
            )}
        </div>
    </div>
);

export default GoalProgress;