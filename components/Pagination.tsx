import React from 'react';
import { useI18n } from '../context/I18nContext';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const { t } = useI18n();
  if (totalPages <= 1) {
    return null;
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const pageNumbers = [];
  const maxPagesToShow = 5;
  const halfPagesToShow = Math.floor(maxPagesToShow / 2);
  let startPage = Math.max(1, currentPage - halfPagesToShow);
  let endPage = Math.min(totalPages, currentPage + halfPagesToShow);

  if (currentPage - halfPagesToShow <= 1) {
    endPage = Math.min(totalPages, maxPagesToShow);
  }

  if (currentPage + halfPagesToShow >= totalPages) {
    startPage = Math.max(1, totalPages - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const commonButtonClasses = "min-w-[40px] px-3 py-2 text-sm font-medium border border-gray-300 rounded-md transition-colors";
  const disabledButtonClasses = "bg-gray-100 text-gray-400 cursor-not-allowed";
  const activeButtonClasses = "bg-blue-600 text-white border-blue-600";
  const defaultButtonClasses = "bg-white text-gray-700 hover:bg-gray-50";

  return (
    <nav className="flex items-center justify-between mt-6" aria-label="Pagination">
      <div className="flex items-center space-x-2 space-x-reverse">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${commonButtonClasses} ${currentPage === 1 ? disabledButtonClasses : defaultButtonClasses}`}
        >
          {t('pagination.previous')}
        </button>

        {startPage > 1 && (
          <>
            <button onClick={() => handlePageChange(1)} className={`${commonButtonClasses} ${defaultButtonClasses}`}>1</button>
            {startPage > 2 && <span className="px-2 py-1 text-gray-500">...</span>}
          </>
        )}

        {pageNumbers.map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`${commonButtonClasses} ${currentPage === page ? activeButtonClasses : defaultButtonClasses}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-2 py-1 text-gray-500">...</span>}
            <button onClick={() => handlePageChange(totalPages)} className={`${commonButtonClasses} ${defaultButtonClasses}`}>{totalPages}</button>
          </>
        )}
        
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${commonButtonClasses} ${currentPage === totalPages ? disabledButtonClasses : defaultButtonClasses}`}
        >
          {t('pagination.next')}
        </button>
      </div>

      <div className="text-sm text-gray-600">
        {t('pagination.pageInfo', { currentPage, totalPages })}
      </div>
    </nav>
  );
};

export default Pagination;
