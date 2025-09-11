import React, { useState, useMemo, useCallback } from 'react';
import PageHeader from './components/PageHeader';
import LeaveStats from './components/LeaveStats';
import PendingApprovals from './components/PendingApprovals';
import LeaveBalance from './components/LeaveBalance';
import LeaveAiInsights from './components/LeaveAiInsights';
import RecentActivity from './components/RecentActivity';
import ApprovalWorkflow from './components/ApprovalWorkflow';
import LeaveRequestModal from './components/LeaveRequestModal';
import LeaveCalendarModal from './components/LeaveCalendarModal';
import ToastNotification from '../../components/ToastNotification';
import { userLeaveBalances, recentActivity as initialActivity, allLeaveRequests as initialAllRequests } from './data';
import { LeaveRequest, LeaveStatus, ActivityItem } from '../../types';
import { updateLeaveRequestStatus } from '../../services/api';
import { useI18n } from '../../context/I18nContext';

const LeavesPage: React.FC = () => {
    const [isRequestModalOpen, setRequestModalOpen] = useState(false);
    const [isCalendarModalOpen, setCalendarModalOpen] = useState(false);
    
    // State management for dynamic data
    const [allRequests, setAllRequests] = useState<LeaveRequest[]>(initialAllRequests);
    const [activities, setActivities] = useState<ActivityItem[]>(initialActivity);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
    const { t } = useI18n();

    const pendingRequests = useMemo(() => allRequests.filter(r => r.status === LeaveStatus.PENDING), [allRequests]);
    
    const handleAction = useCallback(async (requestId: string, newStatus: LeaveStatus) => {
        try {
            const updatedRequest = await updateLeaveRequestStatus(requestId, newStatus);
            
            setAllRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: newStatus } : r));
            
            const newActivity: ActivityItem = {
                id: Date.now(),
                icon: newStatus === LeaveStatus.APPROVED ? 'fas fa-check' : 'fas fa-times',
                iconColor: newStatus === LeaveStatus.APPROVED ? 'green' : 'red',
                title: {
                    text: newStatus === LeaveStatus.APPROVED ? 'page.leaves.recentActivity.approvedFor' : 'page.leaves.recentActivity.rejectedFor',
                    highlight: `${updatedRequest.employee.firstName} ${updatedRequest.employee.lastName}`
                },
                subtitle: `${t(`enum.leaveType.${updatedRequest.leaveType}`)} • ${updatedRequest.startDate}`,
                time: t('page.attendance.liveFeed.now')
            };
            setActivities(prev => [newActivity, ...prev]);

            const toastMessage = newStatus === LeaveStatus.APPROVED
                ? t('page.leaves.toast.approved', { name: updatedRequest.employee.firstName })
                : t('page.leaves.toast.rejected', { name: updatedRequest.employee.firstName });
            setToast({ message: toastMessage, type: 'success' });

        } catch (error) {
            console.error("Failed to update leave request status", error);
        }
    }, [t]);

    return (
        <div>
            {toast && <ToastNotification message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <PageHeader
                onNewRequestClick={() => setRequestModalOpen(true)}
                onCalendarClick={() => setCalendarModalOpen(true)}
            />
            <LeaveStats pendingCount={pendingRequests.length} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
                    <PendingApprovals requests={pendingRequests} onAction={handleAction} />
                </div>
                <LeaveBalance balances={userLeaveBalances} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <LeaveAiInsights />
                <RecentActivity activities={activities} />
            </div>

            <ApprovalWorkflow />
            
            <LeaveRequestModal
                isOpen={isRequestModalOpen}
                onClose={() => setRequestModalOpen(false)}
            />
            <LeaveCalendarModal
                isOpen={isCalendarModalOpen}
                onClose={() => setCalendarModalOpen(false)}
            />
        </div>
    );
};

export default LeavesPage;