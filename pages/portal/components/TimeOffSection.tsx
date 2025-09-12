
import React, { useState, useEffect } from 'react';
import { LeaveStatus, EmployeeLeaveBalance, LeaveRequest, LeaveType } from '../../../types';
import { useUser } from '../../../context/UserContext';
import { getLeaveBalanceForEmployee, getLeaveRequestsByEmployeeId, getEmployeeIdForUser } from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { useI18n } from '../../../context/I18nContext';
import { LEAVE_STATUS_CLASSES } from '../../../utils/styleUtils';

interface TimeOffSectionProps {
    onOpenTimeOffModal: () => void;
}

const leaveTypeIcons: Record<LeaveType, { icon: string; color: string; }> = {
    [LeaveType.VACATION]: { icon: 'fas fa-umbrella-beach', color: 'text-blue-600' },
    [LeaveType.SICK]: { icon: 'fas fa-thermometer-half', color: 'text-red-600' },
    [LeaveType.PERSONAL]: { icon: 'fas fa-user-friends', color: 'text-purple-600' },
    [LeaveType.CASUAL]: { icon: 'fas fa-briefcase', color: 'text-yellow-600' },
    [LeaveType.PILGRIMAGE]: { icon: 'fas fa-kaaba', color: 'text-green-600' },
    [LeaveType.UNPAID]: { icon: 'fas fa-stopwatch', color: 'text-gray-600' },
    [LeaveType.EXAMINATION]: { icon: 'fas fa-book-open', color: 'text-purple-600' },
    [LeaveType.MATERNITY]: { icon: 'fas fa-baby', color: 'text-pink-600' },
    [LeaveType.NEWBORN]: { icon: 'fas fa-baby-carriage', color: 'text-teal-600' },
    [LeaveType.SPECIAL_NEEDS]: { icon: 'fas fa-hands-helping', color: 'text-indigo-600' },
};

const TimeOffSection: React.FC<TimeOffSectionProps> = ({ onOpenTimeOffModal }) => {
    const { currentUser } = useUser();
    const { t } = useI18n();
    const [loading, setLoading] = useState(true);
    const [balance, setBalance] = useState<EmployeeLeaveBalance | null>(null);
    const [requests, setRequests] = useState<LeaveRequest[]>([]);
    
    const employeeId = getEmployeeIdForUser(currentUser);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [balanceData, requestsData] = await Promise.all([
                    getLeaveBalanceForEmployee(employeeId),
                    getLeaveRequestsByEmployeeId(employeeId)
                ]);
                setBalance(balanceData);
                setRequests(requestsData);
            } catch (error) {
                console.error("Failed to fetch time off data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [employeeId]);
    
    if (loading) {
        return <div className="min-h-[60vh] flex items-center justify-center"><LoadingSpinner /></div>
    }

    const annualRemaining = balance ? balance.annual.total - balance.annual.used : 0;
    const sickRemaining = balance ? balance.sick.total - balance.sick.used : 0;
    const personalRemaining = balance ? balance.personal.total - balance.personal.used : 0;

    return (
        <div>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">إدارة الإجازات</h2>
                    <p className="text-gray-600">طلب وإدارة إجازاتك</p>
                </div>
                <button onClick={onOpenTimeOffModal} className="mt-4 lg:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <i className="fas fa-plus me-2"></i>طلب جديد
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm border p-6 text-center"><p className="text-2xl font-bold text-blue-600">{annualRemaining}</p><p className="text-sm text-gray-600">أيام الإجازة المتبقية</p></div>
                <div className="bg-white rounded-xl shadow-sm border p-6 text-center"><p className="text-2xl font-bold text-red-600">{sickRemaining}</p><p className="text-sm text-gray-600">أيام المرض المتبقية</p></div>
                <div className="bg-white rounded-xl shadow-sm border p-6 text-center"><p className="text-2xl font-bold text-green-600">{personalRemaining}</p><p className="text-sm text-gray-600">أيام شخصية متبقية</p></div>
                <div className="bg-white rounded-xl shadow-sm border p-6 text-center"><p className="text-2xl font-bold text-purple-600">{balance?.totalUsed || 0}</p><p className="text-sm text-gray-600">أيام مستخدمة هذا العام</p></div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b"><h3 className="text-lg font-semibold text-gray-900">الطلبات الأخيرة</h3></div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">النوع</th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">التواريخ</th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الأيام</th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الحالة</th>
                            </tr>
                        </thead>
                         <tbody className="bg-white divide-y">
                            {requests.length > 0 ? requests.map(req => {
                                const typeInfo = leaveTypeIcons[req.leaveType];
                                return (
                                    <tr key={req.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <i className={`${typeInfo.icon} ${typeInfo.color} me-3`}></i>
                                                {t(`enum.leaveType.${req.leaveType}`)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{req.startDate} - {req.endDate}</td>
                                        <td className="px-6 py-4">{req.days}</td>
                                        <td className="px-6 py-4"><span className={`text-xs px-2 py-1 rounded-full ${LEAVE_STATUS_CLASSES[req.status]}`}>{t(`enum.leaveStatus.${req.status}`)}</span></td>
                                    </tr>
                                );
                            }) : (
                                <tr>
                                    <td colSpan={4} className="text-center py-10 text-gray-500">
                                        <i className="fas fa-folder-open text-3xl mb-2"></i>
                                        <p>لا توجد طلبات إجازة حتى الآن.</p>
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

export default TimeOffSection;
