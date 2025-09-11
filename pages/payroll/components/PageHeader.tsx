import React from 'react';

interface PageHeaderProps {
  onRunPayrollClick: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ onRunPayrollClick }) => (
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">الرواتب والتعويضات</h2>
      <p className="text-gray-600">إدارة مكونات الرواتب، وحزم التعويضات، وإنشاء كشوف الرواتب</p>
    </div>
    <div className="flex items-center space-x-3 space-x-reverse mt-4 lg:mt-0">
      <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
        <i className="fas fa-cogs"></i>
        <span>إعدادات الرواتب</span>
      </button>
      <button onClick={onRunPayrollClick} className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        <i className="fas fa-play"></i>
        <span>تشغيل مسير رواتب جديد</span>
      </button>
    </div>
  </div>
);

export default PageHeader;
