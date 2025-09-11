
import React from 'react';
import { useI18n } from '../../../context/I18nContext';

interface PageHeaderProps {
  onBiometricClick: () => void;
  onExportClick: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ onBiometricClick, onExportClick }) => {
  const { t } = useI18n();
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('page.attendance.header.title')}</h2>
        <p className="text-gray-600">{t('page.attendance.header.subtitle')}</p>
      </div>
      <div className="flex items-center space-x-3 space-x-reverse mt-4 lg:mt-0">
        <button onClick={onBiometricClick} className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          <i className="fas fa-fingerprint"></i>
          <span>{t('page.attendance.header.biometricCheck')}</span>
        </button>
        <button onClick={onExportClick} className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <i className="fas fa-download"></i>
          <span>{t('page.attendance.header.exportReport')}</span>
        </button>
      </div>
    </div>
  );
};

export default PageHeader;
