
import React, { useState, useEffect, useCallback } from 'react';
import { ExpenseClaim, ExpenseStatus, Employee, Mission } from '../../../types';
import { useUser } from '../../../context/UserContext';
import { getExpenseClaims, getEmployeeIdForUser, getMissions, getAllEmployees } from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { useI18n } from '../../../context/I18nContext';
import { formatDate, formatCurrency } from '../../../utils/formatters';
import ExpenseModal from '../../expenses/components/ExpenseModal';

interface ExpenseSectionProps {
    onOpenExpenseModal: () => void;
}

const statusClasses: Record<ExpenseStatus, string> = {
    [ExpenseStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
    [ExpenseStatus.APPROVED]: 'bg-blue-100 text-blue-800',
    [ExpenseStatus.REJECTED]: 'bg-red-100 text-red-800',
    [ExpenseStatus.PAID]: 'bg-green-100 text-green-800',
};


const ExpenseSection: React.FC<ExpenseSectionProps> = ({ onOpenExpenseModal }) => {
    const { currentUser } = useUser();
    const { t, language } = useI18n();
    const [claims, setClaims] = useState<ExpenseClaim[]>([]);
    const [loading, setLoading] = useState(true);
    const employeeId = getEmployeeIdForUser(currentUser);
    
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const allClaims = await getExpenseClaims();
            setClaims(allClaims.filter(c => c.employee.id === employeeId));
        } catch (error) {
            console.error("Failed to fetch expense claims", error);
        } finally {
            setLoading(false);
        }
    }, [employeeId]);
    
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (loading) {
        return <div className="min-h-[60vh] flex items-center justify-center"><LoadingSpinner /></div>;
    }

    return (
        <div>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('portalNav.expenses')}</h2>
                    <p className="text-gray-600">{t('page.portal.expenses.subtitle')}</p>
                </div>
                <button onClick={onOpenExpenseModal} className="mt-4 lg:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <i className="fas fa-plus me-2"></i>{t('page.portal.expenses.newRequest')}
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b"><h3 className="text-lg font-semibold text-gray-900">{t('page.portal.expenses.history')}</h3></div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.expenses.table.date')}</th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.expenses.table.category')}</th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.expenses.table.amount')}</th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.expenses.table.status')}</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y">
                            {claims.length > 0 ? claims.map(claim => (
                                <tr key={claim.id}>
                                    <td className="px-6 py-4">{formatDate(claim.date, language)}</td>
                                    <td className="px-6 py-4">{t(`enum.expenseCategory.${claim.category}`)}</td>
                                    <td className="px-6 py-4 font-semibold">{formatCurrency(claim.amount, language)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[claim.status]}`}>
                                            {t(`enum.expenseStatus.${claim.status}`)}
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="text-center py-12 text-gray-500">
                                        <i className="fas fa-receipt text-3xl mb-2"></i>
                                        <p>{t('page.portal.expenses.noExpenses')}</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ExpenseSection;
