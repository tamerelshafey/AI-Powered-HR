import React from 'react';
import { DepartmentWorkforce } from '../../../types';
import { useI18n } from '../../../context/I18nContext';
import { formatCurrency } from '../../../utils/formatters';

interface HeadcountTableProps {
    data: DepartmentWorkforce[];
    plannedHires: Record<string, number>;
    onHiresChange: (department: string, value: number) => void;
}

const HeadcountTable: React.FC<HeadcountTableProps> = ({ data, plannedHires, onHiresChange }) => {
    const { t, language } = useI18n();

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-full">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">{t('page.workforce_planning.table.title')}</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.workforce_planning.table.department')}</th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">{t('page.workforce_planning.table.currentHeadcount')}</th>
                            <th className="px-4 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.workforce_planning.table.avgSalary')}</th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase w-40">{t('page.workforce_planning.table.plannedHires')}</th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">{t('page.workforce_planning.table.projectedHeadcount')}</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map(dept => (
                            <tr key={dept.department}>
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">{dept.department}</td>
                                <td className="px-4 py-3 text-sm text-center text-gray-700">{dept.headcount}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">{formatCurrency(dept.averageSalary, language, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                                <td className="px-4 py-3">
                                    <input
                                        type="number"
                                        min="0"
                                        value={plannedHires[dept.department] ?? 0}
                                        onChange={(e) => onHiresChange(dept.department, parseInt(e.target.value, 10) || 0)}
                                        className="w-full text-center px-2 py-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </td>
                                <td className="px-4 py-3 text-sm text-center font-bold text-blue-600">
                                    {dept.headcount + (plannedHires[dept.department] || 0)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HeadcountTable;
