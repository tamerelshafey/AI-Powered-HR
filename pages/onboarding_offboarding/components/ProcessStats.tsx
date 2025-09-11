
import React from 'react';
import StatsCard from '../../../components/dashboard/StatsCard';
import { OnboardingProcess, ProcessStatus, ProcessType } from '../../../types';

interface ProcessStatsProps {
    processes: OnboardingProcess[];
}

const ProcessStats: React.FC<ProcessStatsProps> = ({ processes }) => {
    const activeOnboarding = processes.filter(p => p.type === ProcessType.ONBOARDING && p.status === ProcessStatus.IN_PROGRESS).length;
    const pendingOffboarding = processes.filter(p => p.type === ProcessType.OFFBOARDING && p.status === ProcessStatus.IN_PROGRESS).length;
    const completedThisMonth = processes.filter(p => p.status === ProcessStatus.COMPLETED).length; // Simplified for demo
    const tasksOverdue = processes.filter(p => p.status === ProcessStatus.OVERDUE).length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard icon="fas fa-user-plus" labelKey="processStats.activeOnboarding" value={String(activeOnboarding)} iconBgColor="bg-blue-100" iconColor="text-blue-600" />
            <StatsCard icon="fas fa-user-minus" labelKey="processStats.pendingOffboarding" value={String(pendingOffboarding)} iconBgColor="bg-orange-100" iconColor="text-orange-600" />
            <StatsCard icon="fas fa-check-circle" labelKey="processStats.completedThisMonth" value={String(completedThisMonth)} iconBgColor="bg-green-100" iconColor="text-green-600" />
            <StatsCard icon="fas fa-exclamation-triangle" labelKey="processStats.overdueTasks" value={String(tasksOverdue)} iconBgColor="bg-red-100" iconColor="text-red-600" />
        </div>
    );
};

export default ProcessStats;
