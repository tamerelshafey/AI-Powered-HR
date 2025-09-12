import React, { useState, useEffect } from 'react';
import { useUser } from '../../../context/UserContext';
import { getDevelopmentPlanByEmployeeId, getEmployeeIdForUser } from '../../../services/api';
import { IndividualDevelopmentPlan, DevelopmentGoal, DevelopmentGoalStatus } from '../../../types';
import LoadingSpinner from '../../../components/LoadingSpinner';

const DevelopmentPlanSection: React.FC = () => {
    const { currentUser } = useUser();
    const [plan, setPlan] = useState<IndividualDevelopmentPlan | null>(null);
    const [loading, setLoading] = useState(true);
    const employeeId = getEmployeeIdForUser(currentUser);

    useEffect(() => {
        const fetchPlan = async () => {
            setLoading(true);
            try {
                const data = await getDevelopmentPlanByEmployeeId(employeeId);
                setPlan(data);
            } catch (error) {
                console.error("Failed to fetch development plan", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPlan();
    }, [employeeId]);

    if (loading) {
        return <div className="min-h-[60vh] flex items-center justify-center"><LoadingSpinner /></div>;
    }

    if (!plan) {
        return (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border">
                <i className="fas fa-map-signs text-6xl text-gray-300 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">لا توجد خطة تطوير نشطة</h3>
                <p className="text-gray-600">سيتم إنشاء خطتك التطويرية بعد مراجعة الأداء القادمة.</p>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">خطتي التطويرية</h2>
                <p className="text-gray-600">مسارك المخصص للنمو والتطور المهني.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 text-green-600"><i className="fas fa-star me-2"></i>نقاط القوة</h3>
                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                        {plan.strengths.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 text-orange-600"><i className="fas fa-lightbulb me-2"></i>مجالات التحسين</h3>
                     <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                        {plan.areasForImprovement.map((a, i) => <li key={i}>{a}</li>)}
                    </ul>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">أهداف التطوير</h3>
                </div>
                <div className="p-6 space-y-4">
                    {plan.goals.map(goal => (
                        <div key={goal.id} className="p-4 border rounded-lg bg-gray-50">
                            <div className="flex items-start">
                                <input type="checkbox" className="w-5 h-5 text-blue-600 rounded mt-1 me-4 focus:ring-blue-500" />
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800">{goal.description}</p>
                                    <p className="text-sm text-gray-500 mt-1">المستهدف: {goal.targetDate}</p>
                                    {goal.resources && (
                                        <div className="mt-2">
                                            {goal.resources.map((res, i) => (
                                                <a key={i} href={res.link || '#'} className="inline-flex items-center space-x-2 space-x-reverse me-3 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full hover:bg-blue-200">
                                                    <i className="fas fa-link"></i>
                                                    <span>{res.title}</span>
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DevelopmentPlanSection;