
import React from 'react';
import { useI18n } from '../../../context/I18nContext';

interface PageHeaderProps {
  onNewRequestClick: () => void;
  onCalendarClick: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ onNewRequestClick, onCalendarClick }) => {
  const { t } = useI18n();
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('page.leaves.header.title')}</h2>
        <p className="text-gray-600">{t('page.leaves.header.subtitle')}</p>
      </div>
      <div className="flex items-center space-x-3 space-x-reverse mt-4 lg:mt-0">
        <button onClick={onCalendarClick} className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          <i className="fas fa-calendar"></i>
          <span>{t('page.leaves.header.leaveCalendar')}</span>
        </button>
        <button onClick={onNewRequestClick} className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <i className="fas fa-plus"></i>
          <span>{t('page.leaves.header.newRequest')}</span>
        </button>
      </div>
    </div>
  );
};
export default PageHeader;
