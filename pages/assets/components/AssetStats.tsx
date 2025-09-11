import React from 'react';
import StatsCard from '../../../components/dashboard/StatsCard';
import { AssetStatus } from '../../../types';

interface AssetStatsProps {
    stats: {
        total: number;
        assigned: number;
        available: number;
        inRepair: number;
    } | null;
}

const AssetStats: React.FC<AssetStatsProps> = ({ stats }) => {
    if (!stats) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard icon="fas fa-box-open" labelKey="assetStats.totalAssets" value={String(stats.total)} iconBgColor="bg-blue-100" iconColor="text-blue-600" />
            <StatsCard icon="fas fa-user-check" labelKey="assetStats.assigned" value={String(stats.assigned)} iconBgColor="bg-green-100" iconColor="text-green-600" />
            <StatsCard icon="fas fa-check-circle" labelKey="assetStats.available" value={String(stats.available)} iconBgColor="bg-purple-100" iconColor="text-purple-600" />
            <StatsCard icon="fas fa-tools" labelKey="assetStats.inRepair" value={String(stats.inRepair)} iconBgColor="bg-orange-100" iconColor="text-orange-600" />
        </div>
    );
};

export default AssetStats;
