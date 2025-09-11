
import React from 'react';

interface PageHeaderProps {
  onAddGoalClick: () => void;
  onScheduleReviewClick: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ onAddGoalClick, onScheduleReviewClick }) => (
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">إدارة الأداء</h2>
      <p className="text-gray-600">تتبع أداء الموظفين والمراجعات والأهداف</p>
    </div>
    <div className="flex items-center space-x-3 space-x-reverse mt-4 lg:mt-0">
      <button onClick={onAddGoalClick} className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
        <i className="fas fa-bullseye"></i>
        <span>تحديد الأهداف</span>
      </button>
      <button onClick={onScheduleReviewClick} className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        <i className="fas fa-calendar-plus"></i>
        <span>جدولة مراجعة</span>
      </button>
    </div>
  </div>
);

export default PageHeader;
