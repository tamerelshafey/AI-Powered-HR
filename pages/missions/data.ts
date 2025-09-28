

import { Mission, MissionStatus } from '../../types';
import { employees } from '../employees/data';

export const missions: Mission[] = [
    {
        id: 'MSN001',
        employee: employees.find(e => e.id === 'EMP014')!,
        title: 'زيارة العميل (شركة ABC)',
        description: 'اجتماع لمناقشة تجديد العقد ومتطلبات الربع القادم.',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        isMultiDay: false,
        startTime: '10:00',
        endTime: '12:30',
        status: MissionStatus.APPROVED,
        requestedBy: 'manager',
    },
    {
        id: 'MSN002',
        employee: employees.find(e => e.id === 'EMP001')!,
        title: 'حضور مؤتمر تقني',
        description: 'المشاركة في مؤتمر TechSummit 2024 لتمثيل الشركة.',
        startDate: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString().split('T')[0],
        endDate: new Date(new Date().setDate(new Date().getDate() + 12)).toISOString().split('T')[0],
        isMultiDay: true,
        startTime: null,
        endTime: null,
        status: MissionStatus.PENDING,
        requestedBy: 'employee',
    },
    {
        id: 'MSN003',
        employee: employees.find(e => e.id === 'EMP008')!,
        title: 'بحث ميداني للسوق',
        description: 'جمع بيانات من السوق المستهدف في منطقة وسط البلد.',
        startDate: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString().split('T')[0],
        endDate: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString().split('T')[0],
        isMultiDay: true,
        startTime: null,
        endTime: null,
        status: MissionStatus.COMPLETED,
        requestedBy: 'manager',
    },
    {
        id: 'MSN004',
        employee: employees.find(e => e.id === 'EMP005')!,
        title: 'التدريب في فرع جدة',
        description: 'تقديم دورة تدريبية للموظفين الجدد في فرع جدة.',
        startDate: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString().split('T')[0],
        endDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0],
        isMultiDay: false,
        startTime: '09:00',
        endTime: '17:00',
        status: MissionStatus.REJECTED,
        requestedBy: 'employee',
    },
];
