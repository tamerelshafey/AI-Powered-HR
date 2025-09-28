
import React, { useState, useEffect } from 'react';
import { MissionSettings as MissionSettingsType } from '../../../types';
import { getMissionSettings, updateMissionSettings } from '../../../services/api';
import { useI18n } from '../../../context/I18nContext';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ToastNotification from '../../../components/ToastNotification';

const MissionSettings: React.FC = () => {
    const [settings, setSettings] = useState<MissionSettingsType | null>(null);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState<{ message: string, type: 'success' } | null>(null);
    const { t } = useI18n();

    useEffect(() => {
        const fetchSettings = async () => {
            setLoading(true);
            try {
                const data = await getMissionSettings();
                setSettings(data);
            } catch (error) {
                console.error("Failed to fetch mission settings", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleToggleChange = (key: keyof MissionSettingsType) => {
        setSettings(prev => {
            if (!prev) return null;
            return { ...prev, [key]: !prev[key] };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!settings) return;
        try {
            await updateMissionSettings(settings);
            setToast({ message: 'تم حفظ الإعدادات بنجاح!', type: 'success' });
        } catch (error) {
            console.error("Failed to save mission settings", error);
        }
    };

    if (loading || !settings) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[60vh] flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <>
            {toast && <ToastNotification message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">{t('page.settings.missions.title')}</h3>
                    <p className="text-sm text-gray-600 mt-1">{t('page.settings.missions.subtitle')}</p>
                </div>
                
                <div className="p-6">
                    <div className="flex items-center justify-between py-4">
                        <div>
                            <p className="font-medium text-gray-800">{t('page.settings.missions.timeMandatory.label')}</p>
                            <p className="text-sm text-gray-500">{t('page.settings.missions.timeMandatory.description')}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={settings.isTimeMandatoryForSingleDay}
                                onChange={() => handleToggleChange('isTimeMandatoryForSingleDay')}
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>

                <div className="p-6 bg-gray-50 rounded-b-xl border-t border-gray-200">
                    <div className="flex justify-end">
                        <button type="submit" className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                            {t('common.save')}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default MissionSettings;
