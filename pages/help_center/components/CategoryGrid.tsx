import React from 'react';
import { HelpCenterCategory } from '../../../types';

interface CategoryGridProps {
  categories: HelpCenterCategory[];
  onCategoryClick: (categoryId: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, onCategoryClick }) => {
  return (
    <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">تصفح حسب الفئة</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map(category => (
            <button
            key={category.id}
            onClick={() => onCategoryClick(category.id)}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-start hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <i className={`${category.icon} text-2xl`}></i>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">{category.name}</h4>
            <p className="text-sm text-gray-600 mb-3">{category.description}</p>
            <span className="text-xs text-blue-600 font-medium">{category.articleCount} مقالات</span>
            </button>
        ))}
        </div>
    </div>
  );
};

export default CategoryGrid;