
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useUser } from '../../context/UserContext';
import { UserRole, PerformanceReview, CompanyGoal, Employee, PerformanceStatus, ReviewMetric } from '../../types';
import { getAllEmployees, getPerformanceReviewsPaginated, addGoal, updateGoal, updatePerformanceReview, addPerformanceReview, getAllGoals } from '../../services/api';
import PageHeader from '../../components/PageHeader';
import PerformanceStats from './components/PerformanceStats';
import GoalProgress from './components/GoalProgress';
import PerformanceReviewModal from './components/PerformanceReviewModal';
import GoalDetailsModal from './components/GoalDetailsModal';
import MonthlyCheckInStatus from './components/MonthlyCheckInStatus';
import AllReviews from './components/AllReviews';
import PerformanceAiInsights from './components/PerformanceAiInsights';
import CompensationApprovalQueue from './components/CompensationApprovalQueue';
import { ErrorDisplay } from '../../components/ModulePlaceholder';
import AddGoalModal from './components/AddGoalModal';
import ToastNotification from '../../components/ToastNotification';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useI18n } from '../../context/I18nContext';

const PerformancePage: React.FC = () => {
    const { currentUser } = useUser();
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [reviews, setReviews] = useState<PerformanceReview[]>([]);
    const [allGoals, setAllGoals] = useState<CompanyGoal[]>([]);
    
    const [hasMoreReviews, setHasMoreReviews] = useState(true); 
    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(true);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Modal states
    const [selectedReview, setSelectedReview] = useState<PerformanceReview | null>(null);
    const [isSchedulingReview, setIsSchedulingReview] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState<CompanyGoal | null>(null);
    const [isAddGoalModalOpen, setAddGoalModalOpen] = useState(false);
    
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
    const [filters, setFilters] = useState({ status: 'All', type: 'All' });
    const { t } = useI18n();

    const fetchInitialData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [allEmps, goalsData] = await Promise.all([
                getAllEmployees(),
                getAllGoals(),
            ]);
            setEmployees(allEmps);
            setAllGoals(goalsData);
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
    
    useEffect(() => {
        // When filters change, reset the list and page number to trigger a fresh load
        setReviews([]);
        setPage(1);
        setHasMoreReviews(true);
    }, [filters]);

    const loadMoreReviews = useCallback((): Promise<void> => {
        return new Promise(async (resolve) => {
            if (reviewsLoading || !hasMoreReviews) {
                resolve();
                return;
            }
            setReviewsLoading(true);

            try {
                const currentPage = page;
                const { data, hasMore } = await getPerformanceReviewsPaginated(currentPage, 15, filters);
                
                setReviews(prev => (currentPage === 1 ? data : [...prev, ...data]));
                setHasMoreReviews(hasMore);
                setPage(prev => prev + 1);

            } catch (e) {
                console.error("Failed to load reviews", e);
                setError("Failed to load reviews.");
            } finally {
                setReviewsLoading(false);
                resolve();
            }
        });
    }, [reviewsLoading, hasMoreReviews, page, filters]);


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


    if (loading) {
        return <LoadingSpinner />;
    }
    
    if (error) {
        return <ErrorDisplay message={error} onRetry={fetchInitialData} />;
    }

    return (
        <div>
            {toast && <ToastNotification message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <PageHeader
                title={t('page.performance.header.title')}
                subtitle={t('page.performance.header.subtitle')}
                actions={<>
                    <button onClick={() => setAddGoalModalOpen(true)} className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        <i className="fas fa-bullseye"></i>
                        <span>{t('page.performance.header.addGoal')}</span>
                    </button>
                    <button onClick={() => handleViewReview(null, employees[0])} className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <i className="fas fa-calendar-plus"></i>
                        <span>{t('page.performance.header.scheduleReview')}</span>
                    </button>
                </>}
            />
            <PerformanceStats reviews={reviews} goals={filteredGoals} />
            <CompensationApprovalQueue />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <MonthlyCheckInStatus employees={teamEmployees} reviews={reviews} onStartReview={(employee) => handleViewReview(null, employee)} />
                <GoalProgress goals={filteredGoals} onViewGoal={setSelectedGoal} />
            </div>

            <div className="mb-8">
                <AllReviews 
                    reviews={reviews} 
                    onViewReview={handleViewReview}
                    filters={filters}
                    onFilterChange={setFilters}
                    hasMore={hasMoreReviews}
                    loadMoreItems={loadMoreReviews}
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
