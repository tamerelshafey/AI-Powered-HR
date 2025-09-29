
import React, { useState } from 'react';
import { ExpenseClaim, ExpenseStatus } from '../../../types';
import { useI18n } from '../../../context/I18nContext';
import { formatDate, formatCurrency } from '../../../utils/formatters';

interface ExpensesTableProps {
    claims: ExpenseClaim[];
    onEdit: (claim: ExpenseClaim) => void;
    onUpdateStatus: (claimId: string, status: ExpenseStatus) => void;
}

const statusClasses: Record<ExpenseStatus, string> = {
    [ExpenseStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
    [ExpenseStatus.APPROVED]: 'bg-blue-100 text-blue-800',
    [ExpenseStatus.REJECTED]: 'bg-red-100 text-red-800',
    [ExpenseStatus.PAID]: 'bg-green-100 text-green-800',
};

const ExpensesTable: React.FC<ExpensesTableProps> = ({ claims, onEdit, onUpdateStatus }) => {
    const { t, language } = useI18n();

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">{t('page.expenses.table.title')}</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.expenses.table.employee')}</th>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.expenses.table.date')}</th>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.expenses.table.category')}</th>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.expenses.table.amount')}</th>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.expenses.table.status')}</th>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.expenses.table.actions')}</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {claims.map(claim => (
                            <tr key={claim.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{`${claim.employee.firstName} ${claim.employee.lastName}`}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">{formatDate(claim.date, language)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">{t(`enum.expenseCategory.${claim.category}`)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">{formatCurrency(claim.amount, language)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[claim.status]}`}>
                                        {t(`enum.expenseStatus.${claim.status}`)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {claim.status === ExpenseStatus.PENDING ? (
                                        <div className="flex items-center space-x-2 space-x-reverse">
                                            <button onClick={() => onUpdateStatus(claim.id, ExpenseStatus.APPROVED)} className="text-green-600 hover:text-green-800">{t('common.approve')}</button>
                                            <button onClick={() => onUpdateStatus(claim.id, ExpenseStatus.REJECTED)} className="text-red-600 hover:text-red-800">{t('common.reject')}</button>
                                        </div>
                                    ) : (
                                        <button onClick={() => onEdit(claim)} className="text-blue-600 hover:text-blue-800">{t('page.expenses.table.viewDetails')}</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExpensesTable;
