import React from 'react';
import StatsCard from '../../../components/dashboard/StatsCard';
import { useI18n } from '../../../context/I18nContext';

interface LeaveStatsProps {
    pendingCount: number;
}

const LeaveStats: React.FC<LeaveStatsProps> = ({ pendingCount }) => {
    const { t } = useI18n();
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard icon="fas fa-hourglass-half" labelKey="leaveStats.pendingRequests" value={String(pendingCount)} change={t('leaveStats.pendingApproval')} changeColor="text-orange-600" iconBgColor="bg-orange-100" iconColor="text-orange-600" />
            <StatsCard icon="fas fa-check-circle" labelKey="leaveStats.approvedToday" value="12" change={t('leaveStats.autoManual')} changeColor="text-green-600" iconBgColor="bg-green-100" iconColor="text-green-600" />
            <StatsCard icon="fas fa-user-clock" labelKey="leaveStats.onLeaveToday" value="47" change={t('leaveStats.workforcePercentage', { value: 19 })} changeColor="text-blue-600" iconBgColor="bg-blue-100" iconColor="text-blue-600" />
            <StatsCard icon="fas fa-stopwatch" labelKey="leaveStats.avgResponseTime" value={t('ticketStats.hoursUnit', { count: 2.3 })} change={t('leaveStats.fasterPercentage', { value: 15 })} changeColor="text-purple-600" iconBgColor="bg-purple-100" iconColor="text-purple-600" />
        </div>
    );
};

export default LeaveStats;