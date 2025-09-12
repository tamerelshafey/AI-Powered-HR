

import React, { useState, useEffect, useMemo } from 'react';
import { Employee, PerformanceReview, CompanyGoal, PerformanceStatus } from '../../../../types';
import { getPerformanceReviewsByEmployeeId, getGoalsByEmployeeId } from '../../../../services/api';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import PerformanceScorecard from './PerformanceScorecard';
import EmployeePerformanceTrendChart from './EmployeePerformanceTrendChart';
import { useI18n } from '../../../../context/I18nContext';
import { formatDate } from '../../../../utils/formatters';

interface PerformanceTabProps {
    employee: Employee;
}

const statusClasses = {
    [PerformanceStatus.PENDING]: 'bg-orange-100 text-orange-800',
    [PerformanceStatus.IN_PROGRESS]: 'bg-blue-100 text-blue-800',
    [PerformanceStatus.COMPLETED]: 'bg-green-100 text-green-800',
};

const PerformanceTab: React.FC<PerformanceTabProps> = ({ employee }) => {
    const [reviews, setReviews] = useState<PerformanceReview[]>([]);
    const [goals, setGoals] = useState<CompanyGoal[]>([]);
    const [loading, setLoading] = useState(true);
    const { language } = useI18n();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [reviewsData, goalsData] = await Promise.all([
                    getPerformanceReviewsByEmployeeId(employee.id),
                    getGoalsByEmployeeId(employee.id),
                ]);
                setReviews(reviewsData);
                setGoals(goalsData);
            } catch (error) {
                console.error("Failed to fetch performance data for employee", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [employee.id]);

    const stats = useMemo(() => {
        const completed = reviews.filter(r => r.status === PerformanceStatus.COMPLETED);
        const pending = reviews.filter(r => r.status === PerformanceStatus.PENDING);
        const avgScore = completed.length > 0
            ? (completed.reduce((sum, r) => sum + r.overallScore, 0) / completed.length).toFixed(1)
            : 'N/A';
        const goalCompletion = goals.length > 0
            ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length)
            : 0;
        
        const nextReview = pending.sort((a, b) => new Date(a.reviewDate).getTime() - new Date(b.reviewDate).getTime())[0];

        return {
            averageScore: avgScore,
            goalCompletion: goalCompletion,
            completedReviews: completed.length,
            nextReviewDate: nextReview ? formatDate(nextReview.reviewDate, language) : 'لا يوجد',
        };
    }, [reviews, goals, language]);

    if (loading) {
        return <div className="h-64"><LoadingSpinner /></div>;
    }

    return (
        <div>
            <PerformanceScorecard {...stats} />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3">
                    <EmployeePerformanceTrendChart reviews={reviews} />
                </div>
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg border p-6 h-full">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">الأهداف الشخصية</h3>
                        <div className="space-y-4">
                            {goals.length > 0 ? goals.map(goal => (
                                <div key={goal.id}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-medium text-gray-700">{goal.title}</span>
                                        <span className="text-sm font-bold text-blue-600">{goal.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${goal.progress}%` }}></div>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-8 text-gray-500">
                                    <i className="fas fa-bullseye-pointer text-3xl mb-2"></i>
                                    <p>لا توجد أهداف مسندة لهذا الموظف.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">سجل المراجعات</h3>
                {reviews.length > 0 ? (
                    <div>
                        {/* Mobile View */}
                        <div className="md:hidden space-y-3">
                            {reviews.map(review => (
                                <div key={review.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                                    <div className="flex justify-between items-start">
                                        <p className="font-semibold text-gray-800">{review.reviewType}</p>
                                        <span className={`px-2 py-1 text-xs rounded-full ${statusClasses[review.status]}`}>{review.status}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm border-t pt-2">
                                        <p className="text-gray-600">التاريخ: <span className="font-medium text-gray-800">{formatDate(review.reviewDate, language)}</span></p>
                                        <p className="text-gray-600">النتيجة: <span className="font-medium text-gray-800">{review.status === PerformanceStatus.COMPLETED ? `${review.overallScore}/5` : 'N/A'}</span></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Desktop View */}
                        <div className="overflow-x-auto hidden md:block border rounded-lg">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-start text-xs font-medium text-gray-500 uppercase">نوع المراجعة</th>
                                        <th className="px-4 py-2 text-start text-xs font-medium text-gray-500 uppercase">التاريخ</th>
                                        <th className="px-4 py-2 text-start text-xs font-medium text-gray-500 uppercase">النتيجة</th>
                                        <th className="px-4 py-2 text-start text-xs font-medium text-gray-500 uppercase">الحالة</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y">
                                    {reviews.map(review => (
                                        <tr key={review.id}>
                                            <td className="px-4 py-3 font-medium">{review.reviewType}</td>
                                            <td className="px-4 py-3">{formatDate(review.reviewDate, language)}</td>
                                            <td className="px-4 py-3">{review.status === PerformanceStatus.COMPLETED ? `${review.overallScore}/5` : 'N/A'}</td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-1 text-xs rounded-full ${statusClasses[review.status]}`}>{review.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                        <i className="fas fa-history text-3xl mb-2"></i>
                        <p>لا يوجد سجل مراجعات لهذا الموظف.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PerformanceTab;