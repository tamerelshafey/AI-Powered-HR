

import React from 'react';
import { PayrollRun, PayrollStatus } from '../../../types';
import { PAYROLL_STATUS_CLASSES } from '../../../utils/styleUtils';
import { useI18n } from '../../../context/I18nContext';
import { formatCurrency } from '../../../utils/formatters';

interface PayrollHistoryTableProps {
  payrollRuns: PayrollRun[];
  onViewPayslips: (run: PayrollRun) => void;
}

const PayrollHistoryTable: React.FC<PayrollHistoryTableProps> = ({ payrollRuns, onViewPayslips }) => {
    const { language } = useI18n();
    const currencyOptions = { minimumFractionDigits: 0, maximumFractionDigits: 0 };
    return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">سجل مسيرات الرواتب</h3>
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
             <div className="p-4 space-y-4">
                {payrollRuns.map(run => (
                    <div key={run.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                             <div>
                                <p className="font-semibold text-gray-800">{run.period}</p>
                                <p className="text-sm text-gray-500">تاريخ الدفع: {run.payDate}</p>
                            </div>
                             <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${PAYROLL_STATUS_CLASSES[run.status]}`}>
                                {run.status}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-t pt-2">
                             <p className="text-gray-600">التكلفة الإجمالية:</p>
                             <p className="font-bold text-gray-900">{formatCurrency(run.totalCost, language, currencyOptions)}</p>
                        </div>
                        <div className="flex justify-end pt-2 text-sm font-medium">
                           <button onClick={() => onViewPayslips(run)} className="text-blue-600 hover:text-blue-900">
                                {run.status === PayrollStatus.DRAFT ? 'متابعة' : 'عرض الكشوف'}
                           </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Desktop View */}
        <div className="overflow-x-auto hidden md:block">
            <table className="w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الفترة</th>
                        <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">التكلفة الإجمالية</th>
                        <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الحالة</th>
                        <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {payrollRuns.map(run => (
                        <tr key={run.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{run.period}</div>
                                <div className="text-sm text-gray-500">تاريخ الدفع: {run.payDate}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{formatCurrency(run.totalCost, language, currencyOptions)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${PAYROLL_STATUS_CLASSES[run.status]}`}>
                                    {run.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button onClick={() => onViewPayslips(run)} className="text-blue-600 hover:text-blue-900 me-3">
                                   {run.status === PayrollStatus.DRAFT ? 'متابعة ومراجعة' : 'عرض كشوف الرواتب'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    );
};
export default PayrollHistoryTable;