
import React, { useState, useEffect, useCallback } from 'react';
import PageHeader from './components/PageHeader';
import PayrollStats from './components/PayrollStats';
import PayrollHistoryTable from './components/PayrollHistoryTable';
import CostBreakdownChart from './components/CostBreakdownChart';
import PayrollAiInsights from './components/PayrollAiInsights';
import RunPayrollModal from './components/RunPayrollModal';
import PayrollRunDetails from './components/PayrollRunDetails';
import PayslipModal from './components/PayslipModal';
import { PayrollRun, Payslip, PayrollStatus } from '../../types';
import { getPayrollRuns, updatePayrollRunStatus } from '../../services/api';
import { costBreakdownData } from './data';
import PendingChanges from './components/PendingChanges';
import { ErrorDisplay } from '../../components/ModulePlaceholder';
import ToastNotification from '../../components/ToastNotification';
import { useI18n } from '../../context/I18nContext';

const PayrollPage: React.FC = () => {
    const [payrollRuns, setPayrollRuns] = useState<PayrollRun[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isRunModalOpen, setRunModalOpen] = useState(false);
    const [selectedRun, setSelectedRun] = useState<PayrollRun | null>(null);
    const [selectedPayslip, setSelectedPayslip] = useState<Payslip | null>(null);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
    const { t } = useI18n();
    
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getPayrollRuns();
            setPayrollRuns(data);
        } catch (error) {
            console.error("Failed to fetch payroll runs", error);
            setError("فشل في تحميل سجلات الرواتب.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

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
        setPayrollRuns(prev => [newRun, ...prev]);
        setSelectedRun(newRun);
    };

    const handleUpdateRunStatus = async (runId: string, status: PayrollStatus) => {
        try {
            await updatePayrollRunStatus(runId, status);
            setPayrollRuns(prevRuns => prevRuns.map(r => r.id === runId ? { ...r, status } : r));
            
            if (selectedRun && selectedRun.id === runId) {
                setSelectedRun(prev => prev ? { ...prev, status } : null);
            }
            
            const message = status === PayrollStatus.PROCESSED ? t('payroll.toast.processed') : t('payroll.toast.paid');
            setToast({ message, type: 'success' });
        } catch (error) {
            console.error("Failed to update payroll run status", error);
            setToast({ message: "فشل تحديث حالة مسير الرواتب.", type: 'error' });
        }
    };


    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <i className="fas fa-spinner fa-spin text-4xl text-blue-600"></i>
            </div>
        );
    }
    
    if (error) {
        return <ErrorDisplay message={error} onRetry={fetchData} />;
    }

    const latestRun = payrollRuns.find(run => run.status !== PayrollStatus.DRAFT) || payrollRuns[0];

    return (
        <div>
            {toast && <ToastNotification message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <PageHeader onRunPayrollClick={() => setRunModalOpen(true)} />
            <PayrollStats latestRun={latestRun} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
                    <PayrollHistoryTable payrollRuns={payrollRuns} onViewPayslips={setSelectedRun} />
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
                            <CostBreakdownChart data={costBreakdownData} />
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