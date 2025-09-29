
import React from 'react';
import StatsCard from '../../../components/dashboard/StatsCard';
import { ExpenseClaim, ExpenseStatus } from '../../../types';
import { useI18n } from '../../../context/I18nContext';
import { formatCurrency } from '../../../utils/formatters';

interface ExpenseStatsProps {
    claims: ExpenseClaim[];
}

const ExpenseStats: React.FC<ExpenseStatsProps> = ({ claims }) => {
    const { t, language } = useI18n();

    const pendingAmount = claims
        .filter(c => c.status === ExpenseStatus.PENDING)
        .reduce((sum, c) => sum + c.amount, 0);

    const approvedThisMonth = claims
        .filter(c => c.status === ExpenseStatus.APPROVED || c.status === ExpenseStatus.PAID)
        .reduce((sum, c) => sum + c.amount, 0);

    const pendingCount = claims.filter(c => c.status === ExpenseStatus.PENDING).length;
    const rejectedCount = claims.filter(c => c.status === ExpenseStatus.REJECTED).length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard icon="fas fa-hourglass-half" labelKey="expenseStats.pendingAmount" value={formatCurrency(pendingAmount, language)} iconBgColor="bg-orange-100" iconColor="text-orange-600" />
            <StatsCard icon="fas fa-check-circle" labelKey="expenseStats.approvedThisMonth" value={formatCurrency(approvedThisMonth, language)} iconBgColor="bg-green-100" iconColor="text-green-600" />
            <StatsCard icon="fas fa-file-import" labelKey="expenseStats.pendingClaims" value={String(pendingCount)} iconBgColor="bg-blue-100" iconColor="text-blue-600" />
            <StatsCard icon="fas fa-times-circle" labelKey="expenseStats.rejectedClaims" value={String(rejectedCount)} iconBgColor="bg-red-100" iconColor="text-red-600" />
        </div>
    );
};

export default ExpenseStats;
