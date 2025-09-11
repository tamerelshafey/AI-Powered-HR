import React, { useState, useEffect } from 'react';
import { Employee, LeaveRequest, LeaveStatus } from '../../../../types';
import { getLeaveRequestsByEmployeeId } from '../../../../services/api';
import LoadingSpinner from '../../../../components/LoadingSpinner';

interface LeaveHistoryTabProps {
    employee: Employee;
}

const statusClasses: Record<LeaveStatus, string> = {
    [LeaveStatus.APPROVED]: 'bg-green-100 text-green-800',
    [LeaveStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
    [LeaveStatus.REJECTED]: 'bg-red-100 text-red-800',
};

const LeaveBalanceCard: React.FC<{ title: string; used: number; total: number; color: string }> = ({ title, used, total, color }) => {
    const percentage = total > 0 ? (used / total) * 100 : 0;
    return (
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{title}</span>
                <span className="text-sm text-gray-600">{used}/{total} يوم</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div className={`${color} h-2 rounded-full`} style={{ width: `${percentage}%` }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{total - used} يوم متبقي</p>
        </div>
    );
};

const LeaveHistoryTab: React.FC<LeaveHistoryTabProps> = ({ employee }) => {
    const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaveHistory = async () => {
            setLoading(true);
            try {
                const data = await getLeaveRequestsByEmployeeId(employee.id);
                setLeaveRequests(data);
            } catch (error) {
                console.error("Failed to fetch leave requests for employee", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLeaveHistory();
    }, [employee.id]);

    if (loading) {
        return <div className="h-64"><LoadingSpinner /></div>;
    }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <LeaveBalanceCard title="إجازة سنوية" used={8} total={21} color="bg-blue-500" />
                <LeaveBalanceCard title="إجازة مرضية" used={2} total={14} color="bg-orange-500" />
            </div>

            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                    سجل طلبات الإجازة
                </h3>
            </div>

            {leaveRequests.length === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
                    <i className="fas fa-calendar-times text-4xl mb-3"></i>
                    <p>لا يوجد سجل إجازات لهذا الموظف.</p>
                </div>
            ) : (
                <div>
                    {/* Mobile View */}
                    <div className="md:hidden space-y-3">
                        {leaveRequests.map(req => (
                             <div key={req.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                                <div className="flex justify-between items-start">
                                    <p className="font-semibold text-gray-800">{req.leaveType}</p>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[req.status]}`}>
                                        {req.status}
                                    </span>
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-sm border-t pt-2">
                                    <div><p className="text-xs text-gray-500">من</p><p className="font-medium text-gray-800">{req.startDate}</p></div>
                                    <div><p className="text-xs text-gray-500">إلى</p><p className="font-medium text-gray-800">{req.endDate}</p></div>
                                    <div className="text-center"><p className="text-xs text-gray-500">الأيام</p><p className="font-medium text-gray-800">{req.days}</p></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Desktop View */}
                    <div className="overflow-x-auto hidden md:block border rounded-lg">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">نوع الإجازة</th>
                                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">من</th>
                                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">إلى</th>
                                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الأيام</th>
                                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الحالة</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {leaveRequests.map(req => (
                                    <tr key={req.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{req.leaveType}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{req.startDate}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{req.endDate}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{req.days}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[req.status]}`}>
                                                {req.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeaveHistoryTab;