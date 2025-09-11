import React from 'react';

interface PageHeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="text-center mb-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">أهلاً بك في مركز المساعدة</h2>
      <p className="text-gray-600 mb-6">كيف يمكننا مساعدتك اليوم؟</p>
      <div className="relative max-w-2xl mx-auto">
        <i className="fas fa-search absolute start-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        <input
          type="text"
          placeholder="ابحث عن مقالات، أسئلة، والمزيد..."
          className="w-full ps-12 pe-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default PageHeader;