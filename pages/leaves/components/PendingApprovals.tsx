import React from 'react';
import { LeaveRequest, LeaveType, LeaveStatus } from '../../../types';
import { useI18n } from '../../../context/I18nContext';

interface PendingApprovalsProps {
    requests: LeaveRequest[];
    onAction: (requestId: string, newStatus: LeaveStatus) => void;
}

const leaveTypeClasses: Record<LeaveType, string> = {
    [LeaveType.VACATION]: 'bg-blue-100 text-blue-800',
    [LeaveType.SICK]: 'bg-red-100 text-red-800',
    [LeaveType.PERSONAL]: 'bg-purple-100 text-purple-800',
    [LeaveType.CASUAL]: 'bg-yellow-100 text-yellow-800',
    [LeaveType.PILGRIMAGE]: 'bg-green-100 text-green-800',
    [LeaveType.UNPAID]: 'bg-gray-100 text-gray-800',
    [LeaveType.EXAMINATION]: 'bg-indigo-100 text-indigo-800',
    [LeaveType.MATERNITY]: 'bg-pink-100 text-pink-800',
    [LeaveType.NEWBORN]: 'bg-teal-100 text-teal-800',
    [LeaveType.SPECIAL_NEEDS]: 'bg-cyan-100 text-cyan-800',
};

const PendingApprovals: React.FC<PendingApprovalsProps> = ({ requests, onAction }) => {
    const { t } = useI18n();
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{t('page.leaves.pendingApprovals.title')}</h3>
                    <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{t('page.leaves.pendingApprovals.requestsCount', { count: requests.length })}</span>
                </div>
            </div>
            <div className="p-6">
                <div className="space-y-4 max-h-96 overflow-y-auto">
                    {requests.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">
                            <i className="fas fa-check-circle text-4xl text-green-400 mb-3"></i>
                            <p>لا توجد طلبات معلقة للمراجعة.</p>
                        </div>
                    ) : requests.map(request => (
                        <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-3 space-x-reverse">
                                    <div className={`w-10 h-10 ${request.employee.avatarColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                                        <span className="text-white text-sm font-medium">{request.employee.avatarInitials}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">{request.employee.firstName} {request.employee.lastName}</h4>
                                        <p className="text-sm text-gray-600">{request.employee.jobTitle}</p>
                                        <div className="flex items-center flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-500">
                                            <span><i className="fas fa-calendar me-1"></i>{request.startDate} - {request.endDate}</span>
                                            <span><i className="fas fa-clock me-1"></i>{t('common.day', { count: request.days })}</span>
                                            <span className={`${leaveTypeClasses[request.leaveType]} px-2 py-1 rounded-full text-xs`}>{t(`enum.leaveType.${request.leaveType}`)}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-2">{request.reason}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2 space-x-reverse flex-shrink-0 ms-2">
                                    <button onClick={() => onAction(request.id, LeaveStatus.APPROVED)} className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
                                        <i className="fas fa-check me-1"></i>{t('page.leaves.pendingApprovals.approve')}
                                    </button>
                                    <button onClick={() => onAction(request.id, LeaveStatus.REJECTED)} className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors">
                                        <i className="fas fa-times me-1"></i>{t('page.leaves.pendingApprovals.reject')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {requests.length > 0 && (
                    <div className="mt-4 text-center">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">{t('page.leaves.pendingApprovals.viewAll')}</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PendingApprovals;