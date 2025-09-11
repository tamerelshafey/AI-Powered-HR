
import React from 'react';
import { LeaveBalance as LeaveBalanceType } from '../../../types';
import { useI18n } from '../../../context/I18nContext';

interface LeaveBalanceProps {
    balances: LeaveBalanceType[];
}

const LeaveBalance: React.FC<LeaveBalanceProps> = ({ balances }) => {
    const { t } = useI18n();
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">{t('page.leaves.leaveBalance.myBalance')}</h3>
            </div>
            <div className="p-6 space-y-6">
                {balances.map(balance => (
                    <div key={balance.type}>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">{t(balance.type)}</span>
                            <span className="text-sm text-gray-600">{balance.used}/{balance.total} {t('common.day', { count: 2 })}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className={`${balance.color} h-2 rounded-full`} style={{ width: `${(balance.used / balance.total) * 100}%` }}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{t('page.leaves.leaveBalance.daysRemaining', { count: balance.total - balance.used })}</p>
                    </div>
                ))}
                <div className="pt-4 border-t border-gray-100">
                    <button className="w-full text-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                        {t('page.leaves.leaveBalance.viewDetails')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LeaveBalance;
