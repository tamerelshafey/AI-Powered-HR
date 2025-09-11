import React from 'react';

interface PageHeaderProps {
  onStartOnboarding: () => void;
  onStartOffboarding: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ onStartOnboarding, onStartOffboarding }) => (
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">التعيين والفصل</h2>
      <p className="text-gray-600">أتمتة عمليات انضمام الموظفين الجدد ومغادرتهم للشركة</p>
    </div>
    <div className="flex items-center space-x-3 space-x-reverse mt-4 lg:mt-0">
      <button 
        onClick={onStartOffboarding}
        className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
        <i className="fas fa-door-closed"></i>
        <span>بدء عملية فصل</span>
      </button>
      <button 
        onClick={onStartOnboarding}
        className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        <i className="fas fa-door-open"></i>
        <span>بدء عملية تعيين</span>
      </button>
    </div>
  </div>
);

export default PageHeader;