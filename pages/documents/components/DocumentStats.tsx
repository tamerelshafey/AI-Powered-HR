import React from 'react';
import StatsCard from '../../../components/dashboard/StatsCard';

interface DocumentStatsProps {
    stats: {
        total: number;
        expiringSoon: number;
        expired: number;
        missing: number;
    } | null;
}

const DocumentStats: React.FC<DocumentStatsProps> = ({ stats }) => {
    if (!stats) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard icon="fas fa-file-alt" labelKey="documentStats.totalDocuments" value={String(stats.total)} iconBgColor="bg-blue-100" iconColor="text-blue-600" />
            <StatsCard icon="fas fa-exclamation-circle" labelKey="documentStats.expiringSoon" value={String(stats.expiringSoon)} iconBgColor="bg-yellow-100" iconColor="text-yellow-600" />
            <StatsCard icon="fas fa-times-circle" labelKey="documentStats.expired" value={String(stats.expired)} iconBgColor="bg-red-100" iconColor="text-red-600" />
            <StatsCard icon="fas fa-folder-minus" labelKey="documentStats.missing" value={String(stats.missing)} iconBgColor="bg-orange-100" iconColor="text-orange-600" />
        </div>
    );
};

export default DocumentStats;
