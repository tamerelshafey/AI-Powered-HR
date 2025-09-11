
import React from 'react';
import { Performer } from '../../../types';

const TopPerformersTable: React.FC<{ performers: Performer[] }> = ({ performers }) => {
    const getTrend = (trend: number) => {
        if (trend > 0) return <span className="text-green-600"><i className="fas fa-arrow-up me-1"></i>+{trend.toFixed(1)}</span>;
        if (trend < 0) return <span className="text-red-600"><i className="fas fa-arrow-down me-1"></i>{trend.toFixed(1)}</span>;
        return <span className="text-gray-600"><i className="fas fa-minus me-1"></i>{trend.toFixed(1)}</span>;
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">أفضل المؤدين</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-700">عرض الكل</button>
                </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden">
                <div className="p-4 space-y-4">
                    {performers.map(({ employee, score, trend }) => (
                         <div key={employee.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                            <div className="flex items-center">
                                <div className={`w-10 h-10 ${employee.avatarColor} rounded-full flex items-center justify-center me-3 flex-shrink-0`}>
                                    <span className="text-white text-sm font-medium">{employee.avatarInitials}</span>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-900">{employee.firstName} {employee.lastName}</div>
                                    <div className="text-sm text-gray-500">{employee.jobTitle}</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-center text-sm border-t pt-2">
                                <div><p className="text-xs text-gray-500">القسم</p><p className="font-medium text-gray-800">{employee.department}</p></div>
                                <div><p className="text-xs text-gray-500">النتيجة</p><p className="font-bold text-green-600">{score}</p></div>
                                <div><p className="text-xs text-gray-500">الاتجاه</p><p className="font-medium">{getTrend(trend)}</p></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Desktop View */}
            <div className="overflow-x-auto hidden md:block">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">الموظف</th>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">القسم</th>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">النتيجة</th>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">الاتجاه</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {performers.map(({ employee, score, trend }) => (
                            <tr key={employee.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className={`w-8 h-8 ${employee.avatarColor} rounded-full flex items-center justify-center me-3 flex-shrink-0`}>
                                            <span className="text-white text-xs font-medium">{employee.avatarInitials}</span>
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900">{employee.firstName} {employee.lastName}</div>
                                            <div className="text-gray-500">{employee.jobTitle}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{employee.department}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="font-medium text-green-600">{score}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {getTrend(trend)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopPerformersTable;