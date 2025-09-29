import React from 'react';
import StatsCard from '../../../components/dashboard/StatsCard';
import { useI18n } from '../../../context/I18nContext';
import { formatCurrency } from '../../../utils/formatters';

interface WorkforceStatsProps {
    currentHeadcount: number;
    projectedHeadcount: number;
    currentAnnualCost: number;
    projectedAnnualCost: number;
}

const WorkforceStats: React.FC<WorkforceStatsProps> = ({
    currentHeadcount,
    projectedHeadcount,
    currentAnnualCost,
    projectedAnnualCost,
}) => {
    const { t, language } = useI18n();
    const currencyOptions = { notation: 'compact', compactDisplay: 'short' } as const;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
                icon="fas fa-users"
                labelKey="page.workforce_planning.stats.currentHeadcount"
                value={String(currentHeadcount)}
                iconBgColor="bg-blue-100"
                iconColor="text-blue-600"
            />
            <StatsCard
                icon="fas fa-user-friends"
                labelKey="page.workforce_planning.stats.projectedHeadcount"
                value={String(projectedHeadcount)}
                iconBgColor="bg-indigo-100"
                iconColor="text-indigo-600"
            />
            <StatsCard
                icon="fas fa-wallet"
                labelKey="page.workforce_planning.stats.currentCost"
                value={formatCurrency(currentAnnualCost, language, currencyOptions)}
                iconBgColor="bg-green-100"
                iconColor="text-green-600"
            />
            <StatsCard
                icon="fas fa-money-bill-trend-up"
                labelKey="page.workforce_planning.stats.projectedCost"
                value={formatCurrency(projectedAnnualCost, language, currencyOptions)}
                iconBgColor="bg-emerald-100"
                iconColor="text-emerald-600"
            />
        </div>
    );
};

export default WorkforceStats;
