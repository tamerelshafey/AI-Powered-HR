import React, { useState } from 'react';
import { HelpCenterArticle } from '../../../types';

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: HelpCenterArticle | null;
}

const ArticleModal: React.FC<ArticleModalProps> = ({ isOpen, onClose, article }) => {
  const [feedback, setFeedback] = useState<'none' | 'yes' | 'no'>('none');

  if (!isOpen || !article) return null;

  const handleClose = () => {
    setFeedback('none'); // Reset feedback state on close
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 modal-backdrop z-50 flex items-center justify-center p-4" onClick={handleClose}>
      <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">{article.title}</h3>
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            بواسطة: {article.author} • آخر تحديث: {article.lastUpdated} • <i className="fas fa-eye me-1"></i>{article.views} مشاهدة
          </p>
        </div>

        <div className="p-6 overflow-y-auto" dangerouslySetInnerHTML={{ __html: article.content }}>
        </div>
        
        <div className="p-6 border-t border-gray-200 mt-auto bg-gray-50">
            {feedback === 'none' && (
                <div className="flex items-center justify-center space-x-4 space-x-reverse">
                    <p className="text-sm font-medium text-gray-700">هل كان هذا المقال مفيداً؟</p>
                    <button onClick={() => setFeedback('yes')} className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-green-50 hover:border-green-400">نعم</button>
                    <button onClick={() => setFeedback('no')} className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-400">لا</button>
                </div>
            )}
            {feedback !== 'none' && (
                <p className="text-center text-sm font-medium text-green-700">شكراً لملاحظاتك!</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;