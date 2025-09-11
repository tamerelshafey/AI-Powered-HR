
import React, { useState, useEffect, useMemo } from 'react';
import { CompanyGoal, KeyResult } from '../../../types';

interface GoalDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  goal: CompanyGoal | null;
  onUpdate: (updatedGoal: CompanyGoal) => void;
}

const GoalDetailsModal: React.FC<GoalDetailsModalProps> = ({ isOpen, onClose, goal, onUpdate }) => {
  const [keyResults, setKeyResults] = useState<KeyResult[]>([]);
  
  useEffect(() => {
    if (goal) {
      setKeyResults(JSON.parse(JSON.stringify(goal.keyResults)));
    }
  }, [goal]);

  const progress = useMemo(() => {
    if (keyResults.length === 0) return 0;
    const completedCount = keyResults.filter(kr => kr.isCompleted).length;
    return Math.round((completedCount / keyResults.length) * 100);
  }, [keyResults]);

  if (!isOpen || !goal) return null;

  const handleKeyResultToggle = (index: number) => {
    setKeyResults(prev => {
        const newKeyResults = [...prev];
        newKeyResults[index] = { ...newKeyResults[index], isCompleted: !newKeyResults[index].isCompleted };
        return newKeyResults;
    });
  };
  
  const handleUpdate = () => {
      const updatedGoal = { ...goal, keyResults, progress };
      onUpdate(updatedGoal);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 modal-backdrop z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
              <p className="text-sm text-gray-600">
                {goal.department === 'All' ? 'هدف على مستوى الشركة' : `هدف ${goal.department}`}
              </p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="text-sm font-bold text-blue-600 me-3 w-12">{progress}%</span>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <h4 className="font-semibold text-gray-800 mb-3">النتائج الرئيسية</h4>
          <div className="space-y-3">
            {keyResults.map((kr, index) => (
              <label key={index} className="flex items-center p-3 border rounded-lg bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={kr.isCompleted}
                  onChange={() => handleKeyResultToggle(index)}
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 me-3"
                />
                <span className={`text-sm ${kr.isCompleted ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                  {kr.description}
                </span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="p-6 border-t mt-auto bg-gray-50">
          <div className="flex justify-end space-x-3 space-x-reverse">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
              إغلاق
            </button>
            <button type="button" onClick={handleUpdate} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              تحديث التقدم
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalDetailsModal;
