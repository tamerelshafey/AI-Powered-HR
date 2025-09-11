import React from 'react';

interface StatCardProps {
    label: string;
    value: string | number;
    icon: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon }) => (
    <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-center">
        <i className={`${icon} text-2xl text-blue-600 mb-2`}></i>
        <p className="text-xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-600">{label}</p>
    </div>
);

interface PerformanceScorecardProps {
    averageScore: string;
    goalCompletion: number;
    completedReviews: number;
    nextReviewDate: string;
}

const PerformanceScorecard: React.FC<PerformanceScorecardProps> = ({ averageScore, goalCompletion, completedReviews, nextReviewDate }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard label="متوسط درجة الأداء" value={`${averageScore}/5`} icon="fas fa-star-half-alt" />
            <StatCard label="إكمال الأهداف" value={`${goalCompletion}%`} icon="fas fa-check-double" />
            <StatCard label="المراجعات المكتملة" value={completedReviews} icon="fas fa-history" />
            <StatCard label="المراجعة القادمة" value={nextReviewDate} icon="fas fa-calendar-alt" />
        </div>
    );
};

export default PerformanceScorecard;