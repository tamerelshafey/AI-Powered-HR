
import React from 'react';
import { LeaveRequest, LeaveType, LeaveStatus, LeaveBalance, ActivityItem } from '../../types';
import { employees } from '../employees/data';

export const allLeaveRequests: LeaveRequest[] = [
    {
        id: 'LR001',
        employee: employees[0],
        leaveType: LeaveType.VACATION,
        startDate: 'Dec 20, 2024',
        endDate: 'Dec 22, 2024',
        days: 3,
        reason: 'Family vacation to celebrate holidays',
        status: LeaveStatus.PENDING,
    },
    {
        id: 'LR002',
        employee: employees[4],
        leaveType: LeaveType.SICK,
        startDate: 'Dec 18, 2024',
        endDate: 'Dec 18, 2024',
        days: 1,
        reason: "Doctor's appointment and recovery",
        status: LeaveStatus.PENDING,
    },
    {
        id: 'LR003',
        employee: employees[2],
        leaveType: LeaveType.PERSONAL,
        startDate: 'Jan 2, 2025',
        endDate: 'Jan 5, 2025',
        days: 4,
        reason: 'Moving to new apartment',
        status: LeaveStatus.PENDING,
    },
    {
        id: 'LR009',
        employee: employees[5],
        leaveType: LeaveType.EXAMINATION,
        startDate: 'Jan 10, 2025',
        endDate: 'Jan 12, 2025',
        days: 3,
        reason: 'امتحانات نصف العام الدراسي',
        status: LeaveStatus.PENDING,
    },
    {
        id: 'LR004',
        employee: employees[0], // John Doe
        leaveType: LeaveType.VACATION,
        startDate: 'Aug 15, 2024',
        endDate: 'Aug 18, 2024',
        days: 4,
        reason: 'Summer break',
        status: LeaveStatus.APPROVED,
    },
    {
        id: 'LR005',
        employee: employees[1], // Jane Smith
        leaveType: LeaveType.VACATION,
        startDate: 'Jul 10, 2024',
        endDate: 'Jul 12, 2024',
        days: 3,
        reason: 'Personal trip',
        status: LeaveStatus.APPROVED,
    },
    {
        id: 'LR006',
        employee: employees[3], // Sarah Johnson
        leaveType: LeaveType.SICK,
        startDate: 'Nov 05, 2024',
        endDate: 'Nov 05, 2024',
        days: 1,
        reason: 'Not feeling well',
        status: LeaveStatus.APPROVED,
    },
    {
        id: 'LR007',
        employee: employees[0], // John Doe
        leaveType: LeaveType.PERSONAL,
        startDate: 'Jun 01, 2024',
        endDate: 'Jun 01, 2024',
        days: 1,
        reason: 'Bank appointment',
        status: LeaveStatus.REJECTED,
    },
    {
        id: 'LR008',
        employee: employees[0], // John Doe
        leaveType: LeaveType.UNPAID,
        startDate: 'Jul 10, 2024',
        endDate: 'Jul 11, 2024',
        days: 2,
        reason: 'Personal matters',
        status: LeaveStatus.APPROVED,
    },
];

export const pendingRequests: LeaveRequest[] = allLeaveRequests.filter(r => r.status === LeaveStatus.PENDING);

export const userLeaveBalances: LeaveBalance[] = [
    { type: 'page.leaves.leaveBalance.type.annual', used: 18, total: 25, color: 'bg-blue-600' },
    { type: 'page.leaves.leaveBalance.type.sick', used: 3, total: 12, color: 'bg-red-500' },
    { type: 'page.leaves.leaveBalance.type.casual', used: 1, total: 7, color: 'bg-yellow-500' },
    { type: 'page.leaves.leaveBalance.type.maternity', used: 0, total: 120, color: 'bg-green-500' },
    { type: 'page.leaves.leaveBalance.type.specialNeeds', used: 0, total: 45, color: 'bg-indigo-500' },
];

export const recentActivity: ActivityItem[] = [
    { id: 1, icon: 'fas fa-check', iconColor: 'green', title: { text: 'page.leaves.recentActivity.approvedFor', highlight: "أليكس تشين" }, subtitle: 'إجازة • 23-27 ديسمبر • تمت الموافقة تلقائيًا', time: 'منذ دقيقتين' },
    { id: 2, icon: 'fas fa-paper-plane', iconColor: 'blue', title: { text: 'page.leaves.recentActivity.newRequestFrom', highlight: "ليزا براون" }, subtitle: 'إجازة مرضية • 19 ديسمبر • في انتظار الموافقة', time: 'منذ 15 دقيقة' },
    { id: 3, icon: 'fas fa-times', iconColor: 'red', title: { text: 'page.leaves.recentActivity.rejectedFor', highlight: "توم ديفيس" }, subtitle: 'شخصية • 20-22 ديسمبر • تغطية غير كافية', time: 'منذ ساعة' },
    { id: 4, icon: 'fas fa-edit', iconColor: 'purple', title: { text: 'page.leaves.recentActivity.modifiedBy', highlight: "سارة ويلسون" }, subtitle: 'تم تغيير التواريخ إلى 21-23 ديسمبر', time: 'منذ ساعتين' },
];
