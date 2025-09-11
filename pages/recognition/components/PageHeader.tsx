import React from 'react';
import { useI18n } from '../../../context/I18nContext';

const PageHeader: React.FC = () => {
    const { t } = useI18n();
    return (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('page.recognition.header.title')}</h2>
                <p className="text-gray-600">{t('page.recognition.header.subtitle')}</p>
            </div>
        </div>
    );
};

export default PageHeader;
