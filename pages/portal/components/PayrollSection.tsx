

import React, { useState, useEffect } from 'react';
import { Payslip } from '../../../types';
import { useUser } from '../../../context/UserContext';
import { getPayslipsByEmployeeId, getEmployeeIdForUser } from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { useI18n } from '../../../context/I18nContext';
import { formatCurrency } from '../../../utils/formatters';

interface PayrollSectionProps {
    onViewPayslip: (payslip: Payslip) => void;
}

const PayrollSection: React.FC<PayrollSectionProps> = ({ onViewPayslip }) => {
    const { currentUser } = useUser();
    const { language } = useI18n();
    const [payslips, setPayslips] = useState<Payslip[]>([]);
    const [loading, setLoading] = useState(true);
    const employeeId = getEmployeeIdForUser(currentUser);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getPayslipsByEmployeeId(employeeId);
                // Sort by run date descending
                data.sort((a, b) => new Date(b.run.payDate).getTime() - new Date(a.run.payDate).getTime());
                setPayslips(data);
            } catch (error) {
                console.error("Failed to fetch payslips", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [employeeId]);
    
    if (loading) {
        return <div className="min-h-[60vh] flex items-center justify-center"><LoadingSpinner /></div>
    }
    
    const latestPayslip = payslips[0];

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">الرواتب</h2>
                <p className="text-gray-600">عرض وتحميل كشوف الرواتب الخاصة بك.</p>
            </div>

            {latestPayslip ? (
                 <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">أحدث كشف راتب ({latestPayslip.run.period})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div className="p-4 bg-green-50 rounded-lg">
                            <p className="text-sm text-green-700">إجمالي الإيرادات</p>
                            <p className="text-xl font-bold text-green-800">{formatCurrency(latestPayslip.grossPay, language)}</p>
                        </div>
                        <div className="p-4 bg-red-50 rounded-lg">
                            <p className="text-sm text-red-700">إجمالي الخصومات</p>
                            <p className="text-xl font-bold text-red-800">{formatCurrency(latestPayslip.totalDeductions, language)}</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-700">صافي الراتب</p>
                            <p className="text-xl font-bold text-blue-800">{formatCurrency(latestPayslip.netPay, language)}</p>
                        </div>
                    </div>
                </div>
            ) : null}

            <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b"><h3 className="text-lg font-semibold text-gray-900">سجل كشوف الرواتب</h3></div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">فترة الراتب</th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">تاريخ الدفع</th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">صافي الراتب</th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الإجراء</th>
                            </tr>
                        </thead>
                         <tbody className="bg-white divide-y">
                            {payslips.length > 0 ? payslips.map(p => (
                                <tr key={p.run.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium">{p.run.period}</td>
                                    <td className="px-6 py-4 text-gray-600">{p.run.payDate}</td>
                                    <td className="px-6 py-4 font-semibold text-green-600">{formatCurrency(p.netPay, language)}</td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => onViewPayslip(p)} className="text-blue-600 hover:underline text-sm font-medium">
                                            عرض التفاصيل
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="text-center py-10 text-gray-500">
                                        <i className="fas fa-file-invoice-dollar text-3xl mb-2"></i>
                                        <p>لا توجد كشوف رواتب متاحة حتى الآن.</p>
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

export default PayrollSection;