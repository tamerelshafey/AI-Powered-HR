
import React from 'react';
import { useI18n } from '../context/I18nContext';

interface ModulePlaceholderProps {
  title: string;
}

const ModulePlaceholder: React.FC<ModulePlaceholderProps> = ({ title }) => {
  const { t } = useI18n();
  return (
    <div>
      <h3 className="text-3xl font-medium text-gray-700">{title}</h3>
      <div className="mt-8 p-12 flex flex-col items-center justify-center bg-white rounded-lg shadow-md border-2 border-dashed border-gray-300 min-h-[60vh]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <h4 className="mt-4 text-xl font-semibold text-gray-600">{t('modulePlaceholder.underConstruction')}</h4>
        <p className="mt-2 text-gray-500">{t('modulePlaceholder.comingSoon')}</p>
      </div>
    </div>
  );
};

export interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
  const { t } = useI18n();
  return (
    <div className="text-center py-12 bg-red-50 border-s-4 border-red-500 rounded-e-lg" role="alert">
      <i className="fas fa-exclamation-triangle text-5xl text-red-500 mb-4"></i>
      <h3 className="text-xl font-semibold text-red-800">{t('errorDisplay.title')}</h3>
      <p className="text-red-700 mt-2">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          <i className="fas fa-sync-alt me-2"></i>
          {t('common.retry')}
        </button>
      )}
    </div>
  );
};


export default ModulePlaceholder;
