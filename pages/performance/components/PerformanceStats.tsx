
import React from 'react';
import StatsCard from '../../../components/dashboard/StatsCard';
import { PerformanceReview, CompanyGoal, PerformanceStatus } from '../../../types';
import { useI18n } from '../../../context/I18nContext';

interface PerformanceStatsProps {
    reviews: PerformanceReview[];
    goals: CompanyGoal[];
}

const PerformanceStats: React.FC<PerformanceStatsProps> = ({ reviews, goals }) => {
    const { t } = useI18n();
    const completedReviews = reviews.filter(r => r.status === PerformanceStatus.COMPLETED);
    const averageScore = completedReviews.length > 0
        ? (completedReviews.reduce((sum, r) => sum + r.overallScore, 0) / completedReviews.length).toFixed(1)
        : 'N/A';
    
    const goalsProgressSum = goals.reduce((sum, g) => sum + g.progress, 0);
    const averageGoalCompletion = goals.length > 0 ? (goalsProgressSum / goals.length).toFixed(0) : '0';

    const pendingReviewsCount = reviews.filter(r => r.status === PerformanceStatus.PENDING).length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard icon="fas fa-star-half-alt" labelKey="performanceStats.avgScore" value={`${averageScore}/5`} change={t('performanceStats.basedOnCompleted')} changeColor="text-gray-500" iconBgColor="bg-yellow-100" iconColor="text-yellow-600" />
            <StatsCard icon="fas fa-check-double" labelKey="performanceStats.goalCompletion" value={`${averageGoalCompletion}%`} change={t('performanceStats.avgAllGoals')} changeColor="text-gray-500" iconBgColor="bg-green-100" iconColor="text-green-600" />
            <StatsCard icon="fas fa-clock" labelKey="performanceStats.pendingReviews" value={String(pendingReviewsCount)} change={t('performanceStats.requiresAttention')} changeColor="text-orange-600" iconBgColor="bg-orange-100" iconColor="text-orange-600" />
            <StatsCard icon="fas fa-trophy" labelKey="performanceStats.topPerformers" value="12" change={t('performanceStats.topPercentage', { value: 10 })} changeColor="text-purple-600" iconBgColor="bg-purple-100" iconColor="text-purple-600" />
        </div>
    );
};

export default PerformanceStats;
