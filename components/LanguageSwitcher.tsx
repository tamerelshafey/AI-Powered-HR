
import React from 'react';
import { useI18n } from '../context/I18nContext';

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useI18n();

    return (
        <div className="flex items-center space-x-1 space-x-reverse bg-gray-100 p-1 rounded-full">
            <button
                onClick={() => setLanguage('ar')}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${language === 'ar' ? 'bg-white shadow-sm text-blue-600 font-semibold' : 'text-gray-600'}`}
                aria-pressed={language === 'ar'}
            >
                العربية
            </button>
            <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${language === 'en' ? 'bg-white shadow-sm text-blue-600 font-semibold' : 'text-gray-600'}`}
                aria-pressed={language === 'en'}
            >
                English
            </button>
        </div>
    );
};

export default LanguageSwitcher;
