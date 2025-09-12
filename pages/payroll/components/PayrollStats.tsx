

import React from 'react';
import StatsCard from '../../../components/dashboard/StatsCard';
import { PayrollRun } from '../../../types';
import { useI18n } from '../../../context/I18nContext';
import { formatCurrency } from '../../../utils/formatters';

interface PayrollStatsProps {
    latestRun: PayrollRun;
}

const PayrollStats: React.FC<PayrollStatsProps> = ({ latestRun }) => {
    const { t, language } = useI18n();
    if (!latestRun) return null;
    
    const currencyOptions = { minimumFractionDigits: 0, maximumFractionDigits: 0 };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard icon="fas fa-dollar-sign" labelKey={t('payrollStats.totalCost', { period: latestRun.period })} value={formatCurrency(latestRun.totalCost, language, currencyOptions)} iconBgColor="bg-blue-100" iconColor="text-blue-600" />
            <StatsCard icon="fas fa-money-check-alt" labelKey={t('payrollStats.netPaid', { period: latestRun.period })} value={formatCurrency(latestRun.netPay, language, currencyOptions)} iconBgColor="bg-green-100" iconColor="text-green-600" />
            <StatsCard icon="fas fa-file-invoice-dollar" labelKey={t('payrollStats.deductions', { period: latestRun.period })} value={formatCurrency(latestRun.deductions, language, currencyOptions)} iconBgColor="bg-red-100" iconColor="text-red-600" />
            <StatsCard icon="fas fa-users" labelKey="payrollStats.employeesCovered" value={String(latestRun.employeesCount)} iconBgColor="bg-purple-100" iconColor="text-purple-600" />
        </div>
    );
};

export default PayrollStats;