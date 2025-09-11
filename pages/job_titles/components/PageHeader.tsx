import React from 'react';

interface PageHeaderProps {
  onAddJobTitle: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ onAddJobTitle }) => (
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">المسميات الوظيفية</h2>
      <p className="text-gray-600">إدارة التسلسل الهرمي للمسميات الوظيفية في الشركة.</p>
    </div>
    <div className="flex items-center space-x-3 space-x-reverse mt-4 lg:mt-0">
      <button onClick={onAddJobTitle} className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        <i className="fas fa-plus"></i>
        <span>إضافة مسمى وظيفي</span>
      </button>
    </div>
  </div>
);

export default PageHeader;
