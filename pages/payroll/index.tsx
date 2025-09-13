
import React, { useState, useEffect, useCallback } from 'react';
import PageHeader from '../../components/PageHeader';
import PayrollStats from './components/PayrollStats';
import PayrollHistoryTable from './components/PayrollHistoryTable';
import CostBreakdownChart from './components/CostBreakdownChart';
import PayrollAiInsights from './components/PayrollAiInsights';
import RunPayrollModal from './components/RunPayrollModal';
import PayrollRunDetails from './components/PayrollRunDetails';
import PayslipModal from './components/PayslipModal';
import { PayrollRun, Payslip, PayrollStatus } from '../../types';
import { getPayrollRunsPaginated, getLatestPayrollRun, updatePayrollRunStatus, getCostBreakdownData } from '../../services/api';
import PendingChanges from './components/PendingChanges';
import { ErrorDisplay } from '../../components/ModulePlaceholder';
import ToastNotification from '../../components/ToastNotification';
import { useI18n } from '../../context/I18nContext';
import Pagination from '../../components/Pagination';
import LoadingSpinner from '../../components/LoadingSpinner';

const PayrollPage: React.FC = () => {
    const [payrollRuns, setPayrollRuns] = useState<PayrollRun[]>([]);
    const [latestRunForStats, setLatestRunForStats] = useState<PayrollRun | null>(null);
    const [costBreakdown, setCostBreakdown] = useState<any | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loadingStats, setLoadingStats] = useState(true);
    const [loadingTable, setLoadingTable] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isRunModalOpen, setRunModalOpen] = useState(false);
    const [selectedRun, setSelectedRun] = useState<PayrollRun | null>(null);
    const [selectedPayslip, setSelectedPayslip] = useState<Payslip | null>(null);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
    const { t } = useI18n();
    
    const fetchPaginatedRuns = useCallback(async (page: number) => {
        setLoadingTable(true);
        // Don't clear main error on pagination
        try {
            const { data, totalPages: newTotalPages } = await getPayrollRunsPaginated(page, 5);
            setPayrollRuns(data);
            setTotalPages(newTotalPages);
            setCurrentPage(page);
        } catch (error) {
            console.error("Failed to fetch paginated payroll runs", error);
            setError("فشل في تحميل سجلات الرواتب."); // This might override a more important initial error
        } finally {
            setLoadingTable(false);
        }
    }, []);
    
    const fetchInitialData = useCallback(async () => {
        setLoadingStats(true);
        setLoadingTable(true);
        setError(null);
        try {
            const [latestRunData, paginatedData, breakdownData] = await Promise.all([
                getLatestPayrollRun(),
                getPayrollRunsPaginated(1, 5),
                getCostBreakdownData()
            ]);
            setLatestRunForStats(latestRunData);
            setPayrollRuns(paginatedData.data);
            setTotalPages(paginatedData.totalPages);
            setCostBreakdown(breakdownData);
            setCurrentPage(1);
        } catch (err) {
            console.error("Failed to fetch initial payroll data", err);
            setError("فشل في تحميل بيانات الرواتب.");
        } finally {
            setLoadingStats(false);
            setLoadingTable(false);
        }
    }, []);

    useEffect(() => {
        fetchInitialData();
    }, [fetchInitialData]);

    const handlePageChange = (page: number) => {
        fetchPaginatedRuns(page);
    };

    const handleViewPayslip = (payslip: Payslip) => {
        setSelectedPayslip(payslip);
    };

    const handleCreatePayrollRun = () => {
        // In a real app, this would be a more robust API call.
        // Here, we simulate creating a new draft run for July.
        const newRun: PayrollRun = {
            id: 'PR005',
            period: 'يوليو 2024',
            payDate: '2024-07-28',
            status: PayrollStatus.DRAFT,
            totalCost: 9850000,
            netPay: 8650000,
            deductions: 1200000,
            employeesCount: 248,
        };
        fetchInitialData(); // Refetch all data to show the new run
        setSelectedRun(newRun);
    };

    const handleUpdateRunStatus = async (runId: string, status: PayrollStatus) => {
        try {
            await updatePayrollRunStatus(runId, status);
            fetchPaginatedRuns(currentPage); // Refetch current page
            
            if (selectedRun && selectedRun.id === runId) {
                setSelectedRun(prev => prev ? { ...prev, status } : null);
            }
            
            // Also refetch stats if the latest run was updated
            if (latestRunForStats && latestRunForStats.id === runId) {
                getLatestPayrollRun().then(setLatestRunForStats);
            }
            
            const message = status === PayrollStatus.PROCESSED ? t('payroll.toast.processed') : t('payroll.toast.paid');
            setToast({ message, type: 'success' });
        } catch (error) {
            console.error("Failed to update payroll run status", error);
            setToast({ message: "فشل تحديث حالة مسير الرواتب.", type: 'error' });
        }
    };


    if (loadingStats) {
        return <LoadingSpinner fullScreen />;
    }
    
    if (error && !latestRunForStats) {
        return <ErrorDisplay message={error} onRetry={fetchInitialData} />;
    }

    return (
        <div>
            {toast && <ToastNotification message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <PageHeader
                title={t('page.payroll.header.title')}
                subtitle={t('page.payroll.header.subtitle')}
                actions={<>
                    <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        <i className="fas fa-cogs"></i>
                        <span>{t('page.payroll.header.settings')}</span>
                    </button>
                    <button onClick={() => setRunModalOpen(true)} className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <i className="fas fa-play"></i>
                        <span>{t('page.payroll.header.runPayroll')}</span>
                    </button>
                </>}
            />
            <PayrollStats latestRun={latestRunForStats!} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
                    <PayrollHistoryTable payrollRuns={payrollRuns} onViewPayslips={setSelectedRun} />
                    <div className="mt-6">
                        {loadingTable ? (
                            <div className="flex justify-center items-center h-24">
                                <i className="fas fa-spinner fa-spin text-2xl text-blue-600"></i>
                            </div>
                        ) : error && payrollRuns.length === 0 ? (
                            <ErrorDisplay message={error} onRetry={() => fetchPaginatedRuns(currentPage)} />
                        ) : totalPages > 1 ? (
                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                        ) : null}
                    </div>
                </div>
                <div>
                    {selectedRun ? (
                        <PayrollRunDetails 
                            run={selectedRun} 
                            onBack={() => setSelectedRun(null)} 
                            onViewPayslip={handleViewPayslip}
                            onUpdateStatus={handleUpdateRunStatus}
                        />
                    ) : (
                        <div className="space-y-6">
                            <PendingChanges />
                            {costBreakdown && <CostBreakdownChart data={costBreakdown} />}
                            <PayrollAiInsights />
                        </div>
                    )}
                </div>
            </div>
            
            <RunPayrollModal 
                isOpen={isRunModalOpen}
                onClose={() => setRunModalOpen(false)}
                onCreateRun={handleCreatePayrollRun}
            />

            <PayslipModal 
                isOpen={!!selectedPayslip}
                onClose={() => setSelectedPayslip(null)}
                payslip={selectedPayslip}
            />
        </div>
    );
};

export default PayrollPage;
