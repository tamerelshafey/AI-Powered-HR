import React from 'react';
import { HelpCenterArticle } from '../../../types';

interface ArticleListProps {
  title: string;
  icon: string;
  articles: HelpCenterArticle[];
  onArticleClick: (article: HelpCenterArticle) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({ title, icon, articles, onArticleClick }) => {
  if (articles.length === 0) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 text-center py-12 text-gray-500">
            <i className="fas fa-search-minus text-4xl mb-3"></i>
            <p>لم يتم العثور على مقالات تطابق بحثك.</p>
        </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <i className={`${icon} text-blue-600 me-2`}></i>
            {title}
        </h3>
      </div>
      <div className="divide-y divide-gray-100">
        {articles.map(article => (
          <button
            key={article.id}
            onClick={() => onArticleClick(article)}
            className="w-full text-start p-4 hover:bg-gray-50 transition-colors flex justify-between items-center"
          >
            <div>
                <p className="font-medium text-gray-800">{article.title}</p>
                <p className="text-sm text-gray-500 mt-1">
                    آخر تحديث: {article.lastUpdated}
                </p>
            </div>
            <i className="fas fa-chevron-left text-gray-400"></i>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;