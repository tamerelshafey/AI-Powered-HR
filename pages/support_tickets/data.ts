import { SupportTicket, TicketStatus, TicketPriority, TicketDepartment } from '../../types';
import { employees } from '../employees/data';

export const supportTickets: SupportTicket[] = [
    {
        id: 'TKT-001',
        employee: employees.find(e => e.id === 'EMP001')!, // John Doe
        subject: 'مشكلة في الوصول إلى البريد الإلكتروني',
        department: TicketDepartment.GENERAL,
        priority: TicketPriority.HIGH,
        status: TicketStatus.OPEN,
        createdDate: '2024-07-20T10:00:00Z',
        lastUpdated: '2024-07-20T10:00:00Z',
        aiSuggestion: {
            department: TicketDepartment.IT,
            priority: TicketPriority.HIGH
        }
    },
    {
        id: 'TKT-002',
        employee: employees.find(e => e.id === 'EMP002')!, // Jane Smith
        subject: 'استفسار عن رصيد الإجازات السنوية',
        department: TicketDepartment.HR,
        priority: TicketPriority.MEDIUM,
        status: TicketStatus.IN_PROGRESS,
        createdDate: '2024-07-19T14:30:00Z',
        lastUpdated: '2024-07-20T09:15:00Z',
    },
    {
        id: 'TKT-003',
        employee: employees.find(e => e.id === 'EMP005')!, // Alex Chen
        subject: 'مكيف الهواء في مكتبي لا يعمل',
        department: TicketDepartment.FACILITIES,
        priority: TicketPriority.MEDIUM,
        status: TicketStatus.CLOSED,
        createdDate: '2024-07-18T09:00:00Z',
        lastUpdated: '2024-07-19T11:00:00Z',
    },
    {
        id: 'TKT-004',
        employee: employees.find(e => e.id === 'EMP003')!, // Mike Wilson
        subject: 'طلب بدل سفر لرحلة عمل',
        department: TicketDepartment.GENERAL,
        priority: TicketPriority.LOW,
        status: TicketStatus.OPEN,
        createdDate: '2024-07-20T11:20:00Z',
        lastUpdated: '2024-07-20T11:20:00Z',
        aiSuggestion: {
            department: TicketDepartment.FINANCE,
            priority: TicketPriority.MEDIUM
        }
    },
    {
        id: 'TKT-005',
        employee: employees.find(e => e.id === 'EMP004')!, // Sarah Johnson
        subject: 'كلمة مرور نظام ERPNext لا تعمل',
        department: TicketDepartment.IT,
        priority: TicketPriority.HIGH,
        status: TicketStatus.IN_PROGRESS,
        createdDate: '2024-07-20T08:30:00Z',
        lastUpdated: '2024-07-20T09:00:00Z',
    },
];
