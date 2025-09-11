import React from 'react';
import { Kudo } from '../../../types';
import { useI18n } from '../../../context/I18nContext';
import KudosCard from './KudosCard';

interface KudosFeedProps {
    kudos: Kudo[];
}

const KudosFeed: React.FC<KudosFeedProps> = ({ kudos }) => {
    const { t } = useI18n();
    return (
        <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{t('page.recognition.kudosFeed.title')}</h3>
            <div className="space-y-6">
                {kudos.map(kudo => (
                    <KudosCard key={kudo.id} kudo={kudo} />
                ))}
            </div>
        </div>
    );
};

export default KudosFeed;
