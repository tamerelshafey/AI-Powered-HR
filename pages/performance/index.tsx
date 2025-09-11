

import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useUser } from '../../context/UserContext';
import { UserRole, PerformanceReview, CompanyGoal, Employee, PerformanceStatus, ReviewMetric } from '../../types';
import { allGoals as staticGoals, allReviews as staticReviews } from './data';
import { getAllEmployees, getPerformanceReviewsPaginated, addGoal, updateGoal, updatePerformanceReview, addPerformanceReview } from '../../services/api';
import PageHeader from './components/PageHeader';
import PerformanceStats from './components/PerformanceStats';
import GoalProgress from './components/GoalProgress';
import PerformanceReviewModal from './components/PerformanceReviewModal';
import GoalDetailsModal from './components/GoalDetailsModal';
import MonthlyCheckInStatus from './components/MonthlyCheckInStatus';
import AllReviews from './components/PendingReviews';
import PerformanceAiInsights from './components/PerformanceAiInsights';
import CompensationApprovalQueue from './components/CompensationApprovalQueue';
import { ErrorDisplay } from '../../components/ModulePlaceholder';
import AddGoalModal from './components/AddGoalModal';
import ToastNotification from '../../components/ToastNotification';

const PerformancePage: React.FC = () => {
    const { currentUser } = useUser();
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [reviews, setReviews] = useState<PerformanceReview[]>(staticReviews);
    const [allGoals, setAllGoals] = useState<CompanyGoal[]>(staticGoals);
    
    // Note: Pagination state is currently unused as we load all reviews initially for filtering ease.
    // Kept for future implementation of server-side pagination with filters.
    const [hasMoreReviews, setHasMoreReviews] = useState(true); 
    const [reviewsPage, setReviewsPage] = useState(1);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Modal states
    const [selectedReview, setSelectedReview] = useState<PerformanceReview | null>(null);
    const [isSchedulingReview, setIsSchedulingReview] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState<CompanyGoal | null>(null);
    const [isAddGoalModalOpen, setAddGoalModalOpen] = useState(false);
    
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
    const [filters, setFilters] = useState({ status: 'All', type: 'All' });

    const fetchInitialData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // In a real app with server-side filtering, getPerformanceReviewsPaginated would be called here.
            // For this mock setup, we use the static data and rely on client-side filtering.
            const allEmps = await getAllEmployees();
            setEmployees(allEmps);
        } catch (e) {
            console.error("Failed to fetch initial data", e);
            setError("فشل في تحميل البيانات الضرورية لهذه الصفحة.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchInitialData();
    }, [fetchInitialData]);

    const filteredReviews = useMemo(() => {
        return reviews.filter(review => {
            const statusMatch = filters.status === 'All' || review.status === filters.status;
            const typeMatch = filters.type === 'All' || review.reviewType === filters.type;
            return statusMatch && typeMatch;
        });
    }, [reviews, filters]);

    const { filteredGoals, teamEmployees } = useMemo(() => {
        if (currentUser.role === UserRole.DEPARTMENT_MANAGER) {
            const goals = allGoals.filter(g => g.department === currentUser.department || g.department === 'All');
            const team = employees.filter(e => e.department === currentUser.department && e.role !== UserRole.DEPARTMENT_MANAGER);
            return { filteredGoals: goals, teamEmployees: team };
        }
        return { filteredGoals: allGoals, teamEmployees: employees };
    }, [currentUser, employees, allGoals]);


    const handleViewReview = (review: PerformanceReview | null, employeeToReview?: Employee) => {
        if (review) {
             setSelectedReview(review);
        } else if (employeeToReview) {
            // Create a new temporary review object to open the modal
            const newReview: PerformanceReview = {
                id: `NEW_${Date.now()}`,
                employee: employeeToReview,
                reviewDate: new Date().toISOString().split('T')[0],
                overallScore: 0,
                status: PerformanceStatus.PENDING,
                reviewType: isSchedulingReview ? 'مراجعة سنوية' : 'تقييم شهري',
                metrics: [
                    { name: 'التواصل', managerComments: '' },
                    { name: 'تحقيق الأهداف', managerComments: '' },
                    { name: 'العمل الجماعي', managerComments: '' },
                ],
                employeeComments: '',
            };
            setSelectedReview(newReview);
            setIsSchedulingReview(false); // Reset scheduling state
        }
    };
    
    const handleUpdateReview = async (updatedReview: PerformanceReview) => {
        try {
            const isNew = updatedReview.id.startsWith('NEW_');
            const savedReview = isNew
                ? await addPerformanceReview(updatedReview)
                : await updatePerformanceReview(updatedReview.id, updatedReview);
            
            if (isNew) {
                setReviews(prev => [savedReview, ...prev]);
            } else {
                setReviews(prev => prev.map(r => r.id === savedReview.id ? savedReview : r));
            }
            setToast({ message: 'تم حفظ المراجعة بنجاح!', type: 'success' });
            setSelectedReview(null);
        } catch (e) {
            console.error(e);
            setToast({ message: 'فشل حفظ المراجعة.', type: 'error' });
        }
    };

    const handleUpdateGoal = async (updatedGoal: CompanyGoal) => {
        try {
            const savedGoal = await updateGoal(updatedGoal.id, updatedGoal);
            setAllGoals(prev => prev.map(g => g.id === savedGoal.id ? savedGoal : g));
            setSelectedGoal(savedGoal); // Keep modal open with updated data
            setToast({ message: 'تم تحديث تقدم الهدف بنجاح!', type: 'success' });
        } catch(e) {
            console.error(e);
            setToast({ message: 'فشل تحديث الهدف.', type: 'error' });
        }
    };

    const handleAddGoal = async (newGoalData: Omit<CompanyGoal, 'id' | 'progress'>) => {
        try {
            const newGoal = await addGoal(newGoalData);
            setAllGoals(prev => [newGoal, ...prev]);
            setToast({ message: 'تمت إضافة الهدف بنجاح!', type: 'success' });
            setAddGoalModalOpen(false);
        } catch(e) {
             console.error(e);
            setToast({ message: 'فشل إضافة الهدف.', type: 'error' });
        }
    }


    if (loading && reviewsPage === 1) {
        return <div className="flex justify-center items-center h-96"><i className="fas fa-spinner fa-spin text-4xl text-blue-600"></i></div>
    }
    
    if (error && reviews.length === 0) {
        return <ErrorDisplay message={error} onRetry={fetchInitialData} />;
    }

    return (
        <div>
            {toast && <ToastNotification message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <PageHeader onAddGoalClick={() => setAddGoalModalOpen(true)} onScheduleReviewClick={() => handleViewReview(null, employees[0])} />
            <PerformanceStats reviews={reviews} goals={filteredGoals} />
            <CompensationApprovalQueue />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <MonthlyCheckInStatus employees={teamEmployees} reviews={reviews} onStartReview={(employee) => handleViewReview(null, employee)} />
                <GoalProgress goals={filteredGoals} onViewGoal={setSelectedGoal} />
            </div>

            <div className="mb-8">
                <AllReviews 
                    reviews={filteredReviews} 
                    onViewReview={handleViewReview}
                    filters={filters}
                    onFilterChange={setFilters}
                    hasMore={false} // Pagination disabled for now
                    loadMoreItems={() => {}}
                />
            </div>

            <PerformanceAiInsights />

            {selectedReview && (
                <PerformanceReviewModal
                    isOpen={!!selectedReview}
                    onClose={() => setSelectedReview(null)}
                    review={selectedReview}
                    onSave={handleUpdateReview}
                />
            )}

            {selectedGoal && (
                <GoalDetailsModal
                    isOpen={!!selectedGoal}
                    onClose={() => setSelectedGoal(null)}
                    goal={selectedGoal}
                    onUpdate={handleUpdateGoal}
                />
            )}

            {isAddGoalModalOpen && (
                <AddGoalModal 
                    isOpen={isAddGoalModalOpen}
                    onClose={() => setAddGoalModalOpen(false)}
                    onAddGoal={handleAddGoal}
                    employees={employees}
                />
            )}
        </div>
    );
};

export default PerformancePage;