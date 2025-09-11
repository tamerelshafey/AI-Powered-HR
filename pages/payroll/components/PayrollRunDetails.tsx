
import React, { useState, useEffect } from 'react';
import { PayrollRun, Payslip, PayrollStatus } from '../../../types';
import { getEmployeePayslips } from '../../../services/api';
import ConfirmationModal from '../../../components/ConfirmationModal';
import { useI18n } from '../../../context/I18nContext';

interface PayrollRunDetailsProps {
    run: PayrollRun;
    onBack: () => void;
    onViewPayslip: (payslip: Payslip) => void;
    onUpdateStatus: (runId: string, status: PayrollStatus) => void;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-EG', {
        style: 'currency',
        currency: 'EGP',
        minimumFractionDigits: 2,
    }).format(amount);
};

const PayrollRunDetails: React.FC<PayrollRunDetailsProps> = ({ run, onBack, onViewPayslip, onUpdateStatus }) => {
    const [payslips, setPayslips] = useState<Payslip[]>([]);
    const [loading, setLoading] = useState(true);
    const { t } = useI18n();
    const [confirmation, setConfirmation] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        onConfirm: () => void;
    } | null>(null);


    useEffect(() => {
        const fetchPayslips = async () => {
            setLoading(true);
            try {
                const data = await getEmployeePayslips(run.id);
                setPayslips(data);
            } catch (error) {
                console.error(`Failed to fetch payslips for run ${run.id}`, error);
            } finally {
                setLoading(false);
            }
        };
        fetchPayslips();
    }, [run.id]);

    const handleProcessRun = () => {
        setConfirmation({
            isOpen: true,
            title: t('payroll.confirmProcessTitle'),
            message: t('payroll.confirmProcessMessage', { period: run.period }),
            onConfirm: () => onUpdateStatus(run.id, PayrollStatus.PROCESSED),
        });
    };

    const handleMarkAsPaid = () => {
        setConfirmation({
            isOpen: true,
            title: t('payroll.confirmPaidTitle'),
            message: t('payroll.confirmPaidMessage', { period: run.period }),
            onConfirm: () => onUpdateStatus(run.id, PayrollStatus.PAID),
        });
    };
    
    const renderActionButtons = () => {
        switch (run.status) {
            case PayrollStatus.DRAFT:
                return (
                    <button onClick={handleProcessRun} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                        {t('payroll.processRun')}
                    </button>
                );
            case PayrollStatus.PROCESSED:
                return (
                    <button onClick={handleMarkAsPaid} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                        {t('payroll.markAsPaid')}
                    </button>
                );
            case PayrollStatus.PAID:
                return (
                    <div className="flex items-center space-x-2 space-x-reverse text-sm text-green-700 bg-green-100 px-3 py-1 rounded-full">
                        <i className="fas fa-check-circle"></i>
                        <span>مدفوع</span>
                    </div>
                );
            default:
                return null;
        }
    };


    return (
        <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">تفاصيل مسير رواتب {run.period}</h3>
                        <button onClick={onBack} className="text-sm text-blue-600 hover:text-blue-700">
                            <i className="fas fa-arrow-right me-1"></i> العودة
                        </button>
                    </div>
                    <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-600">
                        <span>{run.employeesCount} موظف</span>
                        <span>•</span>
                        <span>الإجمالي: {formatCurrency(run.totalCost)}</span>
                    </div>
                </div>
                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <i className="fas fa-spinner fa-spin text-2xl text-blue-600"></i>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                        {payslips.map(payslip => {
                            const hasSpecialDeduction = payslip.deductions.some(d => d.name.includes('إجازة غير مدفوعة'));
                            return (
                                <div key={payslip.employee.id} className="p-4 hover:bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className={`w-8 h-8 ${payslip.employee.avatarColor} rounded-full flex items-center justify-center me-3 flex-shrink-0`}>
                                                <span className="text-white text-xs font-medium">{payslip.employee.avatarInitials}</span>
                                            </div>
                                            <div>
                                                <div className="flex items-center">
                                                    <p className="font-medium text-gray-900">{`${payslip.employee.firstName} ${payslip.employee.lastName}`}</p>
                                                    {hasSpecialDeduction && (
                                                        <div className="relative group ms-2">
                                                            <i className="fas fa-exclamation-triangle text-yellow-500 cursor-pointer"></i>
                                                            <div className="absolute bottom-full mb-2 start-1/2 -translate-x-1/2 w-48 p-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                                يحتوي على خصومات تلقائية من الإجازات.
                                                                <svg className="absolute text-gray-800 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-500">{payslip.employee.jobTitle}</p>
                                            </div>
                                        </div>
                                        <div className="text-end">
                                            <p className="font-semibold text-green-600">{formatCurrency(payslip.netPay)}</p>
                                            <button onClick={() => onViewPayslip(payslip)} className="text-xs text-blue-600 hover:underline">عرض الكشف</button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                <div className="p-4 bg-gray-50 rounded-b-xl border-t">
                    <div className="flex justify-end space-x-3 space-x-reverse">
                        {renderActionButtons()}
                    </div>
                </div>
            </div>
            {confirmation && (
                <ConfirmationModal 
                    isOpen={confirmation.isOpen}
                    onClose={() => setConfirmation(null)}
                    onConfirm={confirmation.onConfirm}
                    title={confirmation.title}
                    message={confirmation.message}
                    confirmText={t('common.confirm')}
                    confirmColor="blue"
                />
            )}
        </>
    );
};

export default PayrollRunDetails;