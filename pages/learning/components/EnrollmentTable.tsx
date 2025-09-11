import React from 'react';
import { EmployeeEnrollment, EnrollmentStatus } from '../../../types';

interface EnrollmentTableProps {
    enrollments: EmployeeEnrollment[];
}

const statusClasses: Record<EnrollmentStatus, string> = {
    [EnrollmentStatus.ENROLLED]: 'bg-gray-100 text-gray-800',
    [EnrollmentStatus.IN_PROGRESS]: 'bg-blue-100 text-blue-800',
    [EnrollmentStatus.COMPLETED]: 'bg-green-100 text-green-800',
};

const EnrollmentTable: React.FC<EnrollmentTableProps> = ({ enrollments }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">تقدم الموظفين</h3>
            </div>
            
            {/* Mobile View */}
            <div className="md:hidden">
                <div className="p-4 space-y-4">
                    {enrollments.map(enr => (
                        <div key={enr.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                             <div className="flex items-start justify-between">
                                <div className="flex items-center">
                                    <div className={`w-8 h-8 ${enr.employee.avatarColor} rounded-full flex items-center justify-center me-3 flex-shrink-0`}>
                                        <span className="text-white text-xs font-medium">{enr.employee.avatarInitials}</span>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">{`${enr.employee.firstName} ${enr.employee.lastName}`}</div>
                                        <div className="text-sm text-gray-500">{enr.course.title}</div>
                                    </div>
                                </div>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[enr.status]}`}>
                                    {enr.status}
                                </span>
                            </div>
                             <div>
                                <div className="flex items-center">
                                    <span className="text-sm text-gray-600 me-3 w-10">{enr.progress}%</span>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${enr.progress}%` }}></div>
                                    </div>
                                </div>
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
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الموظف</th>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الدورة</th>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">التقدم</th>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الحالة</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {enrollments.map(enr => (
                            <tr key={enr.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className={`w-8 h-8 ${enr.employee.avatarColor} rounded-full flex items-center justify-center me-3 flex-shrink-0`}>
                                            <span className="text-white text-xs font-medium">{enr.employee.avatarInitials}</span>
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{`${enr.employee.firstName} ${enr.employee.lastName}`}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{enr.course.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-full bg-gray-200 rounded-full h-2 me-3">
                                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${enr.progress}%` }}></div>
                                        </div>
                                        <span className="text-sm text-gray-600">{enr.progress}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[enr.status]}`}>
                                        {enr.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EnrollmentTable;
